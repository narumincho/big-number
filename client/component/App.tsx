import { PropsWithChildren, useEffect, useState } from "hono/jsx";
import { ItemList, items } from "./ItemList.tsx";
import { StarView } from "./StarView.tsx";
import { Title } from "./Title.tsx";

export function App() {
  const [star, setStar] = useState<number>(0);
  const [itemCounts, setItemCounts] = useState<ReadonlyArray<number>>([]);
  const [initialized, setInitialized] = useState(false);
  const [tab, setTab] = useState<"items" | "achievements">("items");
  const STORAGE_KEY = "big-number:state";

  useEffect(() => {
    // Load saved state from localStorage (if available), then mark initialized.
    if (typeof window === "undefined") {
      setInitialized(true);
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.itemCounts)) {
          setItemCounts(parsed.itemCounts.map((v: unknown) => Number(v)));
        }
        if (parsed && typeof parsed.star === "number") {
          setStar(parsed.star);
        }
      }
    } catch (_e) {
      // ignore parse errors
    }

    setInitialized(true);
  }, []);

  // Persist state when itemCounts or star change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = { itemCounts: Array.from(itemCounts), star };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_e) {
      // ignore storage errors (e.g., quota)
    }
  }, [itemCounts, star]);

  useEffect(() => {
    const recalc = () => {
      setStar((prev) => {
        let s = prev;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item) continue;
          s = item.operation(s, itemCounts[i] ?? 0);
        }
        return Math.floor(s);
      });
    };

    // Run immediately, then every 1 second.
    recalc();
    const id = setInterval(recalc, 1000);
    return () => {
      clearInterval(id);
    };
  }, [itemCounts]);

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gap: 8,
        margin: 0,
        gridTemplateRows: "auto  1fr auto 1fr",
      }}
    >
      <Title />
      <StarView star={star} />
      <div role="tablist" style={{ display: "grid", gridAutoFlow: "column" }}>
        <Tab
          selected={tab === "items"}
          onSelect={() => {
            setTab("items");
          }}
        >
          アイテム
        </Tab>
        <Tab
          selected={tab === "achievements"}
          onSelect={() => {
            setTab("achievements");
          }}
        >
          実績
        </Tab>
      </div>
      {initialized && tab === "items" && (
        <ItemList
          itemCounts={itemCounts}
          setItemCounts={setItemCounts}
          star={star}
          setStar={setStar}
        />
      )}
      {initialized && tab === "achievements" && (
        <div style={{ display: "flex" }}>
          <div
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: 8 }}
          >
            <div style={{ fontSize: "24px" }}>不可説</div>
            <a
              style={{ fontSize: "16px", color: "#d2d2d2ff" }}
              href="https://www.youtube.com/watch?v=ipXJ1zhSubo"
            >
              不可欠?
            </a>
          </div>
        </div>
      )}
    </div>
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
        borderColor: selected ? "skyblue" : "gray",
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
