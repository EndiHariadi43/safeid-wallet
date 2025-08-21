export type ReputationResponse = {
  address: string;
  score: number;        // 0..100
  lastUpdated: string;  // ISO string
};

export async function getReputation(address: string): Promise<ReputationResponse> {
  // TODO: ganti dengan call API asli menggunakan env PASSPORT_API_BASE + PASSPORT_API_KEY
  const hash = [...address.toLowerCase()].reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = (hash % 60) + 40; // 40..99 (mock)
  return { address, score, lastUpdated: new Date().toISOString() };
}
