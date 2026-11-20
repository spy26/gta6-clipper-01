// gta6-clipper-01 — entrypoint (program/v1).
//
// What this program does, in one sentence: it reads VIDEO.json from the
// repository root, checks that it is valid JSON holding a real YouTube URL,
// and copies those exact bytes to the output directory.
//
// It performs no network access, reads no clock, and touches no files
// outside the bot directory and the output directory, so its result is
// fully deterministic: the same VIDEO.json in always produces the same
// VIDEO.json out.
//
// Environment:
//   MAKEFUN_BOT_DIR     directory holding VIDEO.json (default: /bot)
//   MAKEFUN_OUTPUT_DIR  directory receiving VIDEO.json (default: /output)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const INPUT_PATH = join(BOT_DIR, "VIDEO.json");
const OUTPUT_PATH = join(OUTPUT_DIR, "VIDEO.json");

const YOUTUBE_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

function fail(message) {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

function isYouTubeUrl(raw) {
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return false;
  }
  if (!YOUTUBE_HOSTS.has(parsed.hostname.toLowerCase())) {
    return false;
  }
  // youtube.com/watch?v=... and youtube.com/shorts/<id> both carry the
  // video id in the path or query; youtu.be/<id> carries it in the path.
  if (parsed.hostname.toLowerCase() === "youtu.be") {
    return parsed.pathname.replaceAll("/", "").length > 0;
  }
  if (parsed.pathname.startsWith("/watch")) {
    return parsed.searchParams.get("v") !== null;
  }
  if (parsed.pathname.startsWith("/shorts/")) {
    return parsed.pathname.split("/").filter(Boolean).length >= 2;
  }
  return false;
}

let bytes;
try {
  bytes = readFileSync(INPUT_PATH);
} catch (error) {
  fail(`cannot read ${INPUT_PATH}: ${error.message}`);
}

let payload;
try {
  payload = JSON.parse(bytes.toString("utf8"));
} catch (error) {
  fail(`VIDEO.json is not valid JSON: ${error.message}`);
}

if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
  fail("VIDEO.json must be a JSON object with a \"url\" field.");
}

if (typeof payload.url !== "string" || payload.url.length === 0) {
  fail("VIDEO.json must hold a non-empty string \"url\".");
}

if (!isYouTubeUrl(payload.url)) {
  fail(`"url" is not a YouTube watch/shorts URL: ${payload.url}`);
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, bytes);
} catch (error) {
  fail(`cannot write ${OUTPUT_PATH}: ${error.message}`);
}

console.log(`gta6-clipper-01: validated ${payload.url} -> ${OUTPUT_PATH}`);
