// Génère des versions WebP légères des images de public/uploads dans public/optimized,
// et un manifest (lib/image-manifest.json) utilisé par le composant <Img>.
// Les originaux ne sont jamais modifiés : ils restent accessibles au clic.
//
// Usage : npm run optimize-images
// Incrémental : seules les images nouvelles ou modifiées sont traitées.

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
// SHARP_PATH permet à la CI d'utiliser sharp sans installer tout le projet.
let sharp;
try {
  ({ default: sharp } = await import(process.env.SHARP_PATH ?? "sharp"));
} catch {
  console.error(
    "sharp est introuvable. Installez-le une fois avec : npm install --no-save sharp@0.33.5"
  );
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "public", "uploads");
const OUT_DIR = path.join(ROOT, "public", "optimized");
const MANIFEST = path.join(ROOT, "lib", "image-manifest.json");

const WIDTHS = [800, 1600];
const QUALITY = 78;
// Vignette carrée du bandeau de la visionneuse (64 px affichés, x2 pour les écrans denses).
const THUMB = 160;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
// En dessous de ce poids et de cette largeur, l'original est déjà adapté au web.
const SKIP_UNDER_BYTES = 300 * 1024;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : [full];
    })
  );
  return files.flat();
}

function outputBase(rel) {
  const hash = crypto.createHash("sha1").update(rel).digest("hex").slice(0, 8);
  const slug = rel
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9/_-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  return `${slug}-${hash}`;
}

const exists = (url) =>
  fs.access(path.join(ROOT, "public", url)).then(() => true, () => false);

async function writeThumb(file, rel) {
  const url = `/optimized/${outputBase(rel)}-thumb.webp`;
  const out = path.join(ROOT, "public", url);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(file)
    .rotate()
    .resize({ width: THUMB, height: THUMB, fit: "cover" })
    .webp({ quality: QUALITY })
    .toFile(out);
  return url;
}

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

const previous = await readManifest();
const manifest = {};
const files = (await walk(SRC_DIR)).filter((f) =>
  EXTENSIONS.has(path.extname(f).toLowerCase())
);

let created = 0;
let reused = 0;
let skipped = 0;

for (const file of files) {
  const rel = path.relative(SRC_DIR, file).split(path.sep).join("/");
  const key = `/uploads/${rel}`;
  const stat = await fs.stat(file);
  const prev = previous[key];

  if (prev && prev.bytes === stat.size) {
    const allExist = await Promise.all(prev.srcset.map(([, url]) => exists(url)));
    if (allExist.every(Boolean)) {
      // Entrées antérieures aux vignettes : seule la vignette est générée.
      const thumb =
        prev.thumb && (await exists(prev.thumb)) ? prev.thumb : await writeThumb(file, rel);
      manifest[key] = { ...prev, thumb };
      reused++;
      continue;
    }
  }

  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch (e) {
    console.warn(`Ignorée (illisible) : ${key}`);
    continue;
  }
  // Les dimensions EXIF tournées (photos portrait) sont inversées.
  const rotated = meta.orientation && meta.orientation >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;

  if (stat.size < SKIP_UNDER_BYTES && width <= WIDTHS[WIDTHS.length - 1]) {
    skipped++;
    continue;
  }

  const targets = WIDTHS.filter((w) => w < width);
  if (targets.length === 0) targets.push(width);

  const base = outputBase(rel);
  const srcset = [];
  for (const w of targets) {
    const url = `/optimized/${base}-${w}.webp`;
    const out = path.join(ROOT, "public", url);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await sharp(file)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    srcset.push([w, url]);
  }
  const thumb = await writeThumb(file, rel);
  manifest[key] = { bytes: stat.size, width, height, srcset, thumb };
  created++;
  console.log(`✓ ${key}`);
}

// Supprime les fichiers optimisés dont l'original a disparu.
const keep = new Set(
  Object.values(manifest).flatMap((m) =>
    [...m.srcset.map(([, url]) => url), m.thumb].map((url) => path.join(ROOT, "public", url))
  )
);
let removed = 0;
try {
  for (const f of await walk(OUT_DIR)) {
    if (!keep.has(f)) {
      await fs.unlink(f);
      removed++;
    }
  }
} catch {}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");

console.log(
  `\n${created} optimisée(s), ${reused} déjà à jour, ${skipped} déjà légère(s), ${removed} obsolète(s) supprimée(s).`
);
