export default function ManagerCard({
  name,
  detail,
  stat,
  onClick,
}: {
  name: string;
  detail: string;
  stat: string;
  onClick: () => void;
}) {
  return (
    <div className="manager" onClick={onClick}>
      <div>
        <strong>{name}</strong>
        <p>{detail}</p>
      </div>
      <b>{stat}</b>
    </div>
  );
}