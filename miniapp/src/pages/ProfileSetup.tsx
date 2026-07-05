import { useState } from "react";
import Screen from "../components/Screen";
import { updateInvestorProfile } from "../services/api";

export default function ProfileSetup({ next }: { next: () => void }) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const fields = [
    { key: "firstName", label: "Hi, what should we call you?", placeholder: "Your name" },
    { key: "phone", label: "What’s your phone number?", placeholder: "Phone number" },
    { key: "email", label: "What’s your email?", placeholder: "Email address" },
    { key: "city", label: "What city are you in?", placeholder: "Current city" },
    { key: "gender", label: "What’s your gender?", placeholder: "Gender" },
  ];

  const current = fields[step];

  async function handleNext() {
    if (!value.trim()) return;

    try {
      setSaving(true);
      await updateInvestorProfile({
        [current.key]: value.trim(),
      });

      setValue("");

      if (step < fields.length - 1) {
        setStep(step + 1);
      } else {
        next();
      }
    } catch (error) {
      alert("Could not save profile.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <p className="eyebrow">Investor Setup</p>

      <div className="setupBubble">
        <h1>{current.label}</h1>
        <p>
          {step === 0
            ? "We’ll walk you through your setup."
            : "Just a few details to complete your profile."}
        </p>
      </div>

      <input
        className="telegramInput"
        placeholder={current.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleNext}>
        {saving ? "Saving..." : step < fields.length - 1 ? "Continue" : "Finish setup"}
      </button>
    </Screen>
  );
}