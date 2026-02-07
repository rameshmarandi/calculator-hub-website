export default function DataTable({ data }) {
  if (!data?.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full border text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="p-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h} className="p-2 border">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
