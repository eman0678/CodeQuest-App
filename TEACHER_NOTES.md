# Where the teacher's requirements are in this project

## 3. useContext  ->  src/context/AppContext.js
* `AppContext`, `AppProvider`, `useApp()` are defined in that file.
* The Provider wraps the whole app in `App.js` (`<AppProvider value={app}>`).
* Value shared: `store` (name, xp, badges, progress) + update function `update()` + navigation (`go`, `back`).
* Nested components that read it with `useApp()` and receive NO props for it:
  - `XPChip` in `src/ui.js` (inside Header) shows level and XP.
  - `Header` (src/ui.js) and `CourseCard` (src/screens.js).
  - `NameEditor` in `src/screens.js` (Dashboard profile card): reads the name AND changes it with `update()`.
    Try it: Dashboard -> tap your name -> edit -> Save. The header, banner and storage all update.

## 4. Custom hooks  ->  src/hooks.js
* `useStoredState(key, initial)`: useState + automatic load/save to AsyncStorage. Used in `App.js`.
* `useCourseProgress(course)`: exercises done, total, percent and XP for a course. Used in `CourseCard` (every card) and the `Course` screen.
