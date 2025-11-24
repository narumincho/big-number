import { calcAutoViewType, NumberView } from "./NumberView.tsx";

export function ItemList(
  { leaf, setLeaf, star }: {
    leaf: number;
    setLeaf: (fn: (prev: number) => number) => void;
    star: number;
  },
) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        alignContent: "start",
      }}
    >
      <Item
        icon="🌱"
        cost={0}
        count={leaf}
        operation="⭐️ + 1"
        onBuy={() => setLeaf((prev) => prev + 1)}
      />
      <Item
        icon="💧"
        cost={1000}
        count={0}
        operation="⭐️ x 1.01"
        onBuy={() => {}}
      />
    </div>
  );
}

function Item(
  {
    icon,
    cost,
    count,
    operation,
    onBuy,
  }: {
    readonly icon: string;
    readonly cost: number;
    readonly count: number;
    readonly onBuy: () => void;
    readonly operation: string;
  },
) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr",
        alignItems: "center",
        gap: 8,
      }}
    >
      <NumberView
        value={count}
        icon={icon}
        viewType={calcAutoViewType(count)}
      />
      <div style={{ display: "flex" }}>
        {operation}
      </div>
      <button
        type="button"
        style={{ flexGrow: 1, padding: 4 }}
        onClick={onBuy}
      >
        <div>
          {cost}⭐️
        </div>
      </button>
    </div>
  );
}
