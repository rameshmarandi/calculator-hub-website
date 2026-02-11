export default function ExplanationText({ text }) {
  return (
    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
      {text}
    </p>
  );
}
