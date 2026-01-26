export default function Calculator({ type }) {
  const title = (type || "calculator").replaceAll("-", " ");

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* TITLE */}
      <header>
        <h1
          className="text-2xl font-bold capitalize"
          style={{ color: "var(--text-main)" }}
        >
          {title}
        </h1>

        <p
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Calculate accurately using our free online calculator.
        </p>
      </header>

      {/* INPUT CARD */}
      <div
        className="rounded-lg p-5 space-y-4"
        style={{
          backgroundColor: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <input
          className="
            w-full rounded-md p-2.5
            focus:outline-none focus:ring-2
          "
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-main)",
          }}
          placeholder="Enter value"
        />

        <button
          className="w-full rounded-md px-4 py-2.5 font-medium transition"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          Calculate
        </button>
      </div>

      {/* RESULT */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: "rgba(61, 220, 132, 0.12)",
          border: "1px solid rgba(61, 220, 132, 0.3)",
        }}
      >
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--success)" }}
        >
          Result will appear here
        </p>
      </div>

      {/* SEO CONTENT */}
      <section
        className="text-sm leading-6 space-y-2"
        style={{ color: "var(--text-muted)" }}
      >
        <h2
          className="font-semibold"
          style={{ color: "var(--text-main)" }}
        >
          How to use this calculator?
        </h2>

        <p>
          Enter the required values in the input fields and click calculate.
        </p>
        <p>
          This calculator works on all devices and gives accurate results.
        </p>
      </section>

    </div>
  );
}
