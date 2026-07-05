import { useState } from "react";
import "./styles.css";

import BottomNav, { type Page } from "./components/BottomNav";

import Welcome from "./pages/Welcome";
import ProfileSetup from "./pages/ProfileSetup";
import WalletSetup from "./pages/WalletSetup";
import ActivateVault from "./pages/ActivateVault";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import StrategyManager from "./pages/StrategyManager";
import Activity from "./pages/Activity";
import CopyStrategy from "./pages/CopyStrategy";
import Portfolio from "./pages/Portfolio";
import ProfilePage from "./pages/ProfilePage";

import type { StrategyManager as ManagerType } from "./types/manager";

type Screen =
  | "welcome"
  | "profileSetup"
  | "walletSetup"
  | "activateVault"
  | "home"
  | "discover"
  | "manager"
  | "activity"
  | "copy"
  | "portfolio"
  | "profilePage";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedManager, setSelectedManager] = useState<ManagerType | null>(null);

  const setPage = (page: Page) => setScreen(page);

  const showNav = ![
    "welcome",
    "profileSetup",
    "walletSetup",
    "activateVault",
    "activity",
    "copy",
    "manager",
  ].includes(screen);

  return (
    <main className="app">
      <div className="phone">
        {screen === "welcome" && (
          <Welcome next={() => setScreen("profileSetup")} />
        )}

        {screen === "profileSetup" && (
          <ProfileSetup next={() => setScreen("walletSetup")} />
        )}

        {screen === "walletSetup" && (
          <WalletSetup next={() => setScreen("activateVault")} />
        )}

        {screen === "activateVault" && (
          <ActivateVault next={() => setScreen("home")} />
        )}

        {screen === "home" && (
          <Home activate={() => setScreen("activateVault")} />
        )}

        {screen === "discover" && (
          <Discover
            openManager={(manager) => {
              setSelectedManager(manager);
              setScreen("manager");
            }}
          />
        )}

        {screen === "manager" && selectedManager && (
          <StrategyManager
            manager={selectedManager}
            openActivity={() => setScreen("activity")}
            copy={() => setScreen("copy")}
          />
        )}

        {screen === "activity" && (
          <Activity
            manager={selectedManager}
            back={() => setScreen("manager")}
          />
        )}

        {screen === "copy" && (
          <CopyStrategy
            manager={selectedManager}
            next={() => setScreen("portfolio")}
          />
        )}

        {screen === "portfolio" && (
          <Portfolio openActivity={() => setScreen("activity")} />
        )}

        {screen === "profilePage" && <ProfilePage />}

        {showNav && <BottomNav setPage={setPage} />}
      </div>
    </main>
  );
}