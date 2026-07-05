import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import ManagerCard from "../components/ManagerCard";
import { getManagers } from "../services/api";
import type { StrategyManager } from "../types/manager";

export default function Discover({
  openManager,
}: {
  openManager: (manager: StrategyManager) => void;
}) {
  const [managers, setManagers] = useState<StrategyManager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManagers()
      .then(setManagers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Screen>
      <p className="eyebrow">Discover</p>
      <h1>Strategy Managers</h1>

      {loading && <p className="text">Loading managers...</p>}

      {!loading &&
        managers.map((manager) => (
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