import { useState } from "react";
import Screen from "../components/Screen";
import Row from "../components/Row";
import { activateVault } from "../services/api";

export default function ActivateVault({ next }: { next: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleActivate() {
    try {
      setLoading(true);
      await activateVault(1000);
      next();
    } catch (error) {
      alert("Could not activate vault.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <p className="eyebrow">AutoPilot Vault</p>
      <h1>Activate 1,000 USDT.</h1>

      <div className="card">
        <Row label="Wallet before" value="5,840 USDT" />
        <Row label="Vault allocation" value="1,000 USDT" />
        <Row label="Wallet after" value="4,840 USDT" />
      </div>

      <button onClick={handleActivate}>
        {loading ? "Activating..." : "Authorize"}
      </button>
    </Screen>
  );
}