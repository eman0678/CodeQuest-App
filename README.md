# EASIEST WAY TO RUN
Windows: unzip, open the folder, double-click setup.bat (or run it in the terminal). macOS/Linux: sh setup.sh.
It creates the Expo project, installs everything, copies the app in and starts it. Then scan the QR code with Expo Go.

# CodeQuest (Codédex-inspired learning app, Expo Go)

## Run it
1. Install Node.js LTS (nodejs.org) and the **Expo Go** app on your phone (Play Store / App Store).
2. In a terminal:
   npx create-expo-app@latest codequest --template blank
   cd codequest
   npx expo install @react-native-async-storage/async-storage expo-linear-gradient expo-font react-native-webview expo-audio @expo-google-fonts/press-start-2p @expo-google-fonts/mulish
3. Delete the generated App.js, then copy in this project's `App.js` and the `src/` folder.
4. npx expo start
5. Scan the QR code with Expo Go (Android) or the Camera app (iOS). Phone and PC must be on the same Wi-Fi.
   If it won't connect: npx expo start --tunnel

Copy the whole project: App.js, src/ AND assets/ (the photo backgrounds live in assets/scenes).
To add more pictures: drop them in assets/scenes and add a require(...) line to SRC in src/scenes.js.

## What works
Landing, course search + category filters, signup (local demo), onboarding, dashboard, course page,
lessons with hints, Mark complete -> confetti + "+XP" toast, chapter-complete + badge screens,
tap sparkles (touch version of the mouse trail), progress/XP/level saved with AsyncStorage, Android back button.

## Code editor
HTML, CSS and JavaScript lessons run for real inside a sandboxed WebView (needs react-native-webview).
Python and SQL cannot run natively in Expo Go, so Python shows a simulated terminal (print, variables, math) and SQL is checked against the task.

## Sound
Expo packages needed: expo-audio. Background music plays on the landing page only (♪ ON/OFF button). A short achievement jingle plays when you earn a badge. Both respect the ON/OFF setting. No music plays during lessons.

## Courses (6 categories)
AI (Artificial Intelligence, Machine Learning, AI Pair Programming), Web Development (HTML, CSS, JavaScript, PHP & MySQL),
Data Science (Python, NumPy, SQL, Data Analysis), Computer Science, Game Development, Mobile Application Development.
Lesson text lives in src/courses/*.js (simple format, see dsl.js). Search looks through names, descriptions, keywords and lesson titles.

## Social sign-in
Google / GitHub buttons open a demo account chooser and consent screen (src/auth.js). No real account is contacted.
To make it real, replace the demo steps with expo-auth-session and your own OAuth client IDs; keep the onDone(profile) callback.

## Challenge Packs
Menu -> Challenge Packs (or the green button on the Dashboard). Tap a pack to flip it, press Start, solve the challenge in the editor,
press Run to see output and Submit answer to check it. Club packs unlock at Level 2.

## Open it in a web browser (preview)
In the project folder run:  npx expo install react-native-web react-dom @expo/metro-runtime
Then:  npx expo start --web   (or press w in the terminal). In the browser press F12, then Ctrl+Shift+M (device toolbar) and pick a phone
size, then reload, so the layout matches a phone. The code runner uses an iframe on the web instead of a WebView.

## Project Tutorials
Menu -> Project Tutorials (or the yellow button on the Dashboard). Search, filter by language chip, sort by Latest / Most liked / Most bookmarked.
Open a tutorial to read it, run the live demo, like / bookmark / comment (saved on the phone), follow the author and open linked docs.
Every tutorial cover is an original animation drawn in code (src/covers.js).

## Chat, notifications, Monthly Challenge, Worlds
Run once:  npx expo install expo-document-picker
* Yellow chat button (bottom right): Home / Messages tabs, emoji picker, GIF-style stickers (original animations), voice notes (microphone permission), file attachments. Replies are an automatic demo reply, not a real support team.
* Bell in the header opens Notifications (unread badge).
* Menu -> Monthly Challenge (list, filters, countdown, submit an entry) and Worlds (walkable pixel town).
