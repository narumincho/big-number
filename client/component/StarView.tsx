import { PropsWithChildren, useState } from "hono/jsx";
import { NumberView, ViewType } from "./NumberView.tsx";

export function StarView(
  { star }: { readonly star: number },
) {
  const [viewTypeState, setViewType] = useState<ViewType>("addition");

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: 8,
      }}
    >
      <div style={{ minHeight: 34 }}>
        {star > 2 && (
          <ViewTypeSelector
            value={viewTypeState}
            onChange={(vt) => {
              setViewType(vt);
            }}
          />
        )}
      </div>
      <NumberView value={star} icon="⭐" viewType={viewTypeState} />
    </div>
  );
}

function ViewTypeSelector(
  {
    value,
    onChange,
  }: { value: ViewType; onChange: (viewType: ViewType) => void },
) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Chip
        active={value === "addition"}
        onClick={() => {
          onChange("addition");
        }}
      >
        🔲🔲🔲
      </Chip>
      <Chip
        active={value === "multiple"}
        onClick={() => {
          onChange("multiple");
        }}
      >
        123
      </Chip>
    </div>
  );
}

function Chip(
  { active, onClick, children }: PropsWithChildren<
    { active: boolean; onClick: () => void }
  >,
) {
  return (
    <div
      style={{
        padding: "4px 8px",
        borderRadius: "16px",
        backgroundColor: active
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 255, 255, 0.1)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
