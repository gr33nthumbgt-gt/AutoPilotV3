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

  const currency = portfolio?.currency ?? "USDT";
  const allocations = portfolio?.allocations ?? [];

  return (
    <Screen>
      <p className="eyebrow">Portfolio</p>
      <h1>{allocations.length > 0 ? "Portfolio active." : "No strategies yet."}</h1>

      <div className="card">
        <Row label="Investment Wallet" value={`${portfolio.wallet} ${currency}`} />
        <Row label="AutoPilot Vault" value={`${portfolio.vault} ${currency}`} />
        <Row label="Allocated" value={`${portfolio.allocated} ${currency}`} />
        <Row label="Available" value={`${portfolio.available} ${currency}`} />
        <Row label="Today" value={`+${portfolio.todayReturn} ${currency}`} positive />
        <Row label="Total Return" value={`+${portfolio.totalReturn} ${currency}`} positive />
      </div>

      {allocations.length > 0 ? (
        <div className="card">
          <p className="muted">Copied Strategies</p>

          {allocations.map((allocation: any) => (
            <Row
              key={allocation.id}
              label={allocation.manager?.name || "Strategy"}
              value={`${allocation.amount} ${allocation.currency}`}
            />
          ))}
        </div>
      ) : (
        <p className="text">
          Copy a strategy manager to start building your portfolio.
        </p>
      )}

      <button onClick={loadPortfolio}>Refresh Portfolio</button>
      <button className="secondary" onClick={openActivity}>
        Open Activity
      </button>
    </Screen>
  );
}