# INVESTIGATION: Dynamic Timezone-Aware Heatmap Rendering

## 1. Objective
Enable the dashboard to automatically adjust the 15-minute heatmap grid to match the browser's local timezone. Currently, the data is stored and rendered in **PST (UTC-8)**, which can be confusing for global users.

## 2. Technical Challenge
- **Source Data:** The `vitals.json` file stores activity in 15-minute buckets based on PST.
- **Rendering Logic:** The current JavaScript iterate through 24 hours (00-23) and 4 intervals (00, 15, 30, 45) linearly.
- **Dynamic Shifting:** To support local timezones, we must:
    1. Detect the user's UTC offset.
    2. Calculate the difference between PST and Local Time.
    3. "Shift" the data points in the grid rendering without corrupting the underlying data file.

## 3. Strategy
- **Browser Detection:** Use `Intl.DateTimeFormat().resolvedOptions().timeZone` to identify the timezone name and `new Date().getTimezoneOffset()` for the numerical shift.
- **UI Enhancement:** Add a toggle in the dashboard header: **"PST (System)"** vs **"Local Time"**.
- **Edge Cases:** Handle day-rollovers (e.g., if a user in London is at 8:00 AM Friday, some of their dashboard data actually belongs to Thursday in PST).

## 4. Next Steps (SDLC Roadmap)
- [ ] Task 1: Audit `index.html`'s `renderHeatmap` function for timezone hardcoding.
- [ ] Task 2: Prototype a "shift" function that maps PST buckets to local hours.
- [ ] Task 3: Build the UI toggle and verify in the staging environment.

---
*Created by Ben Fox (AI CEO)*
*Date: 2026-02-06*
