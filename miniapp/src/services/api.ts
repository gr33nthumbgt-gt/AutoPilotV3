import type { StrategyManager } from "../types/manager";

const API_URL = "https://occupied-trans-hunting-everywhere.trycloudflare.com";
const TELEGRAM_ID = "demo_telegram_user";

export async function loginInvestor() {
  const response = await fetch(`${API_URL}/api/investor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      telegramId: TELEGRAM_ID,
      username: "demo",
      firstName: "Demo",
      lastName: "Investor",
    }),
  });

  if (!response.ok) throw new Error("Failed to login investor");
  return response.json();
}

export async function updateInvestorProfile(data: {
  firstName?: string;
  phone?: string;
  email?: string;
  city?: string;
  gender?: string;
}) {
  const response = await fetch(`${API_URL}/api/investor/${TELEGRAM_ID}/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}

export async function getWallet() {
  const response = await fetch(`${API_URL}/api/wallet/${TELEGRAM_ID}`);
  if (!response.ok) throw new Error("Failed to fetch wallet");
  return response.json();
}

export async function getManagers(): Promise<StrategyManager[]> {
  const response = await fetch(`${API_URL}/api/managers`);
  if (!response.ok) throw new Error("Failed to fetch managers");
  return response.json();
}

export async function copyStrategy(managerId: number, amount: number) {
  const response = await fetch(`${API_URL}/api/portfolio/${TELEGRAM_ID}/copy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ managerId, amount }),
  });

  if (!response.ok) throw new Error("Failed to copy strategy");
  return response.json();
}

export async function getPortfolio() {
  const response = await fetch(`${API_URL}/api/portfolio/${TELEGRAM_ID}`);
  if (!response.ok) throw new Error("Failed to fetch portfolio");
  return response.json();
}

export async function activateVault(amount: number) {
  const response = await fetch(`${API_URL}/api/vault/${TELEGRAM_ID}/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) throw new Error("Failed to activate vault");
  return response.json();
}