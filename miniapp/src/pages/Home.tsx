import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import ManagerCard from "../components/ManagerCard";
import { getWallet, getPortfolio, getManagers } from "../services/api";
import type { StrategyManager } from "../types/manager";

export default function Home({
  activate,
  openManager,
  deposit,
  withdraw,
  browseManagers,
}: {
  activate: () => void;
  openManager: (manager: StrategyManager) => void;
  deposit: () => void;
  withdraw: () => void;
  browseManagers: () => void;
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
  const walletBalance = Number(wallet?.balance ?? 0);
  const vaultBalance = Number(portfolio?.vault ?? 0);
  const allocated = Number(portfolio?.allocated ?? 0);
  const available = Number(portfolio?.available ?? 0);
  const totalReturn = Number(portfolio?.totalReturn ?? 0);
  const activeVault = vaultBalance > 0;

  return (
    <Screen>
      <p className="eyebrow">Dashboard</p>
      <h1>Welcome back.</h1>

      <div className="card heroCard">
        <p className="muted">Portfolio Value</p>
        <h2>{walletBalance + vaultBalance} {currency}</h2>
        <p className="text">Total return: +{totalReturn} {currency}</p>
      </div>

      <div className="card">
        <p className="muted">Investment Wallet</p>
        <h2>{walletBalance} {currency}</h2>

        <div className="actionGrid">
          <button onClick={deposit}>Deposit</button>
          <button className="secondary" onClick={withdraw}>Withdraw</button>
        </div>
      </div>

      <div className="card">
        <p className="muted">AutoPilot Vault</p>
        <h2>{vaultBalance} {currency}</h2>
        <p className="text">Available: {available} {currency}</p>
        <p className="text">Allocated: {allocated} {currency}</p>
        <p className="text">Status: {activeVault ? "Active" : "Inactive"}</p>

        {!activeVault && (
          <button onClick={activate}>Activate Vault</button>
        )}
      </div>

      <div className="sectionHeader">
        <h2>Strategy Managers</h2>
        <button className="linkButton" onClick={browseManagers}>View all</button>
      </div>

      {managers.map((manager) => (
        <ManagerCard
          key={manager.id}
          name={manager.name}
          detail={`${manager.category} · ${manager.markets}`}
          stat={`+${manager.return6m}%`}
          onClick={() => openManager(manager)}
        />
      ))}
    </Screen>
  );
}