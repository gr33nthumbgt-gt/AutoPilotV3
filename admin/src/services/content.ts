const API = import.meta.env.VITE_API_URL || "https://autopilotv3.onrender.com";

export async function getContent() {
  const res = await fetch(`${API}/api/content`);
  if (!res.ok) throw new Error("Failed to load content");
  return res.json();
}

export async function saveContent(settings: Record<string, string>) {
  const res = await fetch(`${API}/api/content/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });

  if (!res.ok) throw new Error("Failed to save content");
  return res.json();
}