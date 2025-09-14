// .github/scripts/append-release-note.js
import fs from 'fs';

const sponsor = process.env.EVENT_SPONSOR || '';
const privacy = (process.env.EVENT_PRIVACY || 'PUBLIC').toUpperCase();
const file = 'RELEASE_NOTES_PENDING.md';

let line;
if (privacy === 'PUBLIC' && sponsor) {
  line = `- Thanks to @${sponsor} for the $50 one-time support! 🎉`;
} else {
  line = `- Thanks to a sponsor for the $50 one-time support! 🎉`;
}

// buat file kalau belum ada
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, `# Pending Acknowledgements for Next Release

${line}
`);
} else {
  // tambahkan entri baru jika belum ada pada hari ini
  const existing = fs.readFileSync(file, 'utf8');
  if (!existing.includes(line)) {
    fs.appendFileSync(file, `\n${line}\n`);
  }
}

console.log('Pending release note updated.');
