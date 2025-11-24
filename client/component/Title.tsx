import { GitHubIcon } from "./GitHubIcon.tsx";

export function Title() {
  return (
    <h1
      style={{
        margin: 0,
        padding: 8,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>⭐️を増やそうゲーム</div>
      <a href="https://github.com/narumincho/big-number">
        <GitHubIcon />
      </a>
    </h1>
  );
}
