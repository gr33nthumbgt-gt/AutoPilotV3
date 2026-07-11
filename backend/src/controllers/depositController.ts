import { Request, Response } from "express";
import {
  approveDeposit,
  createDepositRequest,
  getAllDeposits,
  getInvestorDeposits,
  rejectDeposit,
} from "../services/depositService";

function statusForError(message: string) {
  if (
    message === "Invalid deposit amount" ||
    message.includes("already") ||
    message === "Deposit has already been processed"
  ) {
    return 400;
  }

  if (
    message === "Investor not found" ||
    message === "Deposit not found"
  ) {
    return 404;
  }

  return 500;
}

export async function create(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);

    const deposit = await createDepositRequest(telegramId, {
      amount: Number(req.body.amount),
      currency: req.body.currency,
      method: req.body.method,
      externalRef: req.body.externalRef,
      note: req.body.note,
    });

    res.status(201).json(deposit);
  } catch (error: any) {
    const message = error.message || "Failed to create deposit request";

    res.status(statusForError(message)).json({
      message,
    });
  }
}

export async function listForInvestor(req: Request, res: Response) {
  try {
    const telegramId = String(req.params.telegramId);
    const deposits = await getInvestorDeposits(telegramId);

    res.json(deposits);
  } catch (error: any) {
    const message = error.message || "Failed to load deposits";

    res.status(statusForError(message)).json({
      message,
    });
  }
}

export async function listAll(req: Request, res: Response) {
  try {
    const status =
      typeof req.query.status === "string"
        ? req.query.status
        : undefined;

    const deposits = await getAllDeposits(status);
    res.json(deposits);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to load deposits",
    });
  }
}

export async function approve(req: Request, res: Response) {
  try {
    const depositId = Number(req.params.id);

    if (!Number.isInteger(depositId) || depositId <= 0) {
      return res.status(400).json({
        message: "Invalid deposit ID",
      });
    }

    const result = await approveDeposit(
      depositId,
      req.body.reviewedBy,
      req.body.note
    );

    res.json(result);
  } catch (error: any) {
    const message = error.message || "Failed to approve deposit";

    res.status(statusForError(message)).json({
      message,
    });
  }
}

export async function reject(req: Request, res: Response) {
  try {
    const depositId = Number(req.params.id);

    if (!Number.isInteger(depositId) || depositId <= 0) {
      return res.status(400).json({
        message: "Invalid deposit ID",
      });
    }

    const deposit = await rejectDeposit(
      depositId,
      req.body.reviewedBy,
      req.body.note
    );

    res.json(deposit);
  } catch (error: any) {
    const message = error.message || "Failed to reject deposit";

    res.status(statusForError(message)).json({
      message,
    });
  }
}