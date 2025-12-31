#!/bin/bash

# Script to copy all built installers to public/downloads folder

echo "📦 Copying installers to public/downloads..."

# Get version from package.json
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.1")
echo "📌 Using version: $VERSION"

mkdir -p public/downloads

# macOS files - check for both version formats
# electron-builder creates files like "Inventory POS-1.0.1.dmg"
if [ -f "release/Inventory POS-${VERSION}.dmg" ]; then
  cp "release/Inventory POS-${VERSION}.dmg" "public/downloads/inventory-pos-mac-${VERSION}.dmg"
  echo "✅ Copied macOS Intel DMG"
elif [ -f "release/Inventory POS-0.0.0.dmg" ]; then
  cp "release/Inventory POS-0.0.0.dmg" "public/downloads/inventory-pos-mac-${VERSION}.dmg"
  echo "✅ Copied macOS Intel DMG (legacy version)"
fi

if [ -f "release/Inventory POS-${VERSION}-arm64.dmg" ]; then
  cp "release/Inventory POS-${VERSION}-arm64.dmg" "public/downloads/inventory-pos-mac-arm64-${VERSION}.dmg"
  echo "✅ Copied macOS Apple Silicon DMG"
elif [ -f "release/Inventory POS-0.0.0-arm64.dmg" ]; then
  cp "release/Inventory POS-0.0.0-arm64.dmg" "public/downloads/inventory-pos-mac-arm64-${VERSION}.dmg"
  echo "✅ Copied macOS Apple Silicon DMG (legacy version)"
fi

# Windows files
if [ -f "release/Inventory POS Setup ${VERSION}.exe" ]; then
  cp "release/Inventory POS Setup ${VERSION}.exe" "public/downloads/inventory-pos-win-${VERSION}.exe"
  echo "✅ Copied Windows EXE"
elif [ -f "release/Inventory POS Setup 0.0.0.exe" ]; then
  cp "release/Inventory POS Setup 0.0.0.exe" "public/downloads/inventory-pos-win-${VERSION}.exe"
  echo "✅ Copied Windows EXE (legacy version)"
fi

# Linux files
if [ -f "release/Inventory POS-${VERSION}.AppImage" ]; then
  cp "release/Inventory POS-${VERSION}.AppImage" "public/downloads/inventory-pos-linux-${VERSION}.AppImage"
  chmod +x "public/downloads/inventory-pos-linux-${VERSION}.AppImage"
  echo "✅ Copied Linux AppImage"
elif [ -f "release/Inventory POS-0.0.0.AppImage" ]; then
  cp "release/Inventory POS-0.0.0.AppImage" "public/downloads/inventory-pos-linux-${VERSION}.AppImage"
  chmod +x "public/downloads/inventory-pos-linux-${VERSION}.AppImage"
  echo "✅ Copied Linux AppImage (legacy version)"
fi

echo ""
echo "📋 Files in public/downloads:"
ls -lh public/downloads/

echo ""
echo "✨ Done! Files are ready for download."

