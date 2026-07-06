const API_URL = import.meta.env.VITE_API_URL || "https://autopilotv3.onrender.com";

export async function getAdminOverview() {
  const response = await fetch(`${API_URL}/api/admin/overview`);
  if (!response.ok) throw new Error("Failed to load overview");
  return response.json();
}

export async function getAdminInvestors() {
  const response = await fetch(`${API_URL}/api/admin/investors`);
  if (!response.ok) throw new Error("Failed to load investors");
  return response.json();
}

export async function updateInvestor(id: number, data: any) {
  const response = await fetch(`${API_URL}/api/admin/investors/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update investor");
  return response.json();
}

export async function updateInvestorWallet(id: number, balance: number) {
  const response = await fetch(`${API_URL}/api/admin/investors/${id}/wallet`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ balance }),
  });

  if (!response.ok) throw new Error("Failed to update wallet");
  return response.json();
}

export async function updateInvestorVault(id: number, data: any) {
  const response = await fetch(`${API_URL}/api/admin/investors/${id}/vault`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update vault");
  return response.json();
}

export async function getManagers() {
  const response = await fetch(`${API_URL}/api/managers`);
  if (!response.ok) throw new Error("Failed to load managers");
  return response.json();
}