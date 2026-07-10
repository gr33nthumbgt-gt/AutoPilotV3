import { useState } from "react";
import Screen from "../components/Screen";
import { getTelegramUser, updateInvestorProfile } from "../services/api";

const countries = [
  { name: "Nigeria", code: "+234" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "Ghana", code: "+233" },
  { name: "South Africa", code: "+27" },
  { name: "Kenya", code: "+254" },
  { name: "Uganda", code: "+256" },
  { name: "India", code: "+91" },
  { name: "China", code: "+86" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Spain", code: "+34" },
  { name: "Italy", code: "+39" },
  { name: "Australia", code: "+61" },
  { name: "Brazil", code: "+55" },
  { name: "Mexico", code: "+52" },
];

export default function ProfileSetup({ next }: { next: () => void }) {
  const tgUser = getTelegramUser();

  const [email, setEmail] = useState("");
  const [countryName, setCountryName] = useState("Nigeria");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const country = countries.find((item) => item.name === countryName) || countries[0];
  const cleanPhone = phone.replace(/\D/g, "");
  const fullPhone = `${country.code}${cleanPhone}`;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validPhone = cleanPhone.length >= 7;
  const canContinue = validEmail && validPhone;

  async function handleContinue() {
    if (!canContinue) return;

    try {
      setSaving(true);
      await updateInvestorProfile({
        email: email.trim(),
        phone: fullPhone,
        country: country.name,
      });
      next();
    } catch (error) {
      alert("Could not save contact details.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <p className="eyebrow">Investor Setup</p>
      <h1>Confirm contact details.</h1>

      <div className="card">
        <p className="muted">Telegram Profile</p>
        <h2>{tgUser.firstName} {tgUser.lastName}</h2>
        <p className="text">@{tgUser.username}</p>
      </div>

      <input
        className="telegramInput"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="countrySelectWrap">
        <label>Country</label>
        <select
          className="countrySelect"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        >
          {countries.map((item) => (
            <option key={`${item.name}-${item.code}`} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="phoneRow">
        <div className="countryCode">{country.code}</div>

        <input
          className="telegramInput"
          placeholder="Phone number"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <p className="text">
        We use this for funding confirmations, withdrawal support, and account updates.
      </p>

      <button onClick={handleContinue} disabled={!canContinue || saving}>
        {saving ? "Saving..." : "Continue"}
      </button>
    </Screen>
  );
}