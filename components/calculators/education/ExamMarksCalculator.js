"use client";

import { useState } from "react";
import { Calculator, ClipboardCheck } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ExamMarksCalculator() {
  const [totalQuestions, setTotalQuestions] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [negativeMarks, setNegativeMarks] = useState("0");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!totalQuestions || isNaN(totalQuestions) || Number(totalQuestions) <= 0) {
      setError("Please enter valid total number of questions.");
      return false;
    }

    if (!marksPerQuestion || isNaN(marksPerQuestion) || Number(marksPerQuestion) <= 0) {
      setError("Please enter valid marks per question.");
      return false;
    }

    if (
      !correctAnswers ||
      isNaN(correctAnswers) ||
      Number(correctAnswers) < 0 ||
      Number(correctAnswers) > Number(totalQuestions)
    ) {
      setError("Please enter valid number of correct answers.");
      return false;
    }

    if (isNaN(negativeMarks) || Number(negativeMarks) < 0) {
      setError("Negative marks cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateMarks(e) {
    e.preventDefault();
    if (!validate()) return;

    const totalQ = Number(totalQuestions);
    const marksQ = Number(marksPerQuestion);
    const correct = Number(correctAnswers);
    const negative = Number(negativeMarks);

    const wrongAnswers = totalQ - correct;

    const score =
      correct * marksQ - wrongAnswers * negative;

    setResult({
      score: score.toFixed(2),
      correct,
      wrong: wrongAnswers,
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Exam Marks Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate your exam score instantly based on total questions,
          marks per question, correct answers, and negative marking using
          this Exam Marks Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateMarks} className="space-y-4">
        <PercentageInput
          label="Total Number of Questions"
          value={totalQuestions}
          onChange={setTotalQuestions}
          placeholder="100"
        />

        <PercentageInput
          label="Marks per Question"
          value={marksPerQuestion}
          onChange={setMarksPerQuestion}
          placeholder="4"
        />

        <PercentageInput
          label="Correct Answers"
          value={correctAnswers}
          onChange={setCorrectAnswers}
          placeholder="72"
        />

        <PercentageInput
          label="Negative Marks per Wrong Answer"
          value={negativeMarks}
          onChange={setNegativeMarks}
          placeholder="1"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Marks
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<ClipboardCheck size={20} />}
            label="Your Exam Score"
            value={`${result.score} marks`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Exam Marks Are Calculated
        </h2>

        <p>
          Exam marks are calculated based on the number of correct and
          wrong answers, marks assigned to each question, and any
          negative marking scheme applied by the exam authority.
        </p>

        <h3 className="font-semibold">
          Exam Marks Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Total Marks = (Correct Answers × Marks per Question) −
          (Wrong Answers × Negative Marks)
        </p>

        <ul className="list-disc pl-5">
          <li>Used in competitive and entrance exams</li>
          <li>Supports negative marking schemes</li>
          <li>Helps estimate performance quickly</li>
        </ul>

        <h3 className="font-semibold">
          Why Use an Exam Marks Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant score calculation</li>
          <li>Avoids manual calculation mistakes</li>
          <li>Useful for mock tests and real exams</li>
          <li>Helps predict rank and percentile</li>
        </ul>

        <p>
          This calculator provides an estimated score. Final marks may
          vary based on official answer keys and evaluation rules.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This exam marks calculator provides an estimate only.
        Always refer to official answer keys and scorecards for final
        results.
      </aside>
    </section>
  );
}
