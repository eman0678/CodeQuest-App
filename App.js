import React, { useEffect, useState } from 'react';
import { View, BackHandler, StatusBar, ActivityIndicator } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { Mulish_400Regular, Mulish_700Bold } from '@expo-google-fonts/mulish';
import { C } from './src/theme';
import { Sparkles, Slide } from './src/ui';
import { AppProvider } from './src/context/AppContext'; // REQUIREMENT 3: context provider
import { useStoredState } from './src/hooks';             // REQUIREMENT 4: custom hook
import { Landing, Explore, Signup, Onboard, Dash, Course, Lesson, Chapter } from './src/screens';
import { Packs, Challenge } from './src/packs';
import { Tutorials, Tutorial } from './src/tutorialScreens';
import { MonthlyList, MonthlyDetail, Worlds, World, Notifications } from './src/community';
import { ChatWidget } from './src/chat';

const KEY = 'codequest:v1';
const FRESH = { name: '', xp: 0, done: {}, badges: [], streak: 1, onboarded: false, last: null, interest: null, sound: true, challenges: {}, tlikes: {}, tsaves: {}, follows: {}, tcomments: {}, chat: [], notifRead: {}, entries: {} };
const SCREENS = { landing: Landing, explore: Explore, signup: Signup, onboard: Onboard, dash: Dash, course: Course, lesson: Lesson, chapter: Chapter, packs: Packs, challenge: Challenge, tutorials: Tutorials, tutorial: Tutorial, monthly: MonthlyList, monthlyDetail: MonthlyDetail, worlds: Worlds, world: World };
const NO_CHAT = ['lesson', 'challenge', 'signup', 'onboard', 'chapter', 'world'];

export default function App() {
  const [fontsOk] = useFonts({ PressStart2P_400Regular, Mulish_400Regular, Mulish_700Bold });
  // custom hook: loads and saves the app data automatically
  const [store, save, ready] = useStoredState(KEY, FRESH);
  const [stack, setStack] = useState([{ name: 'landing' }]);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => { if (ready && store.onboarded) setStack([{ name: 'dash' }]); }, [ready]);

  const app = {
    store,
    go: (name, p = {}) => setStack((s) => [...s, { name, ...p }]),
    replace: (name, p = {}) => setStack((s) => [...s.slice(0, -1), { name, ...p }]),
    reset: (name, p = {}) => setStack([{ name, ...p }]),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    update: (patch) => save({ ...store, ...patch }),
    completeEx: (cid, i, xp) => { const d = store.done[cid] || []; if (d.includes(i)) return; save({ ...store, xp: store.xp + xp, last: cid, done: { ...store.done, [cid]: [...d, i] } }); },
    award: (cid) => { if (!store.badges.includes(cid)) save({ ...store, badges: [...store.badges, cid] }); },
    openPanel: (p) => { if (p === 'notif') setNotifOpen(true); },
    reset_all: () => { save({ ...FRESH }); setStack([{ name: 'landing' }]); },
  };

  useEffect(() => {
    const h = BackHandler.addEventListener('hardwareBackPress', () => { if (stack.length > 1) { app.back(); return true; } return false; });
    return () => h.remove();
  }, [stack]);

  if (!fontsOk || !ready) return <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center' }}><ActivityIndicator color={C.yellow} /></View>;
  const cur = stack[stack.length - 1]; const Screen = SCREENS[cur.name];
  return (
    // The Provider wraps the whole app: everything inside can read `app` with useApp()
    <AppProvider value={app}>
      <Sparkles>
        <StatusBar barStyle="light-content" />
        {!NO_CHAT.includes(cur.name) ? <ChatWidget /> : null}
        <Notifications open={notifOpen} onClose={() => setNotifOpen(false)} />
        <Slide key={cur.name + (cur.i ?? '') + (cur.cid ?? '') + (cur.pid ?? '') + (cur.tid ?? '') + (cur.author ?? '') + (cur.mid ?? '')}><Screen app={app} {...cur} /></Slide>
      </Sparkles>
    </AppProvider>
  );
}
