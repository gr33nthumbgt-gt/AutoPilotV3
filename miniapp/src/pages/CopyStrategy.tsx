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
  const [amount, setAmount] = useState("500");
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    getPortfolio()
      .then(setPortfolio)
      .finally(() => setLoading(false));
  }, []);

  const numericAmount = Number(amount);
  const available = Number(portfolio?.available ?? 0);
  const currency = portfolio?.currency ?? "USDT";
  const canCopy = manager && numericAmount > 0 && numericAmount <= available;

  async function handleCopy() {
    if (!manager || !canCopy) return;

    try {
      setCopying(true);
      await copyStrategy(manager.id, numericAmount);
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
        <Row label="Vault Balance" value={`${portfolio?.vault ?? 0} ${currency}`} />
        <Row label="Available" value={`${available} ${currency}`} />
        <Row label="Strategy" value={manager?.name || "Strategy"} />
      </div>

      <div className="card">
        <p className="muted">Allocation Amount</p>
        <input
          className="telegramInput"
          type="number"
          min="1"
          max={available}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <p className="text">
          {numericAmount > available
            ? `You only have ${available} ${currency} available.`
            : `You are allocating ${numericAmount || 0} ${currency}.`}
        </p>
      </div>

      <button onClick={handleCopy} disabled={copying || !canCopy}>
        {copying ? "Copying..." : `Copy ${manager?.name || "Strategy"}`}
      </button>
    </Screen>
  );
}