import Screen from "../components/Screen";
import Row from "../components/Row";

export default function ProfilePage() {
  return (
    <Screen>
      <p className="eyebrow">Profile</p>
      <h1>Investor</h1>

      <div className="card">
        <Row label="Status" value="Active" />
        <Row label="Wallet" value="Connected" />
        <Row label="Vault" value="Active" />
      </div>
    </Screen>
  );
}