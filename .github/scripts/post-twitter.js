/**
 * post-twitter.js
 * Professional Twitter/X shoutout poster for GitHub Sponsors one-time tiers.
 *
 * ENV expected (provided by GitHub Actions):
 *  - X_API_KEY
 *  - X_API_SECRET
 *  - X_ACCESS_TOKEN
 *  - X_ACCESS_SECRET
 *  - EVENT_SPONSOR        : GitHub login (e.g., "octocat")
 *  - EVENT_PRIVACY        : "PUBLIC" | "PRIVATE" (default "PUBLIC")
 *  - DRY_RUN              : "true" to skip posting (optional, for tests)
 *
 * Dependencies:
 *  - twitter-api-v2
 *
 * Notes:
 *  - Respects sponsor privacy: if PRIVATE, do not @mention username
 *  - Keeps tweet length ≤ 280 chars
 *  - Randomizes templates to avoid repetition
 */

import { TwitterApi } from "twitter-api-v2";

// ---------- Config ----------
const BRAND = "SafeID Wallet";
const HASHTAGS = ["OpenSource", "Web3", "SafeIDWallet"]; // customize
const MAX_TWEET_LEN = 280;

// ---------- Helpers ----------
function required(name, value) {
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function sanitizeHandle(handle) {
  // very light sanitization: letters, numbers, underscore
  return String(handle || "").replace(/[^\w]/g, "");
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function withHashtags(text, tags = []) {
  const suffix = tags.length ? " " + tags.map(t => (t.startsWith("#") ? t : `#${t}`)).join(" ") : "";
  return text + suffix;
}

function trimTo280(text) {
  if (text.length <= MAX_TWEET_LEN) return text;
  // try trimming at word boundary
  const hard = text.slice(0, MAX_TWEET_LEN - 1);
  const lastSpace = hard.lastIndexOf(" ");
  return (lastSpace > 0 ? hard.slice(0, lastSpace) : hard).trimEnd() + "…";
}

function buildTweet({ sponsor, privacy }) {
  const isPublic = (privacy || "PUBLIC").toUpperCase() === "PUBLIC";
  const clean = sanitizeHandle(sponsor);

  const templatesPublic = [
    (h) =>
      `🎉 Huge thanks to @${h} for the one-time support for ${BRAND}! Your contribution helps us keep building secure, open-source Web3 tools for everyone.`,
    (h) =>
      `🙏 Thank you @${h} for backing ${BRAND}. Your support keeps open-source innovation moving forward and helps us ship faster and safer.`,
    (h) =>
      `💎 Shoutout to @${h} for supporting ${BRAND} with a one-time contribution. We appreciate your trust in our mission to make Web3 safer.`
  ];

  const templatesPrivate = [
    () =>
      `🎉 Huge thanks to a generous sponsor for the one-time support for ${BRAND}! Your contribution helps us keep building secure, open-source Web3 tools for everyone.`,
    () =>
      `🙏 Thank you to a supporter for backing ${BRAND}. Your support keeps open-source innovation moving forward and helps us ship faster and safer.`,
    () =>
      `💎 Shoutout to a generous sponsor for supporting ${BRAND}. We appreciate your trust in our mission to make Web3 safer.`
  ];

  const base = isPublic && clean
    ? pickRandom(templatesPublic)(clean)
    : pickRandom(templatesPrivate)();

  return trimTo280(withHashtags(base, HASHTAGS));
}

// ---------- Main ----------
async function main() {
  // DRY-RUN support (skip posting but print tweet)
  const DRY_RUN = process.env.DRY_RUN === "true";

  const X_API_KEY      = required("X_API_KEY", process.env.X_API_KEY);
  const X_API_SECRET   = required("X_API_SECRET", process.env.X_API_SECRET);
  const X_ACCESS_TOKEN = required("X_ACCESS_TOKEN", process.env.X_ACCESS_TOKEN);
  const X_ACCESS_SECRET= required("X_ACCESS_SECRET", process.env.X_ACCESS_SECRET);

  const EVENT_SPONSOR  = process.env.EVENT_SPONSOR || "";
  const EVENT_PRIVACY  = (process.env.EVENT_PRIVACY || "PUBLIC").toUpperCase();

  const tweet = buildTweet({ sponsor: EVENT_SPONSOR, privacy: EVENT_PRIVACY });

  console.log("Composed tweet:");
  console.log(tweet);

  if (DRY_RUN) {
    console.log("DRY_RUN=true → skipping post to X.");
    return;
  }

  const client = new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_SECRET,
  });

  try {
    const { data } = await client.v2.tweet(tweet);
    console.log("Tweet posted successfully:", data?.id);
  } catch (err) {
    // Surface useful info but avoid printing secrets
    const msg = err?.data?.detail || err?.message || String(err);
    console.error("Failed to post tweet:", msg);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Unexpected error:", e?.message || e);
  process.exit(1);
});
