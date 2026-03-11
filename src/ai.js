import { buildPrompt, buildPRPrompt } from "./prompt.js";

import { openai } from "./providers/openai.js";
import { groq } from "./providers/groq.js";
import { anthropic } from "./providers/anthropic.js";
import { deepseek } from "./providers/deepseek.js";
import { ollama } from "./providers/ollama.js";
import { gemini } from "./providers/gemini.js";

async function run(prompt, config) {

  const { provider, apiKey, model } = config;

  switch (provider) {

    case "openai":
      return openai(prompt, apiKey, model);

    case "groq":
      return groq(prompt, apiKey, model);

    case "anthropic":
      return anthropic(prompt, apiKey, model);

    case "deepseek":
      return deepseek(prompt, apiKey, model);

    case "gemini":
      return gemini(prompt, apiKey, model);

    default:
      return ollama(prompt, model);

  }

}

export async function generateCommit(diff, config) {

  const prompt = buildPrompt(diff);
  return run(prompt, config);

}

export async function generatePR(diff, config) {

  const prompt = buildPRPrompt(diff);

  const result = await run(prompt, config);

  const parts = result.split("DESCRIPTION:");

  return {
    title: parts[0].replace("TITLE:", "").trim(),
    description: parts[1]?.trim() || ""
  };

}