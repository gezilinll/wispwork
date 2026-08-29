import { execFileSync } from "node:child_process";

const emptyTree = execFileSync(
  "git",
  ["hash-object", "-t", "tree", "--stdin"],
  { encoding: "utf8", input: "" },
).trim();

const checks = [
  ["diff", "--check", emptyTree, "HEAD"],
  ["diff", "--cached", "--check"],
  ["diff", "--check"],
];

for (const gitArguments of checks) {
  execFileSync("git", gitArguments, { stdio: "inherit" });
}
