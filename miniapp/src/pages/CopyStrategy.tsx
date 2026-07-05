import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Row from "../components/Row";
import type { StrategyManager as ManagerType } from "../types/manager";
import { copyStrategy, getPortfolio } from "../services/api";

export default function CopyStrategy({
  manager,
  next,
}: {
  manager: ManagerType | null;
  next: () => void;
}) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    getPortfolio()
      .then(setPortfolio)
      .finally(() => setLoading(false));
  }, []);

  async function handleCopy() {
    if (!manager) return;

    try {
      setCopying(true);
      await copyStrategy(manager.id, 500);
      next();
    } catch (err) {
      alert("Copy failed.");
      console.error(err);
    } finally {
      setCopying(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <p className="eyebrow">Copy Strategy</p>
        <h1>Loading...</h1>
      </Screen>
    );
  }

  return (
    <Screen>
      <p className="eyebrow">Copy Strategy</p>
      <h1>{manager?.name || "Strategy Manager"}</h1>

      <p className="text">Allocate funds from your AutoPilot Vault.</p>

      <div className="card">
        <Row label="Vault Balance" value={`${portfolio.vault} ${portfolio.currency}`} />
        <Row label="Currently Available" value={`${portfolio.available} ${portfolio.currency}`} />
        <Row label="Allocation Amount" value={`500 ${portfolio.currency}`} />
        <Row label="Strategy" value={manager?.name || "Strategy"} />
      </div>

      <button onClick={handleCopy} disabled={copying || !manager}>
        {copying ? "Copying..." : "Allocate 500 USDT"}
      </button>
    </Screen>
  );
}