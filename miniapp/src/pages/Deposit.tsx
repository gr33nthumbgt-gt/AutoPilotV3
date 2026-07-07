import Screen from "../components/Screen";

export default function Deposit({ back }: { back: () => void }) {
  return (
    <Screen>
      <p className="eyebrow">Deposit</p>
      <h1>Add Funds</h1>

      <div className="card">
        <p className="muted">Investment Wallet</p>
        <h2>Fund your account</h2>
        <p className="text">
          This will later connect to Telegram Wallet funding.
        </p>
      </div>

      <button>Connect Telegram Wallet</button>
      <button className="secondary" onClick={back}>
        Back
      </button>
    </Screen>
  );
}