import type { StrategyManager as ManagerType } from "../types/manager";

export default function Activity({
  manager,
  back,
}: {
  manager: ManagerType | null;
  back: () => void;
}) {
  const trackerUrl = manager?.trackerUrl || "https://trade-tracker-rust.vercel.app/sun";

  return (
    <div className="trackerScreen">
      <div className="trackerTop">
        <button className="back" onClick={back}>←</button>
        <div>
          <p className="eyebrow">Live Activity</p>
          <h2>{manager?.name || "Strategy"} Tracker</h2>
        </div>
      </div>

      <iframe
        title="AutoPilot Strategy Tracker"
        src={trackerUrl}
        className="trackerFrame"
      />
    </div>
  );
}