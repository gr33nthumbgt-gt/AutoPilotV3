import { useEffect, useState } from "react";
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
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Screen from "./components/Screen";

import { loginInvestor } from "./services/api";
import type { StrategyManager as ManagerType } from "./types/manager";

type ScreenName =
  | "launching"
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
  | "profilePage"
  | "deposit"
  | "withdraw";

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("launching");
  const [depositBack, setDepositBack] = useState<ScreenName>("home");
  const [selectedManager, setSelectedManager] = useState<ManagerType | null>(null);

  useEffect(() => {
    async function launch() {
      try {
        const investor = await loginInvestor();
        setScreen(resolveLaunchScreen(investor));
      } catch (error) {
        console.error(error);
        setScreen("welcome");
      }
    }

    launch();
  }, []);

  function resolveLaunchScreen(investor: any): ScreenName {
    const profileComplete = investor?.onboardingState === "PROFILE_CREATED";
    const walletBalance = Number(investor?.wallet?.balance ?? 0);
    const vaultBalance = Number(investor?.vault?.balance ?? 0);
    const vaultActive = investor?.vault?.status === "ACTIVE" && vaultBalance > 0;

    if (!profileComplete) return "welcome";
    if (vaultActive) return "home";
    if (walletBalance >= 1000) return "activateVault";
    return "walletSetup";
  }

  const setPage = (page: Page) => setScreen(page);

  const showNav = ![
    "launching",
    "welcome",
    "profileSetup",
    "walletSetup",
    "activateVault",
    "activity",
    "copy",
    "manager",
    "deposit",
    "withdraw",
  ].includes(screen);

  function openManager(manager: ManagerType) {
    setSelectedManager(manager);
    setScreen("manager");
  }

  function openDeposit(backTo: ScreenName) {
    setDepositBack(backTo);
    setScreen("deposit");
  }

  return (
    <main className="app">
      <div className="phone">
        {screen === "launching" && (
          <Screen>
            <p className="eyebrow">AutoPilot</p>
            <h1>Opening your account...</h1>
          </Screen>
        )}

        {screen === "welcome" && <Welcome next={() => setScreen("profileSetup")} />}

        {screen === "profileSetup" && (
          <ProfileSetup next={() => setScreen("walletSetup")} />
        )}

        {screen === "walletSetup" && (
          <WalletSetup
            next={() => setScreen("activateVault")}
            deposit={() => openDeposit("walletSetup")}
          />
        )}

        {screen === "activateVault" && (
          <ActivateVault next={() => setScreen("home")} />
        )}

        {screen === "home" && (
          <Home
            activate={() => setScreen("activateVault")}
            openManager={openManager}
            deposit={() => openDeposit("home")}
            withdraw={() => setScreen("withdraw")}
            browseManagers={() => setScreen("discover")}
          />
        )}

        {screen === "deposit" && <Deposit back={() => setScreen(depositBack)} />}

        {screen === "withdraw" && <Withdraw back={() => setScreen("home")} />}

        {screen === "discover" && <Discover openManager={openManager} />}

        {screen === "manager" && selectedManager && (
          <StrategyManager
            manager={selectedManager}
            openActivity={() => setScreen("activity")}
            copy={() => setScreen("copy")}
          />
        )}

        {screen === "activity" && (
          <Activity manager={selectedManager} back={() => setScreen("manager")} />
        )}

        {screen === "copy" && (
          <CopyStrategy manager={selectedManager} next={() => setScreen("portfolio")} />
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