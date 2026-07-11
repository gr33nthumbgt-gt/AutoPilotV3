import { useEffect, useState } from "react";
import { getVaults, updateVault, deleteVault } from "../services/vaults";

export default function Vaults() {
  const [vaults, setVaults] = useState<any[]>([]);
  const [selectedVault, setSelectedVault] = useState<any>(null);

  async function loadVaults() {
    setVaults(await getVaults());
  }

  useEffect(() => {
    loadVaults();
  }, []);

  async function saveVault() {
    if (!selectedVault) return;

    await updateVault(selectedVault.id, {
      balance: Number(selectedVault.balance),
      allocated: Number(selectedVault.allocated),
      available: Number(selectedVault.available),
      status: selectedVault.status,
    });

    setSelectedVault(null);
    await loadVaults();
  }

  async function removeVault(id: number) {
    if (!confirm("Delete this vault?")) return;
    await deleteVault(id);
    await loadVaults();
  }

  return (
    <div>
      <h1>Vaults</h1>

      <section className="panel">
        {vaults.map((vault) => (
          <div className="row" key={vault.id}>
            <div>
              <strong>{vault.investor?.firstName || vault.investor?.telegramId}</strong>
              <p>{vault.status} · {vault.currency}</p>
            </div>

            <span>{vault.balance} {vault.currency}</span>

            <button onClick={() => setSelectedVault(vault)}>Edit</button>
            <button className="danger" onClick={() => removeVault(vault.id)}>
              Delete
            </button>
          </div>
        ))}
      </section>

      {selectedVault && (
        <section className="panel">
          <h2>Edit Vault</h2>

          <div className="formGrid">
            {["balance", "allocated", "available", "status"].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={selectedVault[key] ?? ""}
                onChange={(e) =>
                  setSelectedVault({
                    ...selectedVault,
                    [key]: e.target.value,
                  })
                }
              />
            ))}
          </div>

          <button onClick={saveVault}>Save Vault</button>
          <button className="secondary" onClick={() => setSelectedVault(null)}>
            Cancel
          </button>
        </section>
      )}
    </div>
  );
}