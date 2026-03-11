import { execSync } from "node:child_process";

export function getDiff() {

  try {
    const diff = execSync("git diff --cached").toString();

    if (!diff.trim()) return null;

    return diff;

  } catch {
    return null;
  }

}