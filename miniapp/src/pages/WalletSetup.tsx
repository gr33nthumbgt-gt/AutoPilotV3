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

  return (
    <Screen>
      <p className="eyebrow">Telegram Wallet</p>
      <h1>{loading ? "Checking wallet..." : "Wallet found."}</h1>

      {wallet && (
        <BalanceCard
          label="Available Balance"
          value={`${wallet.balance} ${wallet.currency}`}
        />
      )}

      <p className="text">
        Your funds stay in Telegram Wallet until you authorize a Vault allocation.
      </p>

      <button onClick={next} disabled={loading}>
        {loading ? "Please wait..." : "Choose amount"}
      </button>
    </Screen>
  );
}