import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";

const token = process.env.GH_TOKEN;
const login = process.env.GH_LOGIN;

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: { Authorization: `bearer ${token}` }
});

const q = gql`
query($login:String!, $after:String) {
  user(login:$login) {
    sponsorshipsAsMaintainer(first:100, includePrivate:false, after:$after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        privacyLevel
        sponsorEntity {
          ... on User { login avatarUrl url }
          ... on Organization { login avatarUrl url }
        }
        tier { name monthlyPriceInDollars isOneTime }
      }
    }
  }
}`;

async function fetchSponsors() {
  let after = null, all = [];
  do {
    const data = await client.request(q, { login, after });
    const s = data.user.sponsorshipsAsMaintainer;
    all.push(...s.nodes);
    after = s.pageInfo.hasNextPage ? s.pageInfo.endCursor : null;
  } while (after);
  // tampilkan hanya sponsor PUBLIC
  return all.filter(x => x.privacyLevel === "PUBLIC");
}

function bucket(name = "") {
  const t = name.toLowerCase();
  if (t.includes("gold")) return "Gold";
  if (t.includes("silver")) return "Silver";
  return "Bronze";
}

function groupByTier(list) {
  const g = { Gold: [], Silver: [], Bronze: [] };
  for (const s of list) g[bucket(s.tier?.name)].push(s);
  return g;
}

function line(s, size = 24) {
  const u = s.sponsorEntity;
  return `- <a href="${u.url}"><img src="${u.avatarUrl}" width="${size}"/> ${u.login}</a>`;
}

function renderSponsorsMd(list) {
  const g = groupByTier(list);
  return `# Sponsors 💖

We are grateful to our sponsors for supporting the development of **SafeID Wallet**.
Your contributions help us maintain, improve, and keep this project open-source.

---

## 🥇 Gold Sponsors
${g.Gold.length ? g.Gold.map(s => line(s, 40)).join("\n") : "_—_"}

## 🥈 Silver Sponsors
${g.Silver.length ? g.Silver.map(s => line(s, 28)).join("\n") : "_—_"}

## 🥉 Bronze Sponsors
${g.Bronze.length ? g.Bronze.map(s => line(s, 24)).join("\n") : "_—_"}

> Auto-generated from GitHub Sponsors (public sponsors only). Thanks for your support! 🙏

---
<p align="center"> Made with ❤️ by <a href="https://github.com/EndiHariadi43">Endi Hariadi</a> </p>
`;
}

function ensureReadmeMarkers() {
  if (!fs.existsSync("README.md")) return;
  let readme = fs.readFileSync("README.md", "utf8");
  const start = "<!-- FEATURED_SPONSOR_START -->";
  const end   = "<!-- FEATURED_SPONSOR_END -->";
  if (!readme.includes(start)) {
    readme += `

## 🌟 Featured Sponsor
${start}
_No featured sponsor yet_
${end}
`;
    fs.writeFileSync("README.md", readme);
  }
}

function patchReadmeFeatured(list) {
  if (!fs.existsSync("README.md")) return;
  const g = groupByTier(list);
  const golds = g.Gold;
  const block = golds.length
    ? `<p align="center">
<a href="${golds[0].sponsorEntity.url}">
  <img src="${golds[0].sponsorEntity.avatarUrl}" width="64"/><br/>
  <b>${golds[0].sponsorEntity.login}</b>
</a>
</p>`
    : `_No featured sponsor yet_`;

  let readme = fs.readFileSync("README.md", "utf8");
  readme = readme.replace(
    /<!-- FEATURED_SPONSOR_START -->[\s\S]*<!-- FEATURED_SPONSOR_END -->/,
    `<!-- FEATURED_SPONSOR_START -->\n${block}\n<!-- FEATURED_SPONSOR_END -->`
  );
  fs.writeFileSync("README.md", readme);
}

function writeIntoMarkers(file, start, end, content) {
  let text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (!text.includes(start)) {
    // fallback: kalau marker belum ada, tulis penuh
    fs.writeFileSync(file, content);
    return;
  }
  const re = new RegExp(`${start}[\\s\\S]*?${end}`);
  const block = `${start}\n${content}\n${end}`;
  text = text.replace(re, block);
  fs.writeFileSync(file, text);
}

(async () => {
  const sponsors = await fetchSponsors();
  const g = groupByTier(sponsors);
  const autoBlock = `## 🥇 Gold Sponsors
${g.Gold.length ? g.Gold.map(s => line(s, 40)).join("\n") : "_—_"}

## 🥈 Silver Sponsors
${g.Silver.length ? g.Silver.map(s => line(s, 28)).join("\n") : "_—_"}

## 🥉 Bronze Sponsors
${g.Bronze.length ? g.Bronze.map(s => line(s, 24)).join("\n") : "_—_"}`;

  // Update SPONSORS.md hanya di antara marker
  writeIntoMarkers(
    "SPONSORS.md",
    "<!-- SPONSORS_AUTO_START -->",
    "<!-- SPONSORS_AUTO_END -->",
    autoBlock
  );

  ensureReadmeMarkers();
  patchReadmeFeatured(sponsors);
  console.log("SPONSORS.md & README.md updated (with markers).");
})();

