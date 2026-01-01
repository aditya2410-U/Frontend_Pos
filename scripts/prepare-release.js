#!/usr/bin/env node

/**
 * Script to prepare a new release
 * Updates version, builds installers, and prepares for GitHub release
 */

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Read package.json
const packageJsonPath = join(rootDir, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

// Get current version
const currentVersion = packageJson.version;
console.log(`📦 Current version: ${currentVersion}`);

// Parse version
const [major, minor, patch] = currentVersion.split(".").map(Number);

// Ask user for version bump type
const args = process.argv.slice(2);
let versionType = args[0] || "patch"; // patch, minor, major

if (!["patch", "minor", "major"].includes(versionType)) {
  console.error("❌ Invalid version type. Use: patch, minor, or major");
  process.exit(1);
}

// Calculate new version
let newVersion;
if (versionType === "major") {
  newVersion = `${major + 1}.0.0`;
} else if (versionType === "minor") {
  newVersion = `${major}.${minor + 1}.0`;
} else {
  newVersion = `${major}.${minor}.${patch + 1}`;
}

console.log(`🚀 New version: ${newVersion}`);

// Update package.json
packageJson.version = newVersion;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
console.log("✅ Updated package.json");

// Build installers
console.log("\n📦 Building installers...");
console.log("This may take a few minutes...\n");

try {
  // Build for macOS
  console.log("🍎 Building macOS...");
  execSync("npm run electron:build:mac", { stdio: "inherit", cwd: rootDir });

  // Build for Linux
  console.log("\n🐧 Building Linux...");
  execSync("npm run electron:build:linux", { stdio: "inherit", cwd: rootDir });

  // Build for Windows (if Wine is available)
  console.log("\n🪟 Building Windows...");
  try {
    execSync("npm run electron:build:win", { stdio: "inherit", cwd: rootDir });
  } catch (error) {
    console.log(
      "⚠️  Windows build skipped (Wine not available or error occurred)"
    );
  }

  console.log("\n✅ Build complete!");
  console.log("\n📋 Next steps:");
  console.log(`1. Create GitHub release with tag: v${newVersion}`);
  console.log("2. Upload installers from release/ folder");
  console.log("3. Publish release");
  console.log("\nOr run:");
  console.log(`git tag v${newVersion}`);
  console.log("git push origin v" + newVersion);
} catch (error) {
  console.error("\n❌ Build failed:", error.message);
  process.exit(1);
}
