export function buildPrompt(diff) {

  return `
Generate a git commit message.

Format:

<type>(scope): short title

- bullet describing change
- bullet describing change
(add as many bullets as needed based on the changes)

Rules:
- Use conventional commits
- Title max 72 characters
- Add 1-10 bullet points depending on the complexity and number of changes
- Each bullet should describe a meaningful change
- Omit bullets if there's only one simple change
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