import fetch from "node-fetch";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { url } = require("../providers.json").openai;

export async function openai(prompt, apiKey, model) {

  const res = await fetch(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    }
  );

  const data = await res.json();

  if (!res.ok || !data.choices) {
    const message = data.error?.message || JSON.stringify(data);
    throw new Error(`OpenAI error: ${message}`);
  }

  return data.choices[0].message.content.trim();
}