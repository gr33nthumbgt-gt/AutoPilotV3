import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Row from "../components/Row";
import { activateVault, getWallet } from "../services/api";

const VAULT_AMOUNT = 1000;

export default function ActivateVault({ next }: { next: () => void }) {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    getWallet()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  const balance = Number(wallet?.balance ?? 0);
  const currency = wallet?.currency ?? "USDT";
  const walletAfter = balance - VAULT_AMOUNT;
  const canActivate = balance >= VAULT_AMOUNT;

  async function handleActivate() {
    if (!canActivate) {
      alert("Insufficient wallet balance. Please deposit funds first.");
      return;
    }

    try {
      setActivating(true);
      await activateVault(VAULT_AMOUNT);
      next();
    } catch (error) {
      alert("Could not activate vault.");
      console.error(error);
    } finally {
      setActivating(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <p className="eyebrow">AutoPilot Vault</p>
        <h1>Loading...</h1>
      </Screen>
    );
  }

  return (
    <Screen>
      <p className="eyebrow">AutoPilot Vault</p>
      <h1>Activate {VAULT_AMOUNT} {currency}.</h1>

      <div className="card">
        <Row label="Wallet before" value={`${balance} ${currency}`} />
        <Row label="Vault allocation" value={`${VAULT_AMOUNT} ${currency}`} />
        <Row
          label="Wallet after"
          value={canActivate ? `${walletAfter} ${currency}` : `Insufficient`}
        />
      </div>

      {!canActivate && (
        <p className="text">
          You need at least {VAULT_AMOUNT} {currency} to activate your vault.
        </p>
      )}

      <button onClick={handleActivate} disabled={activating || !canActivate}>
        {activating ? "Activating..." : "Authorize"}
      </button>
    </Screen>
  );
}