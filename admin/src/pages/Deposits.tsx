import { useEffect, useMemo, useState } from "react";
import {
  approveDeposit,
  getDeposits,
  rejectDeposit,
  type DepositRecord,
  type DepositStatus,
} from "../services/deposits";

type FilterStatus = "ALL" | DepositStatus;

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

function investorName(deposit: DepositRecord) {
  const fullName = [
    deposit.investor.firstName,
    deposit.investor.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    fullName ||
    deposit.investor.username ||
    deposit.investor.telegramId
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}

function formatAmount(amount: number, currency: string) {
  return `${amount.toLocaleString()} ${currency}`;
}

export default function Deposits() {
  const [deposits, setDeposits] = useState<DepositRecord[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("PENDING");
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<DepositRecord | null>(null);
  const [note, setNote] = useState("");
  const [reviewer, setReviewer] = useState("AutoPilot Admin");
  const [error, setError] = useState("");

  async function loadDeposits() {
    try {
      setLoading(true);
      setError("");

      const data = await getDeposits(
        filter === "ALL" ? undefined : filter
      );

      setDeposits(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load deposits."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeposits();
  }, [filter]);

  const totals = useMemo(() => {
    return deposits.reduce(
      (summary, deposit) => {
        summary.count += 1;
        summary.amount += deposit.amount;
        return summary;
      },
      {
        count: 0,
        amount: 0,
      }
    );
  }, [deposits]);

  function openReview(deposit: DepositRecord) {
    setSelected(deposit);
    setNote(deposit.note ?? "");
  }

  function closeReview() {
    if (actingId !== null) return;

    setSelected(null);
    setNote("");
  }

  async function handleApprove() {
    if (!selected) return;

    const confirmed = window.confirm(
      `Approve ${formatAmount(
        selected.amount,
        selected.currency
      )} for ${investorName(selected)}?`
    );

    if (!confirmed) return;

    try {
      setActingId(selected.id);
      setError("");

      await approveDeposit(selected.id, {
        reviewedBy: reviewer.trim() || "AutoPilot Admin",
        note: note.trim() || undefined,
      });

      closeReview();
      await loadDeposits();
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Could not approve deposit."
      );
    } finally {
      setActingId(null);
      setSelected(null);
      setNote("");
    }
  }

  async function handleReject() {
    if (!selected) return;

    if (!note.trim()) {
      setError("Enter a reason before rejecting the deposit.");
      return;
    }

    const confirmed = window.confirm(
      `Reject deposit ${selected.reference}?`
    );

    if (!confirmed) return;

    try {
      setActingId(selected.id);
      setError("");

      await rejectDeposit(selected.id, {
        reviewedBy: reviewer.trim() || "AutoPilot Admin",
        note: note.trim(),
      });

      closeReview();
      await loadDeposits();
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Could not reject deposit."
      );
    } finally {
      setActingId(null);
      setSelected(null);
      setNote("");
    }
  }

  return (
    <div className="adminPage">
      <div className="pageHeader">
        <div>
          <p className="adminEyebrow">Funding Ledger</p>
          <h1>Deposits</h1>
          <p className="pageDescription">
            Review deposit requests and credit investor wallets through
            the funding ledger.
          </p>
        </div>

        <button
          className="adminSecondaryButton"
          onClick={loadDeposits}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <section className="depositSummaryGrid">
        <div className="adminCard">
          <p>Displayed Deposits</p>
          <strong>{totals.count}</strong>
        </div>

        <div className="adminCard">
          <p>Displayed Value</p>
          <strong>{totals.amount.toLocaleString()} USDT</strong>
        </div>
      </section>

      <section className="adminPanel">
        <div className="depositToolbar">
          <div className="depositFilters">
            {filters.map((item) => (
              <button
                key={item.value}
                className={
                  filter === item.value
                    ? "filterButton active"
                    : "filterButton"
                }
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="reviewerField">
            Reviewer
            <input
              value={reviewer}
              onChange={(event) => setReviewer(event.target.value)}
              placeholder="Admin name"
            />
          </label>
        </div>

        {error && <div className="adminError">{error}</div>}

        {loading ? (
          <div className="adminEmptyState">Loading deposits...</div>
        ) : deposits.length === 0 ? (
          <div className="adminEmptyState">
            No {filter === "ALL" ? "" : filter.toLowerCase()} deposits
            found.
          </div>
        ) : (
          <div className="depositTableWrap">
            <table className="depositTable">
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {deposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>
                      <strong>{investorName(deposit)}</strong>
                      <small>
                        {deposit.investor.email ||
                          deposit.investor.phone ||
                          deposit.investor.telegramId}
                      </small>
                    </td>

                    <td>
                      <code>{deposit.reference}</code>
                    </td>

                    <td>
                      <strong>
                        {formatAmount(
                          deposit.amount,
                          deposit.currency
                        )}
                      </strong>
                    </td>

                    <td>{deposit.method}</td>

                    <td>
                      <span
                        className={`statusBadge ${deposit.status.toLowerCase()}`}
                      >
                        {deposit.status}
                      </span>
                    </td>

                    <td>{formatDate(deposit.createdAt)}</td>

                    <td>
                      <button
                        className="tableActionButton"
                        onClick={() => openReview(deposit)}
                      >
                        {deposit.status === "PENDING"
                          ? "Review"
                          : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && (
        <div className="adminModalBackdrop" onClick={closeReview}>
          <section
            className="adminModal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modalHeader">
              <div>
                <p className="adminEyebrow">Deposit Review</p>
                <h2>{selected.reference}</h2>
              </div>

              <button
                className="modalCloseButton"
                onClick={closeReview}
                disabled={actingId !== null}
              >
                ×
              </button>
            </div>

            <div className="depositDetails">
              <div>
                <span>Investor</span>
                <strong>{investorName(selected)}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>
                  {formatAmount(
                    selected.amount,
                    selected.currency
                  )}
                </strong>
              </div>

              <div>
                <span>Method</span>
                <strong>{selected.method}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selected.status}</strong>
              </div>

              <div>
                <span>Created</span>
                <strong>{formatDate(selected.createdAt)}</strong>
              </div>

              <div>
                <span>Reviewed</span>
                <strong>{formatDate(selected.reviewedAt)}</strong>
              </div>
            </div>

            <label className="depositNoteField">
              Review note
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add verification notes or a rejection reason"
                disabled={
                  selected.status !== "PENDING" || actingId !== null
                }
              />
            </label>

            {selected.status === "PENDING" ? (
              <div className="depositReviewActions">
                <button
                  className="adminDangerButton"
                  onClick={handleReject}
                  disabled={actingId !== null}
                >
                  {actingId === selected.id
                    ? "Processing..."
                    : "Reject"}
                </button>

                <button
                  className="adminPrimaryButton"
                  onClick={handleApprove}
                  disabled={actingId !== null}
                >
                  {actingId === selected.id
                    ? "Processing..."
                    : "Approve and Credit"}
                </button>
              </div>
            ) : (
              <button
                className="adminSecondaryButton fullWidth"
                onClick={closeReview}
              >
                Close
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}