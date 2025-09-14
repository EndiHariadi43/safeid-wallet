/**
 * post-twitter-monthly.js
 * Professional welcome tweet for monthly GitHub Sponsors (Bronze / Silver / Gold).
 *
 * ENV expected:
 *  - X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
 *  - EVENT_SPONSOR  : GitHub login
 *  - EVENT_PRIVACY  : "PUBLIC" | "PRIVATE"
 *  - EVENT_TIER     : tier name (e.g., "Bronze Sponsor", "Silver Sponsor", "Gold Sponsor")
 *  - EVENT_AMOUNT   : monthly price in cents (fallback; may be "0" if not provided)
 *
 * Dependencies:
 *  - twitter-api-v2
 */

import { TwitterApi } from "twitter-api-v2";

// ---------- Config ----------
const BRAND = "SafeID Wallet";
const HASHTAGS = ["OpenSource", "Web3", "SafeIDWallet"];
const MAX_TWEET_LEN = 280;

// Map cents to default tiers (if tier name is missing/changed)
const PRICE_TO_TIER = [
  { tier: "Gold",   cents: 10000 }, // $100
  { tier: "Silver", cents:  2500 }, // $25
  { tier: "Bronze", cents:   500 }  // $5
];

// ---------- Helpers ----------
function required(name, value) {
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}
function sanitizeHandle(h) { return String(h || "").replace(/[^\w]/g, ""); }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function withHashtags(text, tags = []) {
  const suffix = tags.length ? " " + tags.map(t => (t.startsWith("#") ? t : `#${t}`)).join(" ") : "";
  return text + suffix;
}
function trimTo280(text) {
  if (text.length <= MAX_TWEET_LEN) return text;
  const hard = text.slice(0, MAX_TWEET_LEN - 1);
  const lastSpace = hard.lastIndexOf(" ");
  return (lastSpace > 0 ? hard.slice(0, lastSpace) : hard).trimEnd() + "…";
}
function detectTier(name, amountCents) {
  const n = (name || "").toLowerCase();
  if (n.includes("gold")) return "Gold";
  if (n.includes("silver")) return "Silver";
  if (n.includes("bronze")) return "Bronze";
  const amt = Number(amountCents || 0);
  for (const rule of PRICE_TO_TIER) {
    if (amt >= rule.cents) return rule.tier;
  }
  return "Bronze"; // safe default
}

function buildTweet({ sponsor, privacy, tier }) {
  const isPublic = (privacy || "PUBLIC").toUpperCase() === "PUBLIC";
  const clean = sanitizeHandle(sponsor);

  const TPL = {
    Bronze: {
      public: [
        (h) => `🙌 Welcome @${h} as a **Bronze Sponsor** of ${BRAND}! Your monthly support helps us keep shipping secure, open-source Web3 tools.`,
        (h) => `🎉 Thank you @${h} for joining as a Bronze Sponsor of ${BRAND}. Your support keeps our open-source momentum strong!`
      ],
      private: [
        () => `🙌 Welcome a **Bronze Sponsor** of ${BRAND}! Your monthly support helps us keep shipping secure, open-source Web3 tools.`,
        () => `🎉 Thank you to a new Bronze Sponsor of ${BRAND}. Your support keeps our open-source momentum strong!`
      ]
    },
    Silver: {
      public: [
        (h) => `🚀 Welcome @${h} as a **Silver Sponsor** of ${BRAND}! Your monthly support accelerates development and community impact.`,
        (h) => `✨ Huge thanks to @${h} for becoming a Silver Sponsor of ${BRAND}. Your support helps us deliver more, faster.`
      ],
      private: [
        () => `🚀 Welcome a **Silver Sponsor** of ${BRAND}! Your monthly support accelerates development and community impact.`,
        () => `✨ Huge thanks to our new Silver Sponsor of ${BRAND}. Your support helps us deliver more, faster.`
      ]
    },
    Gold: {
      public: [
        (h) => `🌟 A warm welcome to @${h} as a **Gold Sponsor** of ${BRAND}! Your monthly support has a big impact on our open-source mission.`,
        (h) => `💎 Thank you @${h} for joining as a Gold Sponsor of ${BRAND}. Your support powers our roadmap and community efforts.`
      ],
      private: [
        () => `🌟 A warm welcome to a **Gold Sponsor** of ${BRAND}! Your monthly support has a big impact on our open-source mission.`,
        () => `💎 Thank you to our new Gold Sponsor of ${BRAND}. Your support powers our roadmap and community efforts.`
      ]
    }
  };

  const bank = TPL[tier] || TPL.Bronze;
  const base = isPublic && clean ? pickRandom(bank.public)(clean) : pickRandom(bank.private)();
  return trimTo280(withHashtags(base, HASHTAGS));
}

// ---------- Main ----------
async function main() {
  const X_API_KEY       = required("X_API_KEY", process.env.X_API_KEY);
  const X_API_SECRET    = required("X_API_SECRET", process.env.X_API_SECRET);
  const X_ACCESS_TOKEN  = required("X_ACCESS_TOKEN", process.env.X_ACCESS_TOKEN);
  const X_ACCESS_SECRET = required("X_ACCESS_SECRET", process.env.X_ACCESS_SECRET);

  const EVENT_SPONSOR = process.env.EVENT_SPONSOR || "";
  const EVENT_PRIVACY = (process.env.EVENT_PRIVACY || "PUBLIC").toUpperCase();
  const EVENT_TIER = process.env.EVENT_TIER || "";
  const EVENT_AMOUNT = process.env.EVENT_AMOUNT || "0";

  const tier = detectTier(EVENT_TIER, EVENT_AMOUNT);
  const tweet = buildTweet({ sponsor: EVENT_SPONSOR, privacy: EVENT_PRIVACY, tier });

  console.log(`Tier detected: ${tier}`);
  console.log("Composed tweet:");
  console.log(tweet);

  const client = new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_SECRET
  });

  try {
    const { data } = await client.v2.tweet(tweet);
    console.log("Tweet posted successfully:", data?.id);
  } catch (err) {
    const msg = err?.data?.detail || err?.message || String(err);
    console.error("Failed to post tweet:", msg);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Unexpected error:", e?.message || e);
  process.exit(1);
});
