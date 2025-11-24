import { useCallback, useRef, useSyncExternalStore } from "hono/jsx";

export type ViewType = "addition" | "multiple";

export function calcAutoViewType(value: number): ViewType {
  if (value <= 3) {
    return "addition";
  }
  return "multiple";
}

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
        <div
          style={{ height: "100%", overflow: "hidden", position: "relative" }}
        >
          <div
            style={{
              wordBreak: "break-all",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {icon.repeat(value)}
          </div>
        </div>
      );
    case "multiple":
      return (
        <div style={{ textAlign: "right", height: "100%", overflowY: "auto" }}>
          {value}
          {icon}
        </div>
      );
  }
}

export function NumberViewSvg({
  value,
  icon,
  viewType,
}: {
  readonly value: number;
  readonly icon: string;
  readonly viewType: ViewType;
}) {
  const ref = useRef<SVGSVGElement>(null);
  // const [prevViewType, setPrevViewType] = useRef<ViewType | null>(null);

  const subscribe = useCallback((onStoreChange: () => void) => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(() => {
        onStoreChange();
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const width = useSyncExternalStore(subscribe, () => {
    return ref.current?.clientWidth;
  });

  const height = useSyncExternalStore(subscribe, () => {
    return ref.current?.clientHeight;
  });

  return (
    <div
      ref={ref}
      style={{ overflow: "hidden" }}
    >
      {width && height && (
        <svg
          style={{ display: "block" }}
          viewBox={`0 0 ${width} ${height}`}
        >
          {viewType === "addition" && (
            <Addition icon={icon} value={value} width={width} height={height} />
          )}
          {viewType === "multiple" && <Multiple icon={icon} value={value} />}
        </svg>
      )}
    </div>
  );
}

const iconSize = 22;

function Addition(
  { icon, value, width, height }: {
    readonly icon: string;
    readonly value: number;
    readonly width: number;
    readonly height: number;
  },
) {
  if (1000 < value) {
    return <g></g>;
  }
  if (value * iconSize < width) {
    return (
      <g>
        {Array.from({ length: value }).map((_, i) => (
          <text
            key={i}
            x={width / 2 + (i - (value - 1) / 2) * iconSize}
            y={height / 2}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {icon}
          </text>
        ))}
      </g>
    );
  }
  return (
    <text>
      {icon.repeat(value)}
    </text>
  );
}

function Multiple(
  { icon, value }: { readonly icon: string; readonly value: number },
) {
  return <text>{value}{icon}</text>;
}
