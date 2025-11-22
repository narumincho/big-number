import { useState } from "react";

export function App() {
  const [star, setStar] = useState<number>(0);

  return (
    <html>
      <head>
        <title>巨大数ゲーム</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <style>{`
:root {
  color-scheme: dark;
};
`}</style>
      </head>
      <body style={{ display: "grid", gap: 8, margin: 0, padding: 16 }}>
        <h1>星を増やそうゲーム</h1>
        <div>目標: とにかく⭐️を増やそう</div>
        <StarBoxView star={star} />
        <button
          type="button"
          style={{ padding: 4 }}
          onClick={() => {
            setStar((prev) => prev + 1);
          }}
        >
          📦 ← 📦 + ⭐️
        </button>
      </body>
    </html>
  );
}

type ViewType = "addition" | "multiple";

function StarBoxView({ star }: { readonly star: number }) {
  const [viewType, setViewType] = useState<ViewType>("addition");

  return (
    <div>
      <div>表示形式</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div>📦:</div>
        <StarView star={star} viewType={viewType} />
      </div>
    </div>
  );
}

function StarView({
  star,
  viewType,
}: {
  readonly star: number;
  readonly viewType: ViewType;
}) {
  switch (viewType) {
    case "addition":
      return (
        <div style={{ wordBreak: "break-all" }}>
          {Array.from({ length: star })
            .map(() => "⭐️")
            .join("+")}
        </div>
      );
    case "multiple":
      return <div>⭐️×{star}</div>;
  }
}
