import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BalanceCard from "../components/BalanceCard";
import ManagerCard from "../components/ManagerCard";
import { getWallet, getPortfolio, getManagers } from "../services/api";
import type { StrategyManager } from "../types/manager";

export default function Home({
  activate,
  openManager,
  deposit,
  withdraw,
}: {
  activate: () => void;
  openManager: (manager: StrategyManager) => void;
  deposit: () => void;
  withdraw: () => void;
}) {
  const [wallet, setWallet] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [managers, setManagers] = useState<StrategyManager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getWallet(), getPortfolio(), getManagers()])
      .then(([walletData, portfolioData, managersData]) => {
        setWallet(walletData);
        setPortfolio(portfolioData);
        setManagers(managersData.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Screen>
        <p className="eyebrow">Dashboard</p>
        <h1>Loading...</h1>
      </Screen>
    );
  }

  const currency = wallet?.currency ?? portfolio?.currency ?? "USDT";
  const walletBalance = wallet?.balance ?? 0;
  const vaultBalance = portfolio?.vault ?? 0;
  const allocated = portfolio?.allocated ?? 0;
  const available = portfolio?.available ?? 0;
  const totalPortfolio = walletBalance + vaultBalance;
  const totalReturn = portfolio?.totalReturn ?? 0;
  const todayReturn = portfolio?.todayReturn ?? 0;

  return (
    <Screen>
      <p className="eyebrow">Dashboard</p>
      <h1>Welcome back.</h1>

      <div className="card">
        <p className="muted">Portfolio Value</p>
        <h2>{totalPortfolio} {currency}</h2>
        <p className="text">Total return: +{totalReturn} {currency}</p>
        <p className="text">Today: +{todayReturn} {currency}</p>
      </div>

      <BalanceCard
        label="Investment Wallet"
        value={`${walletBalance} ${currency}`}
      />

      <div className="actionGrid">
        <button onClick={deposit}>Deposit</button>
        <button className="secondary" onClick={withdraw}>
          Withdraw
        </button>
      </div>

      <div className="card">
        <p className="muted">AutoPilot Vault</p>
        <h2>{vaultBalance} {currency}</h2>
        <p className="text">Allocated: {allocated} {currency}</p>
        <p className="text">Available: {available} {currency}</p>
      </div>

      <h2>Discover Managers</h2>

      {managers.map((manager) => (
        <ManagerCard
          key={manager.id}
          name={manager.name}
          detail={`${manager.category} · ${manager.markets}`}
          stat={`+${manager.return6m}%`}
          onClick={() => openManager(manager)}
        />
      ))}

      <button onClick={activate}>Add to Vault</button>
    </Screen>
  );
}