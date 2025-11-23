import { PropsWithChildren, useEffect, useState } from "hono/jsx";

export function App() {
  const [star, setStar] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <body
      style={{
        display: "grid",
        gap: 8,
        margin: 0,
        padding: 16,
        gridTemplateRows: "auto auto auto 1fr",
      }}
    >
      <h1 style={{ margin: 0, padding: 8 }}>星を増やそうゲーム</h1>
      <div>とにかく⭐️を増やそう</div>
      <StarBoxView star={star} />
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <div>🤖</div>
        <button
          type="button"
          style={{ flexGrow: 1, padding: 4 }}
          disabled={!initialized}
          onClick={() => {
            setStar((prev) => prev + 1);
          }}
        >
          ⭐️ ← ⭐️ + 1
        </button>
      </div>
      <div style={{}}></div>
    </body>
  );
}

type ViewType = "addition" | "multiple";

function StarBoxView({ star }: { readonly star: number }) {
  const [viewType, setViewType] = useState<ViewType>("addition");

  return (
    <div>
      <div style={{ minHeight: 34 }}>
        {star > 2 && (
          <div style={{ display: "flex", gap: "8px" }}>
            <Chip>🔲🔲🔲</Chip>
            <Chip>🔲: 123</Chip>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <StarView star={star} viewType={viewType} />
      </div>
    </div>
  );
}

function Chip({ children }: PropsWithChildren<Record<never, never>>) {
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
        <div style={{ wordBreak: "break-all", minHeight: 32 }}>
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
