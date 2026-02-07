# Implementation Plan: Data Broker Stabilization

## Phase 1: Infrastructure & Configuration
- [ ] Create `config/` directory.
- [ ] Initialize `config/vitals-config.json`.
- [ ] Update `scripts/check-model-health.sh` to use the new config.

## Phase 2: Logic Refinement
- [ ] Refactor `scripts/collect-dashboard-vitals.sh`:
    - Improve log merging (separate archive step).
    - Implement `sessionId` based model attribution.
    - Add `git pull --rebase` safety.
- [ ] Port heatmap logic to a dedicated helper or refine the inline regex.

## Phase 3: Validation & Testing
- [ ] Upgrade `scripts/validate.js` with schema-based verification.
- [ ] Add a `test` mode to `collect-dashboard-vitals.sh` that doesn't push.
- [ ] Run end-to-end validation.

## Phase 4: Cron Update
- [ ] Update the cron payload to be more robust.
- [ ] Verify the Nightly Routine doesn't collide with the 15-minute sync.

## Phase 5: Cleanup
- [ ] Remove redundant `memory/` logs already archived.
- [ ] Verify dashboard live updates.
