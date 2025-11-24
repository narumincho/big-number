import { GitHubIcon } from "./GitHubIcon.tsx";

export function Title() {
  return (
    <h1 style={{ margin: 0, padding: 8 }}>
      ⭐️を増やそうゲーム
      <a href="https://github.com/narumincho/big-number">
        <GitHubIcon />
      </a>
    </h1>
  );
}
