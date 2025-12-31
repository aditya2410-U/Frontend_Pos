#!/bin/bash

# Script to copy all built installers to public/downloads folder

echo "📦 Copying installers to public/downloads..."

mkdir -p public/downloads

# macOS files
if [ -f "release/Inventory POS-0.0.0.dmg" ]; then
  cp "release/Inventory POS-0.0.0.dmg" "public/downloads/inventory-pos-mac-1.0.0.dmg"
  echo "✅ Copied macOS Intel DMG"
fi

if [ -f "release/Inventory POS-0.0.0-arm64.dmg" ]; then
  cp "release/Inventory POS-0.0.0-arm64.dmg" "public/downloads/inventory-pos-mac-arm64-1.0.0.dmg"
  echo "✅ Copied macOS Apple Silicon DMG"
fi

# Windows files
if [ -f "release/Inventory POS Setup 0.0.0.exe" ]; then
  cp "release/Inventory POS Setup 0.0.0.exe" "public/downloads/inventory-pos-win-1.0.0.exe"
  echo "✅ Copied Windows EXE"
fi

# Linux files
if [ -f "release/Inventory POS-0.0.0.AppImage" ]; then
  cp "release/Inventory POS-0.0.0.AppImage" "public/downloads/inventory-pos-linux-1.0.0.AppImage"
  chmod +x "public/downloads/inventory-pos-linux-1.0.0.AppImage"
  echo "✅ Copied Linux AppImage"
fi

echo ""
echo "📋 Files in public/downloads:"
ls -lh public/downloads/

echo ""
echo "✨ Done! Files are ready for download."

