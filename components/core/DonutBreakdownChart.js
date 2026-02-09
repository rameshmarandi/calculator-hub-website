// "use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatINR } from "@/lib/format";

const COLORS = ["#6366F1", "#EF4444", "#10B981", "#F59E0B"];

export default function DonutBreakdownChart({ data =[] , title}) {
  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <div
      className="
        w-full
        rounded-xl
        border
        bg-[var(--surface-2)]
        p-4
      ">

        {title && <h3 className="text-sm font-medium text-center mb-4">
       {title}
      </h3>}
      {/* Title */}
      

      {/* Chart */}
      <div className="h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              /* responsive radius */
              innerRadius="55%"
              outerRadius="80%"
              /* labels only on desktop */
              label={({ percent }) =>
                window.innerWidth >= 640 ? `${(percent * 100).toFixed(0)}%` : ""
              }
              labelLine={false}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(v) => formatINR(v)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Always-visible legend (BEST FOR MOBILE) */}
      <div className="mt-4 space-y-2 text-xs">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>{d.name}</span>
            </div>

            <div className="text-right">
              <div>{formatINR(d.value)}</div>
              <div className="text-gray-400">
                {((d.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
