import Screen from "../components/Screen";

export default function Withdraw({ back }: { back: () => void }) {
  return (
    <Screen>
      <p className="eyebrow">Withdraw</p>
      <h1>Withdraw Funds</h1>

      <div className="card">
        <p className="muted">Available Balance</p>
        <h2>Withdraw to wallet</h2>
        <p className="text">
          This will later connect to Telegram Wallet withdrawal processing.
        </p>
      </div>

      <button>Request Withdrawal</button>
      <button className="secondary" onClick={back}>
        Back
      </button>
    </Screen>
  );
}
