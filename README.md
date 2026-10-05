# Steady

Pace a book or workbook to a deadline, plus a weekly chores checklist. A single HTML file, no frameworks, no build step; installed on an iPhone as a home screen web app.

Live: https://vcanela.github.io/steady-app/

## How the numbers work

- **Position** is the last page finished. A task runs from its first page to its last page.
- **Days left** includes today; the deadline means "finished by the end of that day".
- **Rest days** are a budget per task. The rate assumes every remaining rest day will be used, so taking one never raises the rate; unused rest days mean finishing early.
- **Today's target** is fixed from the position at the start of the day:
  `ceil(pages left this morning / planned working days left)`.
- **From tomorrow** assumes today's target is met, so it only drops when the student goes beyond it.
- **Pace mark** on the bar: where the original plan says the student should be by tonight. Colour compares the fill with it: green ahead, teal on track, amber behind.
- **Missed days**: when the app was not opened, the next launch asks whether those days were rest days.

All of this lives in `stats()` in `index.html`.

## Files

- `index.html`: the whole app (state in `localStorage` under `steady.v1`)
- `sw.js`: service worker. The page is network-first, so updates appear when online; icons, manifest and fonts are cache-first, so bump `CACHE` when changing those.
- `manifest.webmanifest`, `icons/`: PNG icons (iOS ignores SVG home screen icons)

## Installing on an iPhone

Open the live link in Safari, tap Share, then **Add to Home Screen**. Set up tasks inside the installed app: it has its own storage, separate from Safari. Removing the icon deletes the data, so use Settings → Copy backup code now and then.

## Local preview

```bash
python3 -m http.server 8093
```
