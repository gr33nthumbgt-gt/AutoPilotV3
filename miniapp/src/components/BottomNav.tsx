export type Page =
  | "home"
  | "discover"
  | "activity"
  | "portfolio"
  | "profilePage";

export default function BottomNav({
  setPage,
}: {
  setPage: (page: Page) => void;
}) {
  return (
    <nav>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("discover")}>Discover</button>
      <button onClick={() => setPage("activity")}>Activity</button>
      <button onClick={() => setPage("portfolio")}>Portfolio</button>
      <button onClick={() => setPage("profilePage")}>Profile</button>
    </nav>
  );
}