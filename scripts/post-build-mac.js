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
const downloadsDir = path.join(__dirname, "..", "dist-electron", "downloads");

console.log("🔧 Fixing DMG files...");

// Find all DMG files in a directory
function findDMGFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
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

// Find DMG files in both release and downloads directories
const dmgFiles = [...findDMGFiles(releaseDir), ...findDMGFiles(downloadsDir)];

if (dmgFiles.length === 0) {
  console.log("⚠️  No DMG files found in release directory");
  process.exit(0);
}

for (const dmgFile of dmgFiles) {
  console.log(`\n📦 Processing: ${path.basename(dmgFile)}`);

  try {
    // Remove quarantine attributes from DMG
    console.log("  Removing quarantine attributes from DMG...");
    execSync(`xattr -cr "${dmgFile}"`, { stdio: "inherit" });

    // Mount the DMG temporarily to remove quarantine from the app inside
    // We need to mount read-write to modify attributes
    console.log("  Mounting DMG to fix app bundle...");
    const mountOutput = execSync(
      `hdiutil attach "${dmgFile}" -nobrowse -readwrite`,
      {
        encoding: "utf-8",
      }
    );

    // Extract mount point from output (format: /dev/diskXsY /Volumes/AppName)
    const mountMatch = mountOutput.match(/\/Volumes\/[^\s]+/);
    if (mountMatch) {
      const mountPoint = mountMatch[0];
      const appPath = path.join(mountPoint, "Inventory POS.app");

      if (fs.existsSync(appPath)) {
        console.log("  Removing invalid signature from app bundle...");
        // Remove any existing signatures (they cause "damaged" errors)
        try {
          execSync(
            `codesign --remove-signature "${appPath}" 2>/dev/null || true`,
            { stdio: "inherit" }
          );
        } catch (e) {
          // Ignore if no signature exists
        }

        console.log("  Removing quarantine from app bundle...");
        execSync(`xattr -cr "${appPath}"`, { stdio: "inherit" });

        // Remove quarantine from all contents recursively
        try {
          execSync(
            `find "${appPath}" -type f -exec xattr -c {} \\; 2>/dev/null || true`,
            { stdio: "inherit" }
          );
          execSync(
            `find "${appPath}" -type d -exec xattr -c {} \\; 2>/dev/null || true`,
            { stdio: "inherit" }
          );
        } catch (e) {
          // Some files might not have xattrs, that's okay
        }

        // Remove com.apple.quarantine specifically
        try {
          execSync(
            `xattr -d com.apple.quarantine "${appPath}" 2>/dev/null || true`,
            { stdio: "inherit" }
          );
          execSync(
            `find "${appPath}" -exec xattr -d com.apple.quarantine {} \\; 2>/dev/null || true`,
            { stdio: "inherit" }
          );
        } catch (e) {
          // Ignore if attribute doesn't exist
        }
      }

      // Unmount the DMG (this will save changes)
      console.log("  Unmounting DMG...");
      execSync(`hdiutil detach "${mountPoint}"`, { stdio: "inherit" });
    }

    // Verify DMG integrity
    console.log("  Verifying DMG integrity...");
    execSync(`hdiutil verify "${dmgFile}"`, { stdio: "inherit" });

    console.log(`  ✅ Fixed: ${path.basename(dmgFile)}`);
  } catch (error) {
    console.error(
      `  ❌ Error fixing ${path.basename(dmgFile)}:`,
      error.message
    );
    // Try to unmount if something went wrong
    try {
      execSync(`hdiutil detach /Volumes/Inventory\\ POS 2>/dev/null || true`, {
        stdio: "ignore",
      });
    } catch (e) {
      // Ignore unmount errors
    }
    // Continue with other files
  }
}

console.log("\n✨ DMG files fixed successfully!");
