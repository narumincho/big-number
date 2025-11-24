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
    <svg
      ref={ref}
      style={{ width: "100%", height: "100%", display: "block" }}
      {...(width && height ? { viewBox: `0 0 ${width} ${height}` } : {})}
    >
      {viewType === "addition" && <Addition icon={icon} value={value} />}
      {viewType === "multiple" && <Multiple icon={icon} value={value} />}
    </svg>
  );
}

function Addition(
  { icon, value }: { readonly icon: string; readonly value: number },
) {
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
