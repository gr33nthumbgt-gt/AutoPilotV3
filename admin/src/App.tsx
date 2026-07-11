import { useState } from "react";
import "./App.css";

import Sidebar, { type AdminPage } from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";
import Managers from "./pages/Managers";
import Content from "./pages/Content";
import Vaults from "./pages/Vaults";
import Deposits from "./pages/Deposits";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

export default function App() {
  const [active, setActive] = useState<AdminPage>("dashboard");

  return (
    <main className="adminShell">
      <Sidebar active={active} setActive={setActive} />

      <section className="adminMain">
        {active === "dashboard" && <Dashboard />}
        {active === "investors" && <Investors />}
        {active === "managers" && <Managers />}
        {active === "vaults" && <Vaults />}
        {active === "deposits" && <Deposits />}
        {active === "content" && <Content />}
        {active === "notifications" && <Notifications />}
        {active === "settings" && <Settings />}
      </section>
    </main>
  );
}