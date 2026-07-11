export type AdminPage =
  | "dashboard"
  | "investors"
  | "managers"
  | "vaults"
  | "deposits"
  | "content"
  | "notifications"
  | "settings";

export default function Sidebar({
  active,
  setActive,
}: {
  active: AdminPage;
  setActive: (page: AdminPage) => void;
}) {
  const items: { key: AdminPage; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "investors", label: "Investors" },
    { key: "managers", label: "Managers" },
    { key: "vaults", label: "Vaults" },
    { key: "deposits", label: "Deposits" },
    { key: "content", label: "Content" },
    { key: "notifications", label: "Notifications" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <h2>AutoPilot</h2>

      {items.map((item) => (
        <button
          key={item.key}
          className={active === item.key ? "navItem active" : "navItem"}
          onClick={() => setActive(item.key)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}