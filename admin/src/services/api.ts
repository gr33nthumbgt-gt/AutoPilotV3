const API_URL = "http://localhost:3000";

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

export async function getManagers() {
  const response = await fetch(`${API_URL}/api/managers`);
  if (!response.ok) throw new Error("Failed to load managers");
  return response.json();
}