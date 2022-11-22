import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

const settings = {
  buildCommand: "npm run build",
  outputDirectory: "dist/joeskeen.github.io",
  repository: "git@github.com:joeskeen/joeskeen.github.io.git",
  ghPagesBranch: "gh-pages",
};

const projectRoot = join(__dirname, "..");
const outputDirectory = join(projectRoot, settings.outputDirectory);

const info = (message) => console.log(chalk.cyanBright(message));
const run = (command, cwd) => execSync(command, { stdio: "inherit", cwd });

info("Building the project...");
run(settings.buildCommand, projectRoot);

info("Preparing output directory for publish...");
copyFileSync(
  join(outputDirectory, "index.html"),
  join(outputDirectory, "404.html")
);
copyFileSync(join(projectRoot, "CNAME"), join(outputDirectory, "CNAME"));
run(`git init`, outputDirectory);
run(`git add .`, outputDirectory);
run(`git commit -m "build output"`, outputDirectory);
run(`git checkout -b ${settings.ghPagesBranch}`, outputDirectory);
run(`git remote add origin ${settings.repository}`, outputDirectory);

info("Publishing to GitHub Pages...");
run(`git push origin ${settings.ghPagesBranch} --force`, outputDirectory);

info("Successfully published to GitHub Pages!");
