"use client";

import { useState } from "react";
import { ClipboardCheck } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { examMarksCalculator } from "../../../lib/formulas";
import ExamMarksCalculatorArticle from "../../content/education/ExamMarksCalculatorArticle";

export default function ExamMarksCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [totalQuestions, setTotalQuestions] = useState("100");
  const [marksPerQuestion, setMarksPerQuestion] = useState("4");
  const [correctAnswers, setCorrectAnswers] = useState("72");
  const [negativeMarks, setNegativeMarks] = useState("1");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeTotalQuestions = Number(totalQuestions) || 0;
  const safeMarksPerQuestion = Number(marksPerQuestion) || 0;
  const safeCorrectAnswers = Number(correctAnswers) || 0;
  const safeNegativeMarks = Number(negativeMarks) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = examMarksCalculator({
    totalQuestions: safeTotalQuestions,
    marksPerQuestion: safeMarksPerQuestion,
    correctAnswers: safeCorrectAnswers,
    negativeMarks: safeNegativeMarks
  });

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Exam Marks Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your exam score using total questions,
          marks per question, correct answers, and negative marking.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Total Number of Questions"
          value={totalQuestions}
          onChange={setTotalQuestions}
          prefix=""
          placeholder="100"
          min={1}
        />

        <AmountInput
          label="Marks per Question"
          value={marksPerQuestion}
          onChange={setMarksPerQuestion}
          prefix=""
          placeholder="4"
          min={0}
        />

        <AmountInput
          label="Correct Answers"
          value={correctAnswers}
          onChange={setCorrectAnswers}
          prefix=""
          placeholder="72"
          min={0}
        />

        <AmountInput
          label="Negative Marks per Wrong Answer"
          value={negativeMarks}
          onChange={setNegativeMarks}
          prefix=""
          placeholder="1"
          min={0}
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<ClipboardCheck size={20} />}
          label="Your Exam Score"
          value={`${result.score || 0} marks`}
        />
      </div>


      {/* SEO CONTENT */}
      <ExamMarksCalculatorArticle/>

    </section>
  );
}