# FileZilla FTP Deployment Procedure — Aindhin
## Zero-Downtime Strategy for React + Vite

---

## Why Order Matters

When you upload a new build, there is a window of time where **some files are old and some are new**. If `index.html` (which references the new chunk hashes) arrives before the new chunk files do, every active user's browser will immediately try to load chunks that **don't exist yet** — causing `ChunkLoadError` for everyone.

**The golden rule:**
> Upload all assets **first** → upload `version.json` **second** → upload `index.html` **last**.

---

## Pre-Deployment Checklist

```bash
# 1. Run a clean build (generates sitemap → vite build → validates all chunks)
npm run build

# Expected final line:
# ✔ All N chunks verified. Build is safe to deploy via FTP.

# If you see ✖ VALIDATION FAILED — DO NOT proceed. Fix and rebuild.
```

CAUTION: Never upload a build that failed validate_assets.js. Missing chunks will cause immediate ChunkLoadErrors for all users on the site.

---

## FileZilla Settings (One-Time Setup)

| Setting | Value | Why |
|---|---|---|
| Transfer mode | **Active (Binary)** | Prevents line-ending corruption of JS files |
| Max simultaneous transfers | **4** | FTP servers often reject > 5 parallel connections |
| Timeout | **60s** | Allows large chunk files to finish uploading |
| Transfer → Overwrite | **Always overwrite** | Ensures stale files are replaced |

---

## Step-by-Step Upload Order

### Phase 1 — Upload New Assets (safe, old index.html still live)

In FileZilla, navigate to `dist/` locally and the site root (or `/public_html/`) remotely.

**Upload these first (in any order):**

```
dist/assets/        → /assets/          (all hashed .js, .css, .webp files)
dist/robots.txt     → /robots.txt
dist/sitemap.xml    → /sitemap.xml
dist/.htaccess      → /.htaccess
```

NOTE: Because chunk filenames contain a **content hash** (e.g., `index-A1B2C3D4.js`), new chunks have new names. Old chunk files remain on the server alongside the new ones — existing users keep loading the old app normally while you upload.

**Wait for all assets to finish uploading.** Watch the FileZilla transfer queue bottom panel — it must read **"0 files in queue"**.

---

### Phase 2 — Upload version.json

```
dist/version.json   → /version.json
```

This signals to any tab already showing the old app that a new version exists. Tabs running the old app will check this file on their next chunk error and trigger a reload.

IMPORTANT: Upload `version.json` **before** `index.html`. The version check in `versionCheck.js` also verifies that the new entry asset is accessible — uploading assets first ensures this check passes.

---

### Phase 3 — Upload index.html (final step)

```
dist/index.html     → /index.html
```

Once `index.html` is replaced, all **new** page loads (including browser refreshes) will receive the new chunk script tags. Because all new chunks are already on the server, they load successfully.

TIP: After uploading `index.html`, open a new incognito tab and verify the site loads correctly before announcing the deployment.

---

## Post-Deployment Verification

```
1. Open https://aindhin.com in a fresh incognito window
   → Site should load with no console errors

2. Open DevTools → Network → reload
   → version.json should return the new version (check Response tab)
   → All /assets/*.js files should return 200

3. Navigate between pages (e.g. Home → Courses → Blog)
   → No white screens, no ChunkLoadError in console

4. Open an OLD tab (from before the deploy) and click a navigation link
   → Should auto-reload within ~10s (RecoveryBoundary recovery spinner appears briefly)
   → After reload: site loads the new version correctly
```

---

## Cleanup Old Chunks (Optional, After Verification)

Old chunk files (from the previous build) remain on the server indefinitely since their hashes no longer appear in `index.html`. They cause no harm (browsers never request them) but consume disk space.

After **confirming the new deployment is stable** (≥24h), you can safely delete the old `/assets/` files that don't match the current `manifest.json`.

WARNING: Never delete old chunks **during** or **immediately after** a deployment. Some users may have the old `index.html` cached locally and will still request old chunk URLs for several minutes.

---

## Emergency Rollback

If the new build has a critical bug:

1. Keep a zip of the previous `dist/` folder locally before every deployment.
2. Upload the old `dist/assets/` files first (Phase 1).
3. Upload old `dist/version.json` (Phase 2).
4. Upload old `dist/index.html` (Phase 3).

Active users will be on the new (broken) version until their `versionCheck.js` detects the rollback version and auto-reloads their tab.

---

## Build + Deploy Command Reference

```bash
# Full production build (validate included)
npm run build

# Preview build locally before uploading
npx vite preview

# Check the build version before uploading
cat dist/version.json
```
