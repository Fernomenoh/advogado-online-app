
#!/bin/bash

# Build Mobile App Script for Advogado Online
# This script builds and syncs the mobile application for both Android and iOS

echo "🚀 Building Advogado Online Mobile App"
echo "======================================="

# Check if we're in the correct directory
if [ ! -f "capacitor.config.ts" ]; then
    echo "❌ Error: capacitor.config.ts not found. Please run this script from the app root directory."
    exit 1
fi

# Build the web application
echo "📦 Building Next.js application..."
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Error: Next.js build failed"
    exit 1
fi

echo "✅ Next.js build completed successfully"

# Sync with Capacitor
echo "📱 Syncing with Capacitor..."
npx cap sync

if [ $? -ne 0 ]; then
    echo "❌ Error: Capacitor sync failed"
    exit 1
fi

echo "✅ Capacitor sync completed successfully"

# Display available commands
echo ""
echo "🎉 Mobile build completed successfully!"
echo ""
echo "Next steps:"
echo "  📱 Android: npx cap open android"
echo "  🍎 iOS:     npx cap open ios"
echo "  🔧 Run Android: npx cap run android"
echo "  🔧 Run iOS: npx cap run ios"
echo ""
echo "For production builds:"
echo "  📦 Android: cd android && ./gradlew assembleRelease"
echo "  📦 iOS: Open in Xcode and archive"

