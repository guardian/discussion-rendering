const count = parseInt(Deno.args[0], 10) || 8;

const getBranches = async () => {
  const process = Deno.run({
    cmd: [
      "git",
      "branch",
      "-r",
      "--list",
      "origin/dependabot/*",
      "--no-merged",
    ],
    stdout: "piped",
  });

  return new TextDecoder()
    .decode(await process.output())
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, count);
};

const branches = await getBranches();

console.warn("About to merge the following branches:", branches);

const shouldProceed = confirm("Do you want to merge these branches?");
if (!shouldProceed) {
  console.info("Not merging anything");
  Deno.exit();
}

const mergeBranches = async (branches: string[]) => {
  const process = Deno.run({
    cmd: ["git", "merge", ...branches, "--no-ff"],
  });
  const { code } = await process.status();
  if (code !== 0) Deno.exit(code);
};

await mergeBranches(branches);

Deno.exit();
