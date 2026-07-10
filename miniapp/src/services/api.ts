import type { StrategyManager } from "../types/manager";

const API_URL = "https://autopilotv3.onrender.com";

export function getTelegramUser() {
  const tg = (window as any).Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  return {
    telegramId: user?.id ? String(user.id) : "demo_telegram_user",
    username: user?.username ?? "demo",
    firstName: user?.first_name ?? "Demo",
    lastName: user?.last_name ?? "Investor",
  };
}

export function getTelegramId() {
  return getTelegramUser().telegramId;
}

export async function loginInvestor() {
  const response = await fetch(`${API_URL}/api/investor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getTelegramUser()),
  });

  if (!response.ok) throw new Error("Failed to login investor");
  return response.json();
}

export async function updateInvestorProfile(data: {
  phone?: string;
  email?: string;
  country?: string;
}) {
  const response = await fetch(`${API_URL}/api/investor/${getTelegramId()}/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}

export async function getWallet() {
  const response = await fetch(`${API_URL}/api/wallet/${getTelegramId()}`);
  if (!response.ok) throw new Error("Failed to fetch wallet");
  return response.json();
}

export async function getManagers(): Promise<StrategyManager[]> {
  const response = await fetch(`${API_URL}/api/managers`);
  if (!response.ok) throw new Error("Failed to fetch managers");
  return response.json();
}

export async function getPortfolio() {
  const response = await fetch(`${API_URL}/api/portfolio/${getTelegramId()}`);
  if (!response.ok) throw new Error("Failed to fetch portfolio");
  return response.json();
}

export async function activateVault(amount: number) {
  const response = await fetch(`${API_URL}/api/vault/${getTelegramId()}/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) throw new Error("Failed to activate vault");
  return response.json();
}

export async function copyStrategy(managerId: number, amount: number) {
  const response = await fetch(`${API_URL}/api/portfolio/${getTelegramId()}/copy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ managerId, amount }),
  });

  if (!response.ok) throw new Error("Failed to copy strategy");
  return response.json();
}