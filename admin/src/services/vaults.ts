const API = import.meta.env.VITE_API_URL || "https://autopilotv3.onrender.com";

export async function getVaults() {
  const res = await fetch(`${API}/api/admin/vaults`);
  if (!res.ok) throw new Error("Failed to load vaults");
  return res.json();
}

export async function updateVault(id: number, data: any) {
  const res = await fetch(`${API}/api/admin/vaults/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update vault");
  return res.json();
}

export async function deleteVault(id: number) {
  const res = await fetch(`${API}/api/admin/vaults/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete vault");
}