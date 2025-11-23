import { useState } from "react";

export function App() {
  const [star, setStar] = useState<number>(0);

  return (
    <html>
      <head>
        <title>星を増やそうゲーム</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <style>
          {`
:root {
  color-scheme: dark;
};
`}
        </style>
      </head>
      <body style={{ display: "grid", gap: 8, margin: 0, padding: 16 }}>
        <h1 style={{ margin: 0, padding: 8 }}>星を増やそうゲーム</h1>
        <div>とにかく⭐️を増やそう</div>
        <StarBoxView star={star} />
        <button
          type="button"
          style={{ padding: 4 }}
          onClick={() => {
            setStar((prev) => prev + 1);
          }}
        >
          ⭐️ ← ⭐️ + 1
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
      {star > 2 && (
        <div style={{ display: "flex", gap: "8px" }}>
          <Chip>🔲🔲🔲</Chip>
          <Chip>🔲: 123</Chip>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <StarView star={star} viewType={viewType} />
      </div>
    </div>
  );
}

function Chip({ children }: { readonly children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "4px 8px",
        borderRadius: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {children}
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
          {"⭐️".repeat(star)}
        </div>
      );
    case "multiple":
      return (
        <div>
          <div>⭐️: {star}</div>
        </div>
      );
  }
}
