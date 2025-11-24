import { PropsWithChildren, useEffect, useState } from "hono/jsx";
import { text } from "node:stream/consumers";

export function App() {
  const [star, setStar] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);
  const [tab, setTab] = useState<"main" | "achievements">("achievements");

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
      <div role="tablist" style={{ display: "grid", gridAutoFlow: "column" }}>
        <Tab
          selected={tab === "main"}
          onSelect={() => setTab("main")}
        >
          アイテム
        </Tab>
        <Tab
          selected={tab === "achievements"}
          onSelect={() => setTab("achievements")}
        >
          実績
        </Tab>
      </div>
      {tab === "main" && (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
          <div>🤖</div>
          <button
            type="button"
            style={{ flexGrow: 1, padding: 4 }}
            disabled={!initialized}
            onClick={() => {
              setStar((prev) =>
                prev + 1
              );
            }}
          >
            ⭐️ ← ⭐️ + 1
          </button>
        </div>
      )}
      {tab === "achievements" && (
        <div style={{}}>
          <div>実績</div>
          <div style={{}}>
            <div style={{}}>不可説</div>
            <div style={{}}>不可欠?</div>
          </div>
        </div>
      )}
    </body>
  );
}

function Tab({
  selected,
  onSelect,
  children,
}: PropsWithChildren<{
  readonly selected: boolean;
  readonly onSelect: () => void;
}>) {
  return (
    <div
      role="tab"
      style={{
        borderBottom: "solid",
        borderColor: selected ? "red" : "gray",
        borderWidth: selected ? 2 : 1,
        textAlign: "center",
        padding: 4,
        paddingBottom: selected ? 2 : 4,
        cursor: "pointer",
      }}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      onClick={onSelect}
    >
      {children}
    </div>
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
