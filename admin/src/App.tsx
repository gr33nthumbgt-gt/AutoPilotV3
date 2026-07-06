import { useEffect, useState } from "react";
import "./App.css";
import {
  getAdminOverview,
  getAdminInvestors,
} from "./services/api";
import {
  getManagers,
  createManager,
  updateManager,
  deleteManager,
} from "./services/managers";

const emptyManager = {
  name: "",
  category: "",
  bio: "",
  markets: "",
  return6m: 0,
  winRate: 0,
  maxDrawdown: 0,
  riskLevel: "Medium",
  trackerUrl: "",
  status: "ACTIVE",
};

export default function App() {
  const [overview, setOverview] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [form, setForm] = useState<any>(emptyManager);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadData() {
    setOverview(await getAdminOverview());
    setInvestors(await getAdminInvestors());
    setManagers(await getManagers());
  }

  useEffect(() => {
    loadData();
  }, []);

  function edit(manager: any) {
    setEditingId(manager.id);
    setForm(manager);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyManager);
  }

  async function saveManager() {
    if (!form.name || !form.category || !form.markets) {
      alert("Name, category, and markets are required.");
      return;
    }

    if (editingId) {
      await updateManager(editingId, form);
    } else {
      await createManager(form);
    }

    cancelEdit();
    await loadData();
  }

  async function removeManager(id: number) {
    if (!confirm("Delete this manager?")) return;
    await deleteManager(id);
    await loadData();
  }

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
        <h2>{editingId ? "Edit Manager" : "Add Manager"}</h2>

        <div className="formGrid">
          {Object.keys(emptyManager).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={form[key] ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: ["return6m", "winRate", "maxDrawdown"].includes(key)
                    ? Number(e.target.value)
                    : e.target.value,
                })
              }
            />
          ))}
        </div>

        <button onClick={saveManager}>
          {editingId ? "Save Changes" : "Create Manager"}
        </button>

        {editingId && <button onClick={cancelEdit}>Cancel</button>}
      </section>

      <section className="panel">
        <h2>Strategy Managers</h2>

        {managers.map((manager) => (
          <div className="row" key={manager.id}>
            <div>
              <strong>{manager.name}</strong>
              <p>
                {manager.category} · {manager.markets} · {manager.status}
              </p>
            </div>

            <span>+{manager.return6m}%</span>

            <button onClick={() => edit(manager)}>Edit</button>
            <button onClick={() => removeManager(manager.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Investors</h2>

        {investors.map((investor) => (
          <div className="row" key={investor.id}>
            <div>
              <strong>
                {investor.firstName || investor.username || investor.telegramId}
              </strong>
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