#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// CI vs Local Path detection
const isCI = process.env.GITHUB_ACTIONS === 'true';
const basePath = isCI ? process.cwd() : path.join(__dirname, '..');

const vitalsPath = path.join(basePath, 'vitals.json');
const indexPath = path.join(basePath, 'index.html');
const schemaPath = path.join(basePath, 'scripts/schema.json');

console.log('🚀 Starting Pre-Flight Validation...');
console.log(`📍 Context: ${isCI ? 'CI Environment' : 'Local Workspace'}`);
console.log(`📍 Base Path: ${basePath}`);

// 1. Check if files exist
if (!fs.existsSync(vitalsPath)) {
    console.error(`❌ Error: vitals.json missing at ${vitalsPath}`);
    process.exit(1);
}

// 2. Validate vitals.json
try {
    const vitals = JSON.parse(fs.readFileSync(vitalsPath, 'utf8'));
    console.log('✅ vitals.json is valid JSON');
    
    // 2.1 Basic Structure Check
    const requiredTopLevel = ['updated', 'windows', 'history', 'pulse', 'heatmap', 'failover'];
    for (const key of requiredTopLevel) {
        if (!(key in vitals)) throw new Error(`Missing top-level key: ${key}`);
    }

    // 2.2 Freshness Check
    const updated = new Date(vitals.updated);
    const now = new Date();
    const diffMins = (now - updated) / 1000 / 60;
    if (diffMins > 60) {
        console.warn(`⚠️ Warning: Data is ${Math.round(diffMins)} minutes old.`);
    } else {
        console.log(`✅ Data freshness: ${Math.round(diffMins)}m old`);
    }

    // 2.3 Schema Check (if available)
    if (fs.existsSync(schemaPath)) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        // Basic type validation
        if (typeof vitals.updated !== 'string') throw new Error('updated should be a string');
        console.log('✅ Schema check (basic) passed');
    }

} catch (e) {
    console.error(`❌ Validation Failed: ${e.message}`);
    process.exit(1);
}

// 3. Validate index.html syntax (basic)
if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    if (!indexContent.includes('<!DOCTYPE html>') || !indexContent.includes('</html>')) {
        console.error('❌ Error: index.html seems corrupted or incomplete');
        process.exit(1);
    }
    console.log('✅ index.html basic syntax check passed');
}

console.log('🟢 Validation Successful.');
process.exit(0);
