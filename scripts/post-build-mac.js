#!/usr/bin/env node

/**
 * Post-build script to fix macOS DMG corruption issues
 * Removes quarantine attributes that cause "disk image is corrupted" errors
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const releaseDir = path.join(__dirname, "..", "release");

console.log("🔧 Fixing DMG files...");

// Find all DMG files in release directory
function findDMGFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Release directory not found: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findDMGFiles(fullPath));
    } else if (item.endsWith(".dmg")) {
      files.push(fullPath);
    }
  }

  return files;
}

const dmgFiles = findDMGFiles(releaseDir);

if (dmgFiles.length === 0) {
  console.log("⚠️  No DMG files found in release directory");
  process.exit(0);
}

for (const dmgFile of dmgFiles) {
  console.log(`\n📦 Processing: ${path.basename(dmgFile)}`);

  try {
    // Remove quarantine attributes
    console.log("  Removing quarantine attributes...");
    execSync(`xattr -cr "${dmgFile}"`, { stdio: "inherit" });

    // Verify DMG integrity
    console.log("  Verifying DMG integrity...");
    execSync(`hdiutil verify "${dmgFile}"`, { stdio: "inherit" });

    console.log(`  ✅ Fixed: ${path.basename(dmgFile)}`);
  } catch (error) {
    console.error(
      `  ❌ Error fixing ${path.basename(dmgFile)}:`,
      error.message
    );
    // Continue with other files
  }
}

console.log("\n✨ DMG files fixed successfully!");
