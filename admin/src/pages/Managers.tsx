import { useEffect, useState } from "react";
import {
  getManagers,
  createManager,
  updateManager,
  deleteManager,
} from "../services/managers";

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

export default function Managers() {
  const [managers, setManagers] = useState<any[]>([]);
  const [form, setForm] = useState<any>(emptyManager);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadManagers() {
    setManagers(await getManagers());
  }

  useEffect(() => {
    loadManagers();
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
    if (editingId) await updateManager(editingId, form);
    else await createManager(form);

    cancelEdit();
    await loadManagers();
  }

  async function removeManager(id: number) {
    if (!confirm("Delete this manager?")) return;
    await deleteManager(id);
    await loadManagers();
  }

  return (
    <div>
      <h1>Managers</h1>

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

        {editingId && (
          <button className="secondary" onClick={cancelEdit}>
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
              <p>
                {manager.category} · {manager.markets} · {manager.status}
              </p>
            </div>

            <span>+{manager.return6m}%</span>

            <button onClick={() => edit(manager)}>Edit</button>
            <button className="danger" onClick={() => removeManager(manager.id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}