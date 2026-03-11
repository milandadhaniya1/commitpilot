#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { getDiff } from "../src/git.js";
import { generateCommit, generatePR } from "../src/ai.js";
import { loadConfig, initConfig } from "../src/config.js";
import { execFileSync } from "node:child_process";

async function main() {

  const command = process.argv[2];

  let config = loadConfig();

  if (command === "config") {
    config = await initConfig();
    console.log(chalk.green("Configuration updated!"));
    process.exit(0);
  }

  if (!config) {
    console.log(chalk.yellow("First time setup..."));
    config = await initConfig();
  }

  const diff = getDiff();

  if (!diff) {
    console.log(chalk.red("No staged changes found"));
    process.exit(0);
  }

  console.log(chalk.blue("Analyzing staged changes...\n"));

  if (command === "pr") {

    const result = await generatePR(diff, config);

    console.log(chalk.green("PR Title:\n"));
    console.log(result.title);

    console.log(chalk.green("\nPR Description:\n"));
    console.log(result.description);

    return;
  }

  const message = await generateCommit(diff, config);

  console.log(chalk.green("Suggested commit:\n"));
  console.log(message);

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Use this commit message?",
      default: true
    }
  ]);

  if (confirm) {

    const lines = message.split("\n");
    const title = lines[0];
    const bodyLines = lines.slice(1).filter(line => line.trim());

    const args = ["commit", "-m", title];
    
    if (bodyLines.length > 0) {
      args.push("-m", bodyLines.join("\n"));
    }

    execFileSync("git", args, {
      stdio: "inherit"
    });

  }

}

main().catch((err) => {
  console.error(chalk.red(`\nError: ${err.message}`));
  process.exit(1);
});