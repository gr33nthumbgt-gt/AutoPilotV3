import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Row from "../components/Row";
import { getPortfolio } from "../services/api";

export default function Portfolio({ openActivity }: { openActivity: () => void }) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadPortfolio() {
    setLoading(true);
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <Screen>
        <p className="eyebrow">Portfolio</p>
        <h1>Loading...</h1>
      </Screen>
    );
  }

  return (
    <Screen>
      <p className="eyebrow">Portfolio</p>
      <h1>Vault active.</h1>

      <div className="card">
        <Row label="Telegram Wallet" value={`${portfolio.wallet} ${portfolio.currency}`} />
        <Row label="AutoPilot Vault" value={`${portfolio.vault} ${portfolio.currency}`} />
        <Row label="Allocated" value={`${portfolio.allocated} ${portfolio.currency}`} />
        <Row label="Available" value={`${portfolio.available} ${portfolio.currency}`} />
        <Row label="Today" value={`+${portfolio.todayReturn} ${portfolio.currency}`} positive />
        <Row label="Total Return" value={`+${portfolio.totalReturn} ${portfolio.currency}`} positive />
      </div>

      {portfolio.allocations?.length > 0 && (
        <div className="card">
          {portfolio.allocations.map((allocation: any) => (
            <Row
              key={allocation.id}
              label={allocation.manager?.name || "Strategy"}
              value={`${allocation.amount} ${allocation.currency}`}
            />
          ))}
        </div>
      )}

      <button onClick={loadPortfolio}>Refresh Portfolio</button>
      <button className="secondary" onClick={openActivity}>Open Activity</button>
    </Screen>
  );
}