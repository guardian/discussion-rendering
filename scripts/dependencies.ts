import pkg from "../package.json" assert { type: "json" };

const isDevDep = (dep: string): dep is keyof typeof pkg.devDependencies =>
  dep in pkg.devDependencies;

const mismatches = Object.entries(pkg.peerDependencies).map(([name, peer]) => {
  if (!isDevDep(name)) return (`Missing dev dependency ${name}`);

  const dev = pkg.devDependencies[name];
  if (typeof dev !== "string" || typeof peer !== "string") {
    return `Could not parse semver range for ${name}: dev@${dev}, peer@${peer}`;
  }

  if (`^${dev}` !== peer) {
    return `Mismatch in \`${name}\` dependency: dev@${dev}, peer@${peer}`;
  }

  return false;
}).filter(Boolean);

if (mismatches.length > 0) {
  console.error(mismatches);
  Deno.exit(1);
} else {
  console.info("Dev and peer dependencies are correctly aligned:");
  console.info(pkg.peerDependencies);
  Deno.exit();
}
