import fetch from "node-fetch";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { url } = require("../providers.json").ollama;

export async function ollama(prompt, model) {

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      model,
      prompt,
      stream: false
    })
  });

  const data = await res.json();

  if (!res.ok || !data.response) {
    const message = data.error || JSON.stringify(data);
    throw new Error(`Ollama error: ${message}`);
  }

  return data.response.trim();
}