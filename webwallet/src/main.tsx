import { createRoot } from 'react-dom/client'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import QRCode from 'qrcode'

const App: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [qr, setQr] = useState<string>('')
  const [rpc, setRpc] = useState<string>('https://bsc-dataseed.binance.org')

  const gen = () => {
    const w = ethers.Wallet.createRandom()
    setMnemonic(w.mnemonic?.phrase || '')
    setAddress(w.address)
  }

  useEffect(() => {
    if (address) {
      QRCode.toDataURL(address).then(setQr)
    } else {
      setQr('')
    }
  }, [address])

  const checkBalance = async () => {
    const provider = new ethers.JsonRpcProvider(rpc)
    if (!address) return alert('Generate or import a wallet first')
    const bal = await provider.getBalance(address)
    alert(`Balance: ${ethers.formatEther(bal)} BNB`)
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>SafeID Wallet (MVP)</h1>
      <p>Create a throwaway wallet for testing on BNB Smart Chain.</p>

      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          RPC: <input style={{width:'100%'}} value={rpc} onChange={(e)=>setRpc(e.target.value)} />
        </label>

        <button onClick={gen}>Generate Wallet</button>
        {mnemonic && <>
          <h3>Mnemonic (DEMO, do not use for real funds)</h3>
          <pre style={{whiteSpace:'pre-wrap'}}>{mnemonic}</pre>
        </>}

        {address && <>
          <h3>Address</h3>
          <code>{address}</code>
          {qr && <img src={qr} alt="qr" style={{width:160,height:160}}/>}
        </>}

        <button onClick={checkBalance}>Check Balance</button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
