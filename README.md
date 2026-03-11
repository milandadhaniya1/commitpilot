# CommitPilot

AI powered Git commit and PR description generator.

CommitPilot analyzes staged git changes and generates high quality commit messages using AI.

Supports multiple AI providers including OpenAI, Groq, Anthropic, DeepSeek, Google Gemini, and free local models via Ollama.

---

# Features

* AI generated commit messages
* Commit title + detailed description
* Pull request title and description generation
* Conventional commit format
* Multiple AI providers with model selection
* Free local AI support via Ollama
* Provider URLs and models managed from a single `providers.json` file
* Interactive CLI

---

# Installation

Install globally

```
npm install -g commitpilot
```

Or run with npx

```
npx commitpilot
```

---

# First Time Setup

Run:

```
commitpilot
```

You will be prompted to:

1. Choose an AI provider
2. Enter your API key (not required for Ollama)
3. Choose a model for that provider

Configuration is stored at:

```
~/.commitpilot/config.json
```

---

# Update Provider, Model or API Key

Run:

```
commitpilot config
```

This re-runs the setup prompts and lets you switch to a different provider, pick a different model, or update your API key. The new configuration overwrites `~/.commitpilot/config.json`.

You can also edit the file directly:

```
~/.commitpilot/config.json
```

---

# Generate Commit Message

Stage your changes first:

```
git add .
```

Then run:

```
commitpilot
```

Example output:

```
feat(auth): implement refresh token authentication

* Added refresh token endpoint
* Updated JWT middleware
* Improved token validation logic
```

Confirm the suggestion and the commit will be created automatically.

---

# Generate PR Description

```
commitpilot pr
```

Example output:

```
PR Title:
feat(auth): implement refresh token authentication

PR Description:

Summary
Adds refresh token based authentication flow.

Changes

* Added refresh token endpoint
* Updated JWT middleware
* Improved validation logic
```

---

# Supported Providers

| Provider  | Models (examples)                                        | API Key required |
|-----------|----------------------------------------------------------|------------------|
| OpenAI    | gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-3.5-turbo         | Yes              |
| Anthropic | claude-opus-4-5, claude-sonnet-4-5, claude-3-haiku       | Yes              |
| Groq      | llama-3.3-70b-versatile, mixtral-8x7b, gemma2-9b-it      | Yes              |
| DeepSeek  | deepseek-chat, deepseek-reasoner                         | Yes              |
| Gemini    | gemini-2.0-flash, gemini-1.5-pro, gemini-1.5-flash       | Yes              |
| Ollama    | llama3, llama3.2, mistral, codellama, phi3, gemma2       | No               |

---

# Free Local AI with Ollama

Install Ollama from https://ollama.com, then pull a model:

```
ollama run llama3
```

Select `ollama` as your provider during setup. No API key needed.

---

# Customizing Providers

All provider URLs and available models are defined in `src/providers.json`. To update an endpoint or add a new model, just edit that file — no code changes needed.

Example entry:

```json
"openai": {
  "url": "https://api.openai.com/v1/chat/completions",
  "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"]
}
```

To add a new provider, add an entry to `providers.json` and create a corresponding file in `src/providers/`.

---

# Roadmap

* Auto commit mode
* Git hooks integration
* GitHub PR creation
* Commit lint validation
* AI code explanation

---

# License

MIT
