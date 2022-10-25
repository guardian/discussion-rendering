// 
/**
 * Helper method to list and merge dependabot branches.
 * 
 * Run from the command line with:
 * `deno run -A scripts/dependabot.ts`
 * 
 * The octopus merge strategy may fail, so you can pass a number
 * as the first argument to specify how many branches to merge.
 * 
 * @param count number of branches to merge
 */
async function main(count: number) {
  const branches = await getBranches(count);

  console.warn("About to merge the following branches:", branches);

  const shouldProceed = confirm("Do you want to merge these branches?");
  if (!shouldProceed) {
    console.info("Not merging anything");
    Deno.exit();
  }

  await mergeBranches(branches);

  Deno.exit();
}

/**
 * You can pass a numeric argument to specify a number of branches to merge,
 * but the default value is 8
 */
const count = parseInt(Deno.args[0], 10) || 8;

if (import.meta.main) main(count);

async function getBranches(count: number) {
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
}

async function mergeBranches(branches: string[]) {
  const process = Deno.run({
    cmd: ["git", "merge", ...branches, "--no-ff"],
  });
  const { code } = await process.status();
  if (code !== 0) Deno.exit(code);
}
