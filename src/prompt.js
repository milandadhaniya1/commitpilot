export function buildPrompt(diff) {

  return `
Generate a git commit message.

Format:

<type>(scope): short title

- bullet describing change
- bullet describing change
- bullet describing change

Rules:
- Use conventional commits
- Title max 72 characters
- Bullet points start with "- "

Git diff:

${diff}
`;
}

export function buildPRPrompt(diff) {

  return `
Generate a pull request title and description.

Format:

TITLE: <short title>

DESCRIPTION:

Summary
<summary>

Changes
- change 1
- change 2
- change 3

Git diff:

${diff}
`;
}