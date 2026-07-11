import { useEffect, useState } from "react";
import {
  getAdminInvestors,
  updateInvestor,
  updateInvestorWallet,
  updateInvestorVault,
} from "../services/api";

export default function Investors() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);

  async function loadInvestors() {
    setInvestors(await getAdminInvestors());
  }

  useEffect(() => {
    loadInvestors();
  }, []);

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
    await loadInvestors();
  }

  return (
    <div>
      <h1>Investors</h1>

      <section className="panel">
        {investors.map((investor) => (
          <div className="row" key={investor.id}>
            <div>
              <strong>
                {investor.firstName || investor.username || investor.telegramId}
              </strong>
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
            {[
              "firstName",
              "phone",
              "email",
              "city",
              "gender",
              "country",
              "onboardingState",
            ].map((key) => (
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
    </div>
  );
}