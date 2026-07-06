import { useState } from "react";
import Screen from "../components/Screen";
import { updateInvestorProfile } from "../services/api";

export default function ProfileSetup({ next }: { next: () => void }) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const fields = [
    { key: "firstName", label: "Hi, what should we call you?", placeholder: "Your name", type: "text" },
    { key: "phone", label: "What’s your phone number?", placeholder: "Phone number", type: "tel" },
    { key: "email", label: "What’s your email?", placeholder: "Email address", type: "email" },
    { key: "city", label: "What city are you in?", placeholder: "Current city", type: "text" },
    { key: "gender", label: "What’s your gender?", placeholder: "Gender", type: "text" },
  ];

  const current = fields[step];

  function validate(key: string, input: string) {
    const v = input.trim();

    if (!v) return "This field is required.";

    if (key === "firstName" && !/^[A-Za-z\s'-]{2,40}$/.test(v)) {
      return "Enter a valid name.";
    }

    if (key === "phone" && !/^\+?[0-9\s-]{7,20}$/.test(v)) {
      return "Enter a valid phone number.";
    }

    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return "Enter a valid email address.";
    }

    if (key === "city" && !/^[A-Za-z\s'-]{2,60}$/.test(v)) {
      return "Enter a valid city.";
    }

    if (key === "gender" && !/^[A-Za-z\s'-]{2,30}$/.test(v)) {
      return "Enter a valid gender.";
    }

    return "";
  }

  async function handleNext() {
    const error = validate(current.key, value);
    if (error) {
      alert(error);
      return;
    }

    try {
      setSaving(true);
      await updateInvestorProfile({
        [current.key]: value.trim(),
      });

      setValue("");

      if (step < fields.length - 1) setStep(step + 1);
      else next();
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
        type={current.type}
        placeholder={current.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleNext} disabled={saving}>
        {saving ? "Saving..." : step < fields.length - 1 ? "Continue" : "Finish setup"}
      </button>
    </Screen>
  );
}