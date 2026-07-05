import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BalanceCard from "../components/BalanceCard";
import { getWallet, getPortfolio } from "../services/api";

export default function Home({ activate }: { activate: () => void }) {
  const [wallet, setWallet] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getWallet(), getPortfolio()])
      .then(([walletData, portfolioData]) => {
        setWallet(walletData);
        setPortfolio(portfolioData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Screen>
        <p className="eyebrow">Good afternoon</p>
        <h1>Loading...</h1>
      </Screen>
    );
  }

  const walletValue = `${wallet?.balance ?? 0} ${wallet?.currency ?? "USDT"}`;
  const vaultValue =
    portfolio?.vault > 0
      ? `${portfolio.vault} ${portfolio.currency}`
      : "Inactive";

  return (
    <Screen>
      <p className="eyebrow">Good afternoon</p>
      <h1>Welcome back.</h1>

      <BalanceCard label="Telegram Wallet" value={walletValue} />
      <BalanceCard
        label="AutoPilot Vault"
        value={vaultValue}
        inactive={!portfolio?.vault}
      />

      <button onClick={activate}>
        {portfolio?.vault > 0 ? "Add to Vault" : "Activate Vault"}
      </button>
    </Screen>
  );
}