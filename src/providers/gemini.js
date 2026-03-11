import fetch from "node-fetch";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { url } = require("../providers.json").gemini;

export async function gemini(prompt, apiKey, model) {

  const res = await fetch(
    `${url}/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ]
      })
    }
  );

  const data = await res.json();

  if (!res.ok || !data.candidates) {
    const message = data.error?.message || JSON.stringify(data);
    throw new Error(`Gemini error: ${message}`);
  }

  return data.candidates[0].content.parts[0].text.trim();
}
