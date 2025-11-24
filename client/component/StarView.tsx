import { PropsWithChildren, useState } from "hono/jsx";
import { NumberView, ViewType } from "./NumberView.tsx";

export function StarView(
  { star }: { readonly star: number },
) {
  const [viewTypeState, setViewType] = useState<ViewType>("addition");

  return (
    <div>
      <div style={{ minHeight: 34 }}>
        {star > 2 && (
          <div style={{ display: "flex", gap: "8px" }}>
            <Chip>🔲🔲🔲</Chip>
            <Chip>123</Chip>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <NumberView value={star} icon="⭐" viewType={viewTypeState} />
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
