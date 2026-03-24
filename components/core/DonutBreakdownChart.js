import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatINR } from "@/lib/format";

const COLORS = ["#6366F1", "#EF4444", "#10B981", "#F59E0B"];

export default function DonutBreakdownChart({ data = [], title }) {
  const total = data.reduce((a, b) => a + (b.value || 0), 0);

  const hasData = total > 0;

  return (
    <div
      className="
        w-full
        rounded-xl
        border
        bg-[var(--surface-2)]
        p-4
      "
    >
      {title && (
        <h3 className="text-sm font-medium text-center mb-4">
          {title}
        </h3>
      )}

      {/* CHART AREA */}
      <div className="h-56 sm:h-64 md:h-72">

        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="55%"
                outerRadius="80%"
                label={({ percent }) =>
                  percent ? `${(percent * 100).toFixed(0)}%` : ""
                }
                labelLine={false}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip formatter={(v) => formatINR(v)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          /* EMPTY STATE */
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Enter values to see the breakdown
          </div>
        )}
      </div>

      {/* LEGEND */}
      {hasData ? (
        <div className="mt-4 space-y-2 text-xs">
          {data.map((d, i) => {
            const percent = total ? ((d.value / total) * 100).toFixed(1) : 0;

            return (
              <div
                key={d.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span>{d.name}</span>
                </div>

                <div className="text-right">
                  <div>{formatINR(d.value)}</div>
                  <div className="text-gray-400">{percent}%</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 text-xs text-center text-gray-400">
          No financial breakdown available
        </div>
      )}
    </div>
  );
}