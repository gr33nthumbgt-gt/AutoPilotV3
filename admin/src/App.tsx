import { useEffect, useState } from "react";
import "./App.css";
import { getAdminOverview, getAdminInvestors, getManagers } from "./services/api";

export default function App() {
  const [overview, setOverview] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);

  useEffect(() => {
    getAdminOverview().then(setOverview);
    getAdminInvestors().then(setInvestors);
    getManagers().then(setManagers);
  }, []);

  return (
    <main className="admin">
      <h1>AutoPilot Admin</h1>

      <section className="grid">
        <Card label="Investors" value={overview?.investors ?? "..."} />
        <Card label="Managers" value={overview?.managers ?? "..."} />
        <Card label="Active Vaults" value={overview?.activeVaults ?? "..."} />
        <Card label="Total AUM" value={`${overview?.totalAum ?? "..."} USDT`} />
      </section>

      <section className="panel">
        <h2>Strategy Managers</h2>
        {managers.map((manager) => (
          <div className="row" key={manager.id}>
            <div>
              <strong>{manager.name}</strong>
              <p>{manager.category} · {manager.markets}</p>
            </div>
            <span>+{manager.return6m}%</span>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Investors</h2>
        {investors.map((investor) => (
          <div className="row" key={investor.id}>
            <div>
              <strong>{investor.firstName || investor.username || investor.telegramId}</strong>
              <p>{investor.city || "No city"} · {investor.onboardingState}</p>
            </div>
            <span>{investor.vault?.balance ?? 0} USDT</span>
          </div>
        ))}
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}