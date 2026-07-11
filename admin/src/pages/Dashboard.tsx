import { useEffect, useState } from "react";
import { getAdminOverview } from "../services/api";

export default function Dashboard() {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    getAdminOverview().then(setOverview);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <section className="grid">
        <Card label="Investors" value={overview?.investors ?? "..."} />
        <Card label="Managers" value={overview?.managers ?? "..."} />
        <Card label="Active Vaults" value={overview?.activeVaults ?? "..."} />
        <Card label="Total AUM" value={`${overview?.totalAum ?? "..."} USDT`} />
      </section>
    </div>
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