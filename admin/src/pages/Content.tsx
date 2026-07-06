import { useEffect, useState } from "react";
import { getContent, saveContent } from "../services/content";

const defaultContent = {
  welcome_title: "Invest without leaving Telegram.",
  welcome_subtitle:
    "Fund your Telegram Wallet. Activate your Vault. Follow verified strategy managers.",
  welcome_button: "Begin",

  profile_intro_title: "Investor Setup",
  profile_intro_text: "We’ll walk you through your setup.",

  wallet_title: "Wallet found.",
  wallet_text:
    "Your funds stay in Telegram Wallet until you authorize a Vault allocation.",
  wallet_button: "Choose amount",

  vault_title: "Activate 1,000 USDT.",
  vault_button: "Authorize",

  discover_title: "Strategy Managers",
  portfolio_title: "Vault active.",
};

export default function Content() {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContent().then((items) => {
      const loaded = { ...defaultContent };

      items.forEach((item: any) => {
        loaded[item.key] = item.value;
      });

      setContent(loaded);
    });
  }, []);

  async function save() {
    setSaving(true);
    await saveContent(content);
    setSaving(false);
    alert("Content saved.");
  }

  return (
    <div>
      <h1>Content</h1>

      <section className="panel">
        <h2>Mini App Wording</h2>

        <div className="formGrid">
          {Object.entries(content).map(([key, value]) => (
            <label key={key}>
              <small>{key}</small>
              <input
                value={value}
                onChange={(e) =>
                  setContent({
                    ...content,
                    [key]: e.target.value,
                  })
                }
              />
            </label>
          ))}
        </div>

        <button onClick={save}>{saving ? "Saving..." : "Save Content"}</button>
      </section>
    </div>
  );
}