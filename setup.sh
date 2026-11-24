#!/bin/sh
# CodeQuest one-click setup for macOS / Linux
SRC="$(cd "$(dirname "$0")" && pwd)"; APP="$SRC/codequest-app"
cd "$SRC"
[ -f "$APP/package.json" ] || npx --yes create-expo-app@latest codequest-app --template blank --yes
[ -f "$APP/package.json" ] || { echo "Could not create the project. Check your internet connection."; exit 1; }
cd "$APP"
npx expo install @react-native-async-storage/async-storage expo-linear-gradient expo-font react-native-webview expo-audio @expo-google-fonts/press-start-2p @expo-google-fonts/mulish react-native-web react-dom @expo/metro-runtime expo-document-picker
cp "$SRC/App.js" "$APP/App.js"
mkdir -p "$APP/src" "$APP/assets/scenes" "$APP/assets/audio"
cp -R "$SRC/src/." "$APP/src/"
cp -R "$SRC/assets/scenes/." "$APP/assets/scenes/"
cp -R "$SRC/assets/audio/." "$APP/assets/audio/"
npx expo start -c
