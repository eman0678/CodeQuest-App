@echo off
setlocal
rem ---- CodeQuest one-click setup for Windows ----
rem Creates a fresh Expo project next to this file, installs the packages, copies the app in, and starts it.
set "SRC=%~dp0"
set "APP=%SRC%codequest-app"

cd /d "%SRC%"
if not exist "%APP%\package.json" (
  echo.
  echo [1/4] Creating the Expo project... this takes a few minutes the first time.
  call npx --yes create-expo-app@latest codequest-app --template blank --yes
)
if not exist "%APP%\package.json" (
  echo.
  echo Could not create the project. Check your internet connection and run setup.bat again.
  pause
  exit /b 1
)

cd /d "%APP%"
echo.
echo [2/4] Installing packages...
call npx expo install @react-native-async-storage/async-storage expo-linear-gradient expo-font react-native-webview expo-audio @expo-google-fonts/press-start-2p @expo-google-fonts/mulish react-native-web react-dom @expo/metro-runtime expo-document-picker

echo.
echo [3/4] Copying the CodeQuest app files...
copy /Y "%SRC%App.js" "%APP%\App.js"
xcopy /E /I /Y "%SRC%src" "%APP%\src"
xcopy /E /I /Y "%SRC%assets\scenes" "%APP%\assets\scenes"
xcopy /E /I /Y "%SRC%assets\audio" "%APP%\assets\audio"

echo.
echo [4/4] Starting... scan the QR code with Expo Go (phone and PC on the same Wi-Fi).
call npx expo start -c
pause
