# Portfolio photo workflow

The initial cards are explicitly labeled branded placeholders. They are not completed-project claims and must remain separate from `projects` in `src/data/projects.ts`.

## Prepare approved photos

1. Obtain Kevin's approval for the final project wording and confirm the customer has approved public use of every image and any location detail.
2. Remove identifying details visible in the frame: house numbers, license plates, faces, paperwork, access codes, neighboring addresses, and distinctive customer possessions when relevant.
3. Strip EXIF, GPS, device, timestamp, and author metadata. Verify the exported file contains no metadata; do not rely only on a filename change.
4. Crop a landscape lead image to 1600 × 1200 pixels (4:3). Keep an optional 1200 × 1600 portrait source for alternate layouts. Before/after pairs should use the same dimensions, crop, viewpoint, and ordering.
5. Export AVIF at an appropriate visual quality and WebP as a broad fallback. Aim for under 250 KB per image while checking edges, siding, rails, and other high-detail areas for compression artifacts.
6. Use lowercase descriptive filenames such as `uniontown-deck-after.webp`; do not include customer names or street addresses.
7. Write concise alt text that describes the visible work, not marketing language—for example, “New wood deck with black railings behind a two-story home.” Use an empty alt only for genuinely decorative duplicates.
8. Add optimized files under `public/images/projects/`, create a typed `ProjectRecord`, and render it from the real `projects` collection. Never move a placeholder into that collection.

## Test the replacement

Check short and long titles, portrait and landscape sources, and before/after pairs at phone, tablet, and desktop widths. Confirm there is no layout shift, no stretched crop, useful alt text, lazy loading below the fold, and no customer-identifying metadata. Delete the corresponding placeholder only after the real record is visible and approved.

