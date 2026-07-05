export default function BalanceCard({
  label,
  value,
  inactive,
}: {
  label: string;
  value: string;
  inactive?: boolean;
}) {
  return (
    <div className={inactive ? "balanceCard inactive" : "balanceCard"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}