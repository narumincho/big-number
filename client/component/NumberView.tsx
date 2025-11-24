export type ViewType = "addition" | "multiple";

export function NumberView({
  value,
  icon,
  viewType,
}: {
  readonly value: number;
  readonly icon: string;
  readonly viewType: ViewType;
}) {
  switch (viewType) {
    case "addition":
      return (
        <div style={{ wordBreak: "break-all", minHeight: 32 }}>
          {icon.repeat(value)}
        </div>
      );
    case "multiple":
      return <div style={{ textAlign: "right" }}>{value}{icon}</div>;
  }
}
