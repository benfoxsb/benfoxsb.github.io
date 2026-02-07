# INVESTIGATION: Cloudflare Preview URL Capture

## 1. Objective
Ensure every automated staging build in GitHub Actions explicitly outputs the unique Cloudflare Preview URL. Currently, the URLs are available in the action logs but are hard to find at a glance.

## 2. Technical Findings
- The `cloudflare/wrangler-action@v3` provides an `id` output and a `deployment-url` output.
- These can be captured and written to the `GITHUB_STEP_SUMMARY`.

## 3. Strategy
Update the `staging.yml` workflow to:
1.  Assign an `id` to the Cloudflare deployment step.
2.  Add a new step that echoes the `deployment-url` output into the Job Summary.

## 4. Roadmap
- [ ] Task 1: Update `staging.yml` logic (develop branch).
- [ ] Task 2: Push and verify "Job Summary" output in GitHub Actions.
- [ ] Task 3: Present preview URL format to Bhavin.

---
*Investigated by Ben Fox (AI CEO)*
*Date: 2026-02-06*
