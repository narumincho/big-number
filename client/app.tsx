import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <html>
      <head>
        <title>巨大数ゲーム</title>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div>
          <h1>巨大数ゲーム</h1>
          <p>カウント: {count}</p>
          <button
            type="button"
            onClick={() => {
              return setCount(count + 1);
            }}
          >
            カウントアップ
          </button>
        </div>
      </body>
    </html>
  );
}
