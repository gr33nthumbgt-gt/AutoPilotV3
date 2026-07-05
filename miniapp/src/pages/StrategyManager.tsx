import Screen from "../components/Screen";
import Row from "../components/Row";
import type { StrategyManager as ManagerType } from "../types/manager";

export default function StrategyManager({
  manager,
  openActivity,
  copy,
}: {
  manager: ManagerType;
  openActivity: () => void;
  copy: () => void;
}) {
  return (
    <Screen>
      <p className="eyebrow">Strategy Manager</p>
      <h1>{manager.name}</h1>
      <p className="text">{manager.bio}</p>

      <div className="card">
        <Row label="6M Return" value={`+${manager.return6m}%`} positive />
        <Row label="Win Rate" value={`${manager.winRate}%`} />
        <Row label="Max Drawdown" value={`${manager.maxDrawdown}%`} />
        <Row label="Risk" value={manager.riskLevel} />
      </div>

      <button onClick={openActivity}>View Live Activity</button>
      <button className="secondary" onClick={copy}>Copy Strategy</button>
    </Screen>
  );
}