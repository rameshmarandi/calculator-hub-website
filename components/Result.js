export default function Result({ label, value }) {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
