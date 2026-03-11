import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import inquirer from "inquirer";

const require = createRequire(import.meta.url);

const configDir = path.join(os.homedir(), ".commitpilot");
const configPath = path.join(configDir, "config.json");

export const PROVIDERS = require("./providers.json");

export function loadConfig() {
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath));
}

export async function initConfig() {

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "Choose AI provider",
      choices: Object.keys(PROVIDERS)
    },
    {
      type: "input",
      name: "apiKey",
      message: "Enter API key",
      when: (a) => a.provider !== "ollama"
    },
    {
      type: "list",
      name: "model",
      message: "Choose model",
      choices: (a) => PROVIDERS[a.provider].models
    }
  ]);

  fs.mkdirSync(configDir, { recursive: true });

  fs.writeFileSync(
    configPath,
    JSON.stringify(answers, null, 2)
  );

  return answers;
}