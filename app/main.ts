import { getReputation } from "../passport/getReputation";

const el = document.getElementById("app")!;
el.innerHTML = `
  <h1>SafeID Wallet (PoC)</h1>
  <p>Masukkan alamat EVM untuk melihat skor reputasi (mock).</p>
  <input id="addr" placeholder="0x..." style="width:100%;padding:8px" />
  <button id="btn" style="margin-top:8px">Check Reputation</button>
  <pre id="out" style="margin-top:12px;background:#f6f6f6;padding:10px"></pre>
`;

document.getElementById("btn")!.addEventListener("click", async () => {
  const addr = (document.getElementById("addr") as HTMLInputElement).value.trim();
  if (!addr) return;
  const rep = await getReputation(addr);
  (document.getElementById("out") as HTMLElement).textContent = JSON.stringify(rep, null, 2);
});
