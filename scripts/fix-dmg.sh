#!/bin/bash

# Script to fix "damaged" DMG error on macOS
# Run this script after downloading the DMG file

echo "🔧 Fixing Inventory POS DMG..."
echo ""

# Check if DMG path is provided
if [ -z "$1" ]; then
    echo "Usage: ./fix-dmg.sh /path/to/inventory-pos-mac-arm64-1.0.1.dmg"
    echo ""
    echo "Or drag and drop the DMG file onto this script in Terminal"
    exit 1
fi

DMG_PATH="$1"

# Check if file exists
if [ ! -f "$DMG_PATH" ]; then
    echo "❌ Error: File not found: $DMG_PATH"
    exit 1
fi

echo "📦 Processing: $(basename "$DMG_PATH")"
echo ""

# Remove quarantine attributes from DMG
echo "1. Removing quarantine attributes from DMG..."
xattr -cr "$DMG_PATH" 2>/dev/null || echo "   ⚠️  Could not remove all attributes (this is okay)"

# Mount the DMG
echo "2. Mounting DMG..."
MOUNT_POINT=$(hdiutil attach "$DMG_PATH" -nobrowse -readwrite 2>&1 | grep "/Volumes" | awk '{print $3}')

if [ -z "$MOUNT_POINT" ]; then
    echo "   ❌ Failed to mount DMG"
    exit 1
fi

echo "   ✅ Mounted at: $MOUNT_POINT"

# Find the app bundle
APP_PATH="$MOUNT_POINT/Inventory POS.app"

if [ -d "$APP_PATH" ]; then
    echo "3. Removing quarantine from app bundle..."
    xattr -cr "$APP_PATH" 2>/dev/null || true
    
    # Remove from all contents
    find "$APP_PATH" -exec xattr -c {} \; 2>/dev/null || true
    echo "   ✅ App bundle fixed"
else
    echo "   ⚠️  App bundle not found at expected location"
fi

# Unmount the DMG
echo "4. Unmounting DMG..."
hdiutil detach "$MOUNT_POINT" >/dev/null 2>&1
echo "   ✅ DMG unmounted"

echo ""
echo "✨ Done! You can now open the DMG and install the app."
echo ""
echo "If you still see 'damaged' error, try:"
echo "  1. Right-click the app → Open (instead of double-clicking)"
echo "  2. Or run: sudo spctl --master-disable (temporarily disables Gatekeeper)"
echo ""
