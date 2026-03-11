import fetch from "node-fetch";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { url } = require("../providers.json").anthropic;

export async function anthropic(prompt, apiKey, model) {

  const res = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model,
        max_tokens: 200,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    }
  );

  const data = await res.json();

  if (!res.ok || !data.content) {
    const message = data.error?.message || JSON.stringify(data);
    throw new Error(`Anthropic error: ${message}`);
  }

  return data.content[0].text.trim();
}