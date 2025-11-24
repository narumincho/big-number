import { calcAutoViewType, NumberView } from "./NumberView.tsx";

export type Item = {
  readonly icon: string;
  readonly cost: (count: number) => number;
  readonly operationLabel: string;
  readonly operation: (star: number, count: number) => number;
};

export const items: ReadonlyArray<Item> = [
  {
    icon: "🌱",
    cost: (count) => count * 10,
    operationLabel: "⭐️ + 🌱",
    operation: (star, count) => star + count,
  },
  {
    icon: "💧",
    cost: (count) => 300 + count * 300,
    operationLabel: "⭐️ x (1 + (0.01 x 💧))",
    operation: (star, count) => star * (1 + (0.01 * count)),
  },
];

export function ItemList(
  { itemCounts, setItemCounts, star, setStar }: {
    itemCounts: ReadonlyArray<number>;
    setItemCounts: (
      fn: (prev: ReadonlyArray<number>) => ReadonlyArray<number>,
    ) => void;
    star: number;
    setStar: (fn: (prev: number) => number) => void;
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
      {items.map((item, index) => (
        <Item
          key={item.icon}
          icon={item.icon}
          cost={item.cost(itemCounts[index] ?? 0)}
          count={itemCounts[index] ?? 0}
          operation={item.operationLabel}
          star={star}
          onBuy={() => {
            setItemCounts((prev) => {
              const newCounts = [...prev];
              newCounts[index] = (newCounts[index] ?? 0) + 1;
              return newCounts;
            });
            setStar((prev) => prev - item.cost(itemCounts[index] ?? 0));
          }}
        />
      ))}
    </div>
  );
}

function Item(
  {
    icon,
    cost,
    count,
    operation,
    star,
    onBuy,
  }: {
    readonly icon: string;
    readonly cost: number;
    readonly count: number;
    readonly star: number;
    readonly operation: string;
    readonly onBuy: () => void;
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
        disabled={cost > star}
        onClick={onBuy}
      >
        <div>
          {cost}⭐️
        </div>
      </button>
    </div>
  );
}
