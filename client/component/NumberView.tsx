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
          {viewType === "multiple" && (
            <Multiple icon={icon} value={value} width={width} height={height} />
          )}
        </svg>
      )}
    </div>
  );
}

const iconSize = 22;

const sampleCount = 3;

function Addition(
  { icon, value, width, height }: {
    readonly icon: string;
    readonly value: number;
    readonly width: number;
    readonly height: number;
  },
) {
  const rowSize = Math.floor(width / iconSize);
  const fullRowCount = Math.floor(value / rowSize);
  const maxRowCount = Math.floor(height / iconSize);
  const mod = value % rowSize;
  const rowCount = fullRowCount + (mod === 0 ? 0 : 1);
  const over = maxRowCount < rowCount;

  if (over) {
    return (
      <g>
        {Array.from({ length: sampleCount + 2 }).map((_, i) => (
          <text
            key={i}
            x={width / 2 + (i - (sampleCount + 2 - 1) / 2) * iconSize}
            y={height / 2}
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
          >
            {i === sampleCount ? "..." : icon}
          </text>
        ))}
        <path
          style={{
            fill: "none",
            stroke: "rgb(255, 255, 255)",
            strokeDasharray: `${iconSize}, ${iconSize * 3}`,
          }}
          d={`M ${width / 2 - iconSize * 2} ${height / 2 + iconSize} C ${
            width / 2 - iconSize * 2
          } ${height / 2 + iconSize * 2}, ${width / 2 + iconSize * 2} ${
            height / 2 + iconSize * 2
          }, ${width / 2 + iconSize * 2} ${height / 2 + iconSize}`}
        />
        <text
          x={width / 2}
          y={height / 2 + iconSize * 2}
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
        >
          {value}
        </text>
      </g>
    );
  }
  return (
    <g>
      {Array.from({ length: rowCount }).map(
        (_, i) => {
          const countInRow = (i === rowCount) ? mod : rowSize;
          return (
            <g key={i}>
              {Array.from({ length: countInRow }).map((_, j) => (
                <text
                  key={j}
                  x={width / 2 + (j - (countInRow - 1) / 2) * iconSize}
                  y={height / 2 + (i - rowCount / 2) * iconSize}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {icon}
                </text>
              ))}
            </g>
          );
        },
      )}
    </g>
  );
}

function Multiple(
  { icon, value, width, height }: {
    readonly icon: string;
    readonly value: number;
    readonly width: number;
    readonly height: number;
  },
) {
  return (
    <text
      x={width / 2}
      y={height / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      fill="white"
    >
      {value}
      {icon}
    </text>
  );
}
