import { build } from "esbuild";

await build({ entryPoints: ["style.css"], outfile: "style.min.css", minify: true });
await build({ entryPoints: ["js/main.js"], outfile: "js/main.min.js", minify: true });
