import Screen from "../components/Screen";

export default function Deposit({ back }: { back: () => void }) {
  function openTelegramWallet() {
    const tg = (window as any).Telegram?.WebApp;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink("https://t.me/wallet");
    } else {
      window.open("https://t.me/wallet", "_blank");
    }
  }

  return (
    <Screen>
      <p className="eyebrow">Deposit</p>
      <h1>Add Funds</h1>

      <div className="card">
        <p className="muted">Investment Wallet</p>
        <h2>Fund your account</h2>
        <p className="text">
          Open Telegram Wallet, buy or receive USDT, then return to AutoPilot.
        </p>
      </div>

      <button onClick={openTelegramWallet}>Open Telegram Wallet</button>

      <button className="secondary" onClick={back}>
        Back
      </button>
    </Screen>
  );
}