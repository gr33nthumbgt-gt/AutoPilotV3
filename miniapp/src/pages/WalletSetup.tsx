import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BalanceCard from "../components/BalanceCard";
import { getWallet } from "../services/api";

export default function WalletSetup({ next }: { next: () => void }) {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWallet()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  const balance = Number(wallet?.balance ?? 0);
  const currency = wallet?.currency ?? "USDT";

  return (
    <Screen>
      <p className="eyebrow">Investment Account</p>
      <h1>{loading ? "Checking wallet..." : "Wallet ready."}</h1>

      {wallet && (
        <BalanceCard
          label="Available Balance"
          value={`${balance} ${currency}`}
        />
      )}

      <p className="text">
        Fund your account before committing funds to an AutoPilot Vault.
      </p>

      <button onClick={next} disabled={loading}>
        {loading ? "Please wait..." : "Continue"}
      </button>
    </Screen>
  );
}