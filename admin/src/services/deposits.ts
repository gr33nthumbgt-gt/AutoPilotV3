const API_URL = "https://autopilotv3.onrender.com";

export type DepositStatus = "PENDING" | "APPROVED" | "REJECTED";

export type DepositInvestor = {
  id: number;
  telegramId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export type DepositRecord = {
  id: number;
  reference: string;
  investorId: number;
  amount: number;
  currency: string;
  method: string;
  status: DepositStatus;
  externalRef: string | null;
  note: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  creditedAt: string | null;
  createdAt: string;
  updatedAt: string;
  investor: DepositInvestor;
};

async function readError(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return data.message;
    }
  } catch {
    // The server did not return JSON.
  }

  return `Request failed with status ${response.status}`;
}

export async function getDeposits(
  status?: DepositStatus
): Promise<DepositRecord[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";

  const response = await fetch(
    `${API_URL}/api/deposits/admin/all${query}`
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function approveDeposit(
  depositId: number,
  data: {
    reviewedBy?: string;
    note?: string;
  }
): Promise<{
  deposit: DepositRecord;
  wallet: {
    id: number;
    investorId: number;
    balance: number;
    currency: string;
  };
}> {
  const response = await fetch(
    `${API_URL}/api/deposits/admin/${depositId}/approve`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function rejectDeposit(
  depositId: number,
  data: {
    reviewedBy?: string;
    note?: string;
  }
): Promise<DepositRecord> {
  const response = await fetch(
    `${API_URL}/api/deposits/admin/${depositId}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}