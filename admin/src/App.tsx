import { useEffect, useState } from "react";
import "./App.css";
import {
  getAdminOverview,
  getAdminInvestors,
  updateInvestor,
  updateInvestorWallet,
  updateInvestorVault,
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
  const [managerForm, setManagerForm] = useState<any>(emptyManager);
  const [editingManagerId, setEditingManagerId] = useState<number | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);

  async function loadData() {
    setOverview(await getAdminOverview());
    setInvestors(await getAdminInvestors());
    setManagers(await getManagers());
  }

  useEffect(() => {
    loadData();
  }, []);

  function editManagerForm(manager: any) {
    setEditingManagerId(manager.id);
    setManagerForm(manager);
  }

  function cancelManagerEdit() {
    setEditingManagerId(null);
    setManagerForm(emptyManager);
  }

  async function saveManager() {
    if (editingManagerId) await updateManager(editingManagerId, managerForm);
    else await createManager(managerForm);

    cancelManagerEdit();
    await loadData();
  }

  async function removeManager(id: number) {
    if (!confirm("Delete this manager?")) return;
    await deleteManager(id);
    await loadData();
  }

  async function saveInvestor() {
    if (!selectedInvestor) return;

    await updateInvestor(selectedInvestor.id, {
      firstName: selectedInvestor.firstName,
      phone: selectedInvestor.phone,
      email: selectedInvestor.email,
      city: selectedInvestor.city,
      gender: selectedInvestor.gender,
      country: selectedInvestor.country,
      onboardingState: selectedInvestor.onboardingState,
    });

    await updateInvestorWallet(
      selectedInvestor.id,
      Number(selectedInvestor.wallet?.balance ?? 0)
    );

    await updateInvestorVault(selectedInvestor.id, {
      balance: Number(selectedInvestor.vault?.balance ?? 0),
      allocated: Number(selectedInvestor.vault?.allocated ?? 0),
      available: Number(selectedInvestor.vault?.available ?? 0),
      status: selectedInvestor.vault?.status ?? "INACTIVE",
    });

    setSelectedInvestor(null);
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
        <h2>{editingManagerId ? "Edit Manager" : "Add Manager"}</h2>

        <div className="formGrid">
          {Object.keys(emptyManager).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={managerForm[key] ?? ""}
              onChange={(e) =>
                setManagerForm({
                  ...managerForm,
                  [key]: ["return6m", "winRate", "maxDrawdown"].includes(key)
                    ? Number(e.target.value)
                    : e.target.value,
                })
              }
            />
          ))}
        </div>

        <button onClick={saveManager}>
          {editingManagerId ? "Save Changes" : "Create Manager"}
        </button>

        {editingManagerId && (
          <button className="secondary" onClick={cancelManagerEdit}>
            Cancel
          </button>
        )}
      </section>

      <section className="panel">
        <h2>Strategy Managers</h2>

        {managers.map((manager) => (
          <div className="row" key={manager.id}>
            <div>
              <strong>{manager.name}</strong>
              <p>{manager.category} · {manager.markets} · {manager.status}</p>
            </div>
            <span>+{manager.return6m}%</span>
            <button onClick={() => editManagerForm(manager)}>Edit</button>
            <button className="danger" onClick={() => removeManager(manager.id)}>
              Delete
            </button>
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
            <button onClick={() => setSelectedInvestor(investor)}>Edit</button>
          </div>
        ))}
      </section>

      {selectedInvestor && (
        <section className="panel">
          <h2>Edit Investor</h2>

          <div className="formGrid">
            {["firstName", "phone", "email", "city", "gender", "country", "onboardingState"].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={selectedInvestor[key] ?? ""}
                onChange={(e) =>
                  setSelectedInvestor({
                    ...selectedInvestor,
                    [key]: e.target.value,
                  })
                }
              />
            ))}

            <input
              placeholder="wallet balance"
              value={selectedInvestor.wallet?.balance ?? 0}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  wallet: {
                    ...selectedInvestor.wallet,
                    balance: e.target.value,
                  },
                })
              }
            />

            <input
              placeholder="vault balance"
              value={selectedInvestor.vault?.balance ?? 0}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  vault: {
                    ...selectedInvestor.vault,
                    balance: e.target.value,
                  },
                })
              }
            />

            <input
              placeholder="vault allocated"
              value={selectedInvestor.vault?.allocated ?? 0}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  vault: {
                    ...selectedInvestor.vault,
                    allocated: e.target.value,
                  },
                })
              }
            />

            <input
              placeholder="vault available"
              value={selectedInvestor.vault?.available ?? 0}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  vault: {
                    ...selectedInvestor.vault,
                    available: e.target.value,
                  },
                })
              }
            />

            <input
              placeholder="vault status"
              value={selectedInvestor.vault?.status ?? "INACTIVE"}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  vault: {
                    ...selectedInvestor.vault,
                    status: e.target.value,
                  },
                })
              }
            />
          </div>

          <button onClick={saveInvestor}>Save Investor</button>
          <button className="secondary" onClick={() => setSelectedInvestor(null)}>
            Cancel
          </button>
        </section>
      )}
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