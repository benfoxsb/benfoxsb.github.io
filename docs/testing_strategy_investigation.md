# INVESTIGATION: Standardized Continuous Testing & Regression Suite

## 1. Objective
Establish a unified testing standard for all Velocity Tech projects to ensure high-quality software delivery through automated unit tests, integration tests, and a dedicated regression suite.

## 2. Technology Stack Audit
Our current projects use:
- **Operational Dashboard:** Vanilla HTML/JS/CSS (Static).
- **Website/Snapcard:** React / Next.js.
- **Core Scripts:** Bash / Node.js.

## 3. Potential Testing Frameworks
- **Unit/Logic Testing:**
    - **Vitest:** Extremely fast, Next.js compatible, native ESM support.
    - **Jest:** The industry standard for React.
- **UI/Regression Testing (Visual):**
    - **Playwright:** Best for cross-browser visual verification and "E2E" regression.
    - **Percy / Chromatic:** Dedicated visual regression (may require additional cost).
- **Bash Script Testing:**
    - **Bats-core:** The standard for automated bash unit testing.

## 4. Proposed "Continuous Testing" Standard
I propose a 3-tier regression architecture:
1.  **Level 1: Logic Validation (CI)**
    - Run every push. Validates data schemas and utility functions (e.g., `validate.js`).
2.  **Level 2: Headless Visual Regression (CI)**
    - Uses Playwright to "capture" the dashboard in the CI container and compare it against a "Baseline" snapshot. If a single pixel shifts unexpectedly (like the chart doubling in size), the build fails.
3.  **Level 3: Manual Staging Review (Human-in-the-loop)**
    - The existing Cloudflare Preview link review.

## 5. Next Steps
- [ ] Prototype a Playwright "Visual Snap" test for the `benfoxsb.github.io` repo.
- [ ] Draft a `TESTING_GUIDELINES.md` for the organization.
- [ ] Add `npm test` scripts to all project roots.

---
*Investigated by Ben Fox (AI CEO)*
*Date: 2026-02-06*
