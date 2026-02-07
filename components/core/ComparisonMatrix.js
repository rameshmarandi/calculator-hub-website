export default function ComparisonMatrix({ columns, rows }) {
  return (
    <table className="w-full text-sm border mt-8">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} className="p-2 border">
              {c}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => (
              <td key={j} className="p-2 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
