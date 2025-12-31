#!/bin/bash

# Script to fix DMG corruption issues after build
# This removes quarantine attributes that cause "corrupted" errors

DMG_FILE="$1"

if [ -z "$DMG_FILE" ]; then
    echo "Usage: ./scripts/fix-dmg.sh <path-to-dmg-file>"
    exit 1
fi

if [ ! -f "$DMG_FILE" ]; then
    echo "Error: DMG file not found: $DMG_FILE"
    exit 1
fi

echo "Fixing DMG: $DMG_FILE"

# Remove quarantine attributes
xattr -cr "$DMG_FILE"

# Verify DMG integrity
echo "Verifying DMG integrity..."
hdiutil verify "$DMG_FILE"

if [ $? -eq 0 ]; then
    echo "✓ DMG is valid and ready for distribution"
else
    echo "✗ DMG verification failed"
    exit 1
fi

