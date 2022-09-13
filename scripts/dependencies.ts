import pkg from "../package.json" assert { type: "json" };

const mismatches = Object.entries(pkg.peerDependencies).map(([name, peer]) => {
  // @ts-expect-error
  const dev = pkg.devDependencies[name];
  if (typeof dev !== "string" || typeof peer !== "string") {
    console.error("Could not parse semver range:", name, {dev, peer});
    return [dev, peer].join(", ");
  }
  if (dev !== peer) {
    console.error("Mismatch in peer dependency versions:", name, {dev, peer});
    return [dev, peer].join(", ");
  }

  return false;
}).filter(Boolean);

if (mismatches.length > 0) {
  Deno.exit(1);
}
