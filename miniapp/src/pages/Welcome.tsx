import { useState } from "react";
import Screen from "../components/Screen";
import { loginInvestor } from "../services/api";

export default function Welcome({ next }: { next: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleBegin() {
    try {
      setLoading(true);
      await loginInvestor();
      next();
    } catch (error) {
      alert("Could not connect to AutoPilot backend.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <p className="eyebrow">AutoPilot</p>
      <h1>Invest without leaving Telegram.</h1>
      <p className="text">
        Fund your Telegram Wallet. Activate your Vault. Follow verified strategy managers.
      </p>
      <button onClick={handleBegin}>
        {loading ? "Setting up..." : "Begin"}
      </button>
    </Screen>
  );
}