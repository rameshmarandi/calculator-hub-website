"use client";

export default function ScheduleTable({ rows, renderRow }) {
  if (!rows?.length) return null;

  return (
    <div
      className="mt-10 overflow-x-auto rounded-xl border"
      style={{
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border)",
      }}
    >
      <table className="w-full text-sm min-w-[600px]">
        {renderRow(rows)}
      </table>
    </div>
  );
}
