import Link from "next/link";

export default function PercentageCalculatorArticle() {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* 1. Introduction to the Calculator */}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">
          Convert Your Marks into Percentage Instantly
        </h1>

        <p>
          Understanding your academic performance becomes much easier when you
          look at it in percentage form instead of raw marks. This tool helps
          you quickly convert your exam scores into a clear percentage, giving
          you an accurate picture of how well you performed.
        </p>

        <p>
          Whether you're checking school results, preparing for college
          admissions, or evaluating competitive exam scores, having your
          percentage ready helps you compare results, meet eligibility criteria,
          and make better academic decisions.
        </p>

        <p>
          Instead of manually applying formulas and risking calculation errors,
          you can simply enter your marks and total score to get instant and
          precise results. It’s fast, reliable, and works for any exam format.
        </p>
      </section>

      {/* 2. Why This Calculation Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why Converting Marks into Percentage Actually Matters
        </h2>

        <p>
          Raw marks by themselves don’t tell the full story. If someone says
          they scored 450 marks, the first question should be, “Out of how
          much?” Without that context, the number is meaningless.
        </p>

        <p>
          Percentage solves this problem by putting every score on the same
          scale. Whether your exam was out of 100, 500, or 1000, percentage
          translates your performance into a standard format that anyone can
          understand instantly.
        </p>

        <p>
          This becomes especially important when you’re dealing with real
          decisions. Colleges, universities, and even some job applications use
          percentage as a filtering criteria. If you don’t know your percentage,
          you can’t accurately judge where you stand.
        </p>

        <p>In practical terms, this calculation helps you:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Quickly check if you meet admission cut-off requirements</li>
          <li>Compare your performance with friends or competitors fairly</li>
          <li>Understand whether your preparation strategy is working</li>
          <li>Set clear targets like reaching 80% or 90% in future exams</li>
        </ul>

        <p>
          Without converting your marks into percentage, you are essentially
          making decisions based on incomplete information.
        </p>
      </section>

      {/* 3. What This Concept Means */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Understanding Percentage in Simple Terms
        </h2>

        <p>
          Percentage is simply a way to express your score out of 100. Instead
          of saying you scored 425 out of 500, percentage tells you how much
          that score represents in a universal format.
        </p>

        <p>
          Think of it like this. If every exam in the world had 100 marks, your
          percentage would be your exact score in that system. That’s why
          percentage is so powerful. It removes differences in exam patterns and
          makes everything comparable.
        </p>

        <p>
          For example, scoring 75% means you achieved 75 out of every 100 marks.
          It doesn’t matter whether your actual exam was out of 200, 500, or
          even 1000. The percentage stays consistent and easy to understand.
        </p>

        <p>
          This is why percentage is used everywhere, from school report cards to
          college admissions and even eligibility criteria for competitive
          exams. It acts as a common language that simplifies performance
          evaluation.
        </p>

        <p>
          Once you understand this concept, you stop looking at marks as
          isolated numbers and start seeing them as part of a bigger performance
          picture.
        </p>
      </section>
      {/* 4. Key Terms Every User Should Understand */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Key Terms You Should Clearly Understand Before Calculating
        </h2>

        <p>
          Before using this tool, it’s important to understand a few basic
          terms. These are simple, but if misunderstood, they can lead to
          incorrect results or confusion.
        </p>

        <p>
          <strong>Marks You Scored:</strong> This is the actual number of marks
          you obtained in your exam. For example, if you wrote 5 subjects and
          scored a total of 425, this is your obtained score.
        </p>

        <p>
          <strong>Maximum Possible Marks:</strong> This represents the total
          marks you could have scored. If each subject is 100 marks and you have
          5 subjects, your total becomes 500.
        </p>

        <p>
          <strong>Percentage:</strong> This is your performance expressed out of
          100. It helps convert your raw marks into a format that is easy to
          compare across different exams.
        </p>

        <p>
          <strong>Grade:</strong> Many institutions convert percentages into
          grades like A, B, or C. These grades are based on predefined
          percentage ranges.
        </p>

        <p>
          <strong>Cut-off Percentage:</strong> This is the minimum percentage
          required to qualify for admissions, scholarships, or job
          opportunities. Missing the cut-off by even 1% can change your options
          significantly.
        </p>

        <p>
          When you clearly understand these terms, you not only calculate
          correctly but also interpret your results in a meaningful way.
        </p>
      </section>

      {/* 5. How the Calculator Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          How the Calculation Actually Happens
        </h2>

        <p>
          Behind the scenes, the logic is very simple. The tool takes your
          marks, compares them against the total possible marks, and converts
          that ratio into a percentage.
        </p>

        <p>
          Instead of doing this manually, which can lead to mistakes especially
          with large numbers or decimals, the calculator handles everything
          instantly and accurately.
        </p>

        <p>Here’s exactly what happens step by step:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>You enter the marks you scored</li>
          <li>You enter the total marks for the exam</li>
          <li>The tool divides your score by the total marks</li>
          <li>It multiplies the result by 100 to convert it into percentage</li>
          <li>The final value is displayed instantly on your screen</li>
        </ul>

        <p>
          What makes this useful is not just speed, but consistency. Every time
          you calculate, you get the correct result without worrying about
          manual errors or miscalculations.
        </p>

        <p>
          This is especially helpful when you are evaluating multiple results or
          comparing different exams quickly.
        </p>
      </section>

      {/* 6. Inputs Required in the Calculator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          What You Need to Enter (And How to Avoid Mistakes)
        </h2>

        <p>
          This tool requires only two inputs, but entering them correctly is
          critical. Even a small mistake here will completely change your final
          percentage.
        </p>

        <p>
          <strong>Marks You Scored:</strong> Enter the total marks you actually
          obtained. If your result is divided subject-wise, make sure you add
          all subjects correctly before entering the value.
        </p>

        <p>
          <strong>Maximum Possible Marks:</strong> Enter the total marks the
          exam was conducted for. This is not your score, but the full marks of
          the exam. For example, if there were 5 subjects of 100 marks each, the
          total will be 500.
        </p>

        <p>
          One common mistake people make is entering per-subject marks instead
          of the total. Always double-check your inputs before calculating to
          ensure accurate results.
        </p>

        <p>
          If your marks include decimals or internal assessments, you can still
          enter them directly. The calculator will handle it without any issues.
        </p>
      </section>
      {/* Bonus Insight */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Quick Mental Shortcut to Estimate Percentage
        </h2>

        <p>
          You don’t always need a calculator. If your marks are close to a round
          number, you can estimate your percentage mentally.
        </p>

        <p>
          For example, if you scored 450 out of 500, you can quickly see that
          you lost 50 marks. That’s 10% of 500, so your percentage is roughly
          90%.
        </p>

        <p>
          This trick helps you quickly judge your performance even before
          calculating exact values.
        </p>
      </section>
      {/* 7. Understanding the Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          How to Interpret Your Percentage Properly
        </h2>

        <p>
          The percentage you see is more than just a number. It gives you a
          clear indication of where you stand academically and helps you make
          informed decisions about your next steps.
        </p>

        <p>
          In general, higher percentages reflect stronger performance, but what
          really matters is how that percentage compares to your goals,
          cut-offs, and competition.
        </p>

        <p>Here’s a practical way to understand your result:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>90% and above:</strong> Excellent performance. You are
            likely to qualify for top colleges and competitive opportunities.
          </li>
          <li>
            <strong>75% – 89%:</strong> Strong performance. You are in a safe
            range for most admissions and have good academic standing.
          </li>
          <li>
            <strong>60% – 74%:</strong> Average performance. You may need
            improvement depending on your target college or exam.
          </li>
          <li>
            <strong>Below 60%:</strong> Needs attention. This is a signal to
            revisit your preparation strategy and focus on weak areas.
          </li>
        </ul>

        <p>
          Keep in mind that these ranges are general guidelines. Some
          institutions have much higher cut-offs, while others may accept lower
          percentages.
        </p>

        <p>
          Instead of just looking at the number, use your percentage as
          feedback. It tells you whether you are on the right track or need to
          adjust your approach.
        </p>
      </section>
      {/* 8. Mathematical Formula Used */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          The Logic Behind the Percentage Calculation
        </h2>

        <p>
          At its core, percentage is simply a way of converting your score into
          a value out of 100. The formula used here is straightforward, but
          understanding why it works makes it much easier to trust and apply.
        </p>

        <p>The calculation follows this structure:</p>

        <p>
          <strong>Percentage = (Marks You Scored ÷ Total Marks) × 100</strong>
        </p>

        <p>
          First, your marks are divided by the total marks to find your
          performance as a fraction. This tells you what portion of the total
          you achieved. Then, multiplying by 100 converts that fraction into a
          percentage.
        </p>

        <p>
          For example, if you scored half of the total marks, the fraction would
          be 0.5. When you multiply it by 100, it becomes 50%, which is much
          easier to understand and compare.
        </p>

        <p>
          This method works for any exam pattern, whether the total marks are
          100, 500, or even higher. That’s why it is universally used across
          schools, colleges, and competitive exams.
        </p>
      </section>

      {/* 9. Example Calculations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Real Examples to Make It Clear</h2>

        <p>
          Let’s break down a few practical examples so you can clearly see how
          the calculation works in different situations.
        </p>

        <p>
          <strong>Example 1: Strong Performance</strong>
        </p>
        <p>You scored 450 marks out of 500.</p>
        <p>Step 1: 450 ÷ 500 = 0.9 Step 2: 0.9 × 100 = 90%</p>
        <p>
          This means you scored 90% overall, which is considered excellent in
          most academic systems.
        </p>

        <p>
          <strong>Example 2: Consistent Performance</strong>
        </p>
        <p>You scored 320 marks out of 400.</p>
        <p>Step 1: 320 ÷ 400 = 0.8 Step 2: 0.8 × 100 = 80%</p>
        <p>
          Even though the total marks are different from the first example, the
          percentage still gives a clear and comparable result.
        </p>

        <p>
          <strong>Example 3: Non-Round Numbers</strong>
        </p>
        <p>You scored 275 marks out of 350.</p>
        <p>Step 1: 275 ÷ 350 ≈ 0.7857 Step 2: 0.7857 × 100 ≈ 78.57%</p>
        <p>
          This example shows that the calculator can handle decimal values
          accurately, which is useful when marks are not perfectly rounded.
        </p>

        <p>
          Once you understand these examples, you can mentally estimate your
          percentage even before using the calculator, which helps in quick
          decision-making.
        </p>
      </section>
      {/* 10. Comparison Scenarios */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why Percentage Makes Comparison Fair
        </h2>

        <p>
          One of the biggest advantages of converting marks into percentage is
          that it allows fair comparison, even when exams are completely
          different.
        </p>

        <p>Let’s look at a simple comparison:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Student A scored 450 out of 500 → 90%</li>
          <li>Student B scored 360 out of 400 → 90%</li>
        </ul>

        <p>
          At first glance, Student A seems better because the marks are higher.
          But when converted into percentage, both students performed at the
          exact same level.
        </p>

        <p>
          This is why institutions don’t rely on raw marks. They use percentage
          because it removes differences in exam patterns and gives a
          standardized way to judge performance.
        </p>

        <p>Now consider another situation:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Student C: 300 out of 600 → 50%</li>
          <li>Student D: 280 out of 400 → 70%</li>
        </ul>

        <p>
          Even though Student C has more marks, Student D has performed
          significantly better in terms of percentage. This clearly shows why
          relying only on marks can be misleading.
        </p>

        <p>
          Once you start thinking in percentages, you make more accurate
          comparisons and better academic decisions.
        </p>
      </section>

      {/* 11. Factors That Affect the Result */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          What Can Influence Your Final Percentage
        </h2>

        <p>
          Your percentage may look like a simple number, but it is influenced by
          multiple factors. Understanding these helps you avoid mistakes and
          interpret your result correctly.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Total Marks Structure:</strong> Exams with higher total
            marks require more consistent performance. A small drop in marks can
            have a noticeable impact on percentage.
          </li>
          <li>
            <strong>Your Actual Score:</strong> Even a difference of 5 to 10
            marks can shift your percentage significantly, especially in smaller
            exams.
          </li>
          <li>
            <strong>Input Accuracy:</strong> Entering incorrect values in the
            calculator will directly produce wrong results. This is the most
            common issue users face.
          </li>
          <li>
            <strong>Decimal Precision:</strong> Some results include decimal
            values like 78.57%. Rounding these values may slightly change how
            your performance is interpreted.
          </li>
          <li>
            <strong>Subject Weightage:</strong> In some exams, different
            subjects carry different marks. If you calculate totals incorrectly,
            your percentage will not reflect your true performance.
          </li>
        </ul>

        <p>
          Paying attention to these factors ensures that your percentage is not
          only accurate but also meaningful when used for decision-making.
        </p>
      </section>
      {/* 12. Benefits of Using This Calculator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why Using This Tool Is Actually Helpful
        </h2>

        <p>
          At first glance, calculating percentage may seem simple. But when
          you’re dealing with multiple subjects, large totals, or decimal
          values, manual calculation can quickly become confusing and
          error-prone.
        </p>

        <p>This is where a dedicated tool makes a real difference.</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Saves Time:</strong> Instead of applying formulas manually,
            you get your result instantly. This is especially useful when
            checking multiple results or comparing different exams.
          </li>
          <li>
            <strong>Eliminates Calculation Errors:</strong> Even small mistakes
            in division or multiplication can lead to wrong percentages. The
            tool ensures accurate and consistent results every time.
          </li>
          <li>
            <strong>Handles Complex Values Easily:</strong> Whether your marks
            include decimals or come from different subjects, the calculator
            processes everything without confusion.
          </li>
          <li>
            <strong>Improves Decision-Making:</strong> Knowing your exact
            percentage helps you decide whether you meet cut-offs, need
            improvement, or are ready for the next step.
          </li>
        </ul>

        <p>
          In short, it’s not just about convenience. It’s about getting reliable
          results that you can confidently use for important academic decisions.
        </p>
      </section>

      {/* 13. Practical Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Where You’ll Actually Use This in Real Life
        </h2>

        <p>
          This tool is not limited to just checking results. It becomes useful
          in multiple real-life academic situations where accurate performance
          evaluation matters.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>After Exam Results:</strong> Quickly convert your marks into
            percentage to understand your overall performance without waiting
            for official conversions.
          </li>
          <li>
            <strong>College Admissions:</strong> Many colleges list eligibility
            criteria in percentage. This helps you instantly check whether you
            qualify.
          </li>
          <li>
            <strong>Scholarship Applications:</strong> Scholarships often have
            strict percentage requirements. Even a small difference can impact
            eligibility.
          </li>
          <li>
            <strong>Competitive Exam Preparation:</strong> Use your percentage
            to track improvement over time and measure how close you are to your
            target score.
          </li>
          <li>
            <strong>Self-Performance Analysis:</strong> Instead of focusing only
            on marks, percentage helps you see trends and identify areas where
            you need improvement.
          </li>
        </ul>

        <p>
          The more consistently you use this calculation, the better you
          understand your progress and make smarter academic decisions.
        </p>
      </section>
      {/* 14. Mistakes People Commonly Make */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Common Mistakes That Can Give You Wrong Percentage
        </h2>

        <p>
          Even though calculating percentage looks simple, small mistakes can
          lead to completely wrong results. Most people don’t realize these
          errors until it affects their decisions.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Entering Incorrect Total Marks:</strong> This is the most
            common issue. If your total marks are 500 but you mistakenly enter
            400, your percentage will be significantly inflated.
          </li>
          <li>
            <strong>Mixing Subject Marks with Total Marks:</strong> Some users
            enter marks of a single subject instead of the combined total, which
            leads to incorrect calculation.
          </li>
          <li>
            <strong>Confusing Grades with Percentage:</strong> A grade like A or
            B does not directly represent a fixed percentage unless defined by
            your institution. Assuming values can lead to wrong conclusions.
          </li>
          <li>
            <strong>Ignoring Decimal Values:</strong> Rounding off too early can
            slightly change your final percentage. This becomes important when
            you are close to cut-off marks.
          </li>
          <li>
            <strong>Manual Calculation Errors:</strong> When calculating by
            hand, mistakes in division or multiplication are very common,
            especially with large numbers.
          </li>
        </ul>

        <p>
          Avoiding these mistakes ensures that your percentage truly reflects
          your performance and helps you make accurate decisions.
        </p>
      </section>

      {/* 15. Tips to Improve Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Practical Ways to Improve Your Percentage
        </h2>

        <p>
          Your percentage is not just a result, it’s feedback. If you use it
          correctly, it can guide you toward better performance in future exams.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Identify Weak Areas Early:</strong> Instead of focusing only
            on total marks, break down your performance subject-wise and work on
            areas where you consistently score low.
          </li>
          <li>
            <strong>Track Progress Regularly:</strong> Use percentage after
            every test to monitor improvement. This helps you stay on track and
            adjust your preparation strategy.
          </li>
          <li>
            <strong>Set Clear Targets:</strong> Aim for a specific percentage
            like 80% or 90% rather than just “doing better.” Clear goals improve
            focus and motivation.
          </li>
          <li>
            <strong>Practice Under Exam Conditions:</strong> Time-bound practice
            helps you improve both accuracy and speed, which directly impacts
            your final score.
          </li>
          <li>
            <strong>Focus on High-Weightage Topics:</strong> Some subjects or
            chapters carry more marks. Prioritizing them can significantly boost
            your overall percentage.
          </li>
        </ul>

        <p>
          Improving your percentage is not about working harder blindly. It’s
          about working smarter based on what your results are telling you.
        </p>
      </section>

      {/* 16. When Should You Use This Calculator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          When It Actually Makes Sense to Use This Tool
        </h2>

        <p>
          While you can use this calculator anytime, there are specific
          situations where it becomes especially useful and even necessary for
          making the right decisions.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Right After Getting Your Results:</strong> The first thing
            most students want to know is how they performed overall. Converting
            your marks into percentage gives you an instant and clear answer.
          </li>
          <li>
            <strong>Before Applying to Colleges:</strong> Many colleges specify
            eligibility in percentage terms. This tool helps you quickly check
            if you meet those requirements without confusion.
          </li>
          <li>
            <strong>While Comparing Multiple Exams:</strong> If you have results
            from different exams with different total marks, percentage helps
            you compare them fairly.
          </li>
          <li>
            <strong>During Exam Preparation:</strong> After mock tests or
            practice exams, calculating your percentage helps you track progress
            and understand whether you are improving.
          </li>
          <li>
            <strong>When Setting Academic Goals:</strong> If you aim to achieve
            a certain percentage like 85% or 90%, this tool helps you measure
            how close you are to your target.
          </li>
        </ul>

        <p>
          Using this calculator at the right time ensures that you are not just
          calculating numbers, but actually using those numbers to guide your
          decisions.
        </p>
      </section>

      {/* 17. Related Financial Tools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Related Calculators You May Find Useful
        </h2>

        <p>
          If you are working with academic scores, you may also need other tools
          to fully understand and manage your performance. These calculators
          complement each other and help you get a complete picture.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <a href="/education/percentage-calculator">Percentage Calculator</a> –
            Useful for general percentage calculations beyond exam scores.
          </li>
          <li>
            <a href="/education/grade-calculator">Grade Calculator</a> – Helps
            convert your percentage into grades based on standard grading
            systems.
          </li>
          <li>
            <a href="/education/cgpa-to-percentage-calculator">
              CGPA to Percentage Calculator
            </a>{" "}
            – Converts your CGPA into percentage for academic or job
            applications.
          </li>
          <li>
            <a href="/education/sgpa-to-cgpa-calculator">
              SGPA to CGPA Calculator
            </a>{" "}
            – Useful for calculating overall CGPA from semester-wise SGPA.
          </li>
        </ul>

        <p>
          Using these tools together allows you to move from raw scores to
          meaningful insights, helping you make smarter academic decisions.
        </p>
      </section>
      {/* 18. Frequently Asked Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          <strong>Q1: What does this calculator actually do?</strong>
        </p>
        <p>
          It converts your raw exam marks into a percentage by comparing your
          score with the total marks. This helps you understand your performance
          in a standardized format that is easy to compare across different
          exams.
        </p>

        <p>
          <strong>Q2: Is the result completely accurate?</strong>
        </p>
        <p>
          Yes, the calculation is based on a fixed mathematical formula. As long
          as you enter the correct marks and total marks, the result will always
          be accurate.
        </p>

        <p>
          <strong>
            Q3: Can I use this for any board, university, or exam?
          </strong>
        </p>
        <p>
          Yes, this works for all types of exams, whether school, college, or
          competitive tests. The formula remains the same regardless of the
          marking system.
        </p>

        <p>
          <strong>
            Q4: What if my marks include decimals or internal assessments?
          </strong>
        </p>
        <p>
          You can enter decimal values without any issue. The calculator will
          handle them correctly and give you a precise percentage.
        </p>

        <p>
          <strong>Q5: Why is percentage more useful than marks?</strong>
        </p>
        <p>
          Marks depend on the total score of the exam, which can vary.
          Percentage removes that difference and allows fair comparison, making
          it easier to evaluate performance.
        </p>

        <p>
          <strong>Q6: Does this percentage decide my grade?</strong>
        </p>
        <p>
          Percentage is often used to assign grades, but the exact grade
          boundaries depend on your school or university. Always check their
          grading system for accuracy.
        </p>

        <p>
          <strong>
            Q7: Can I calculate percentage manually instead of using this tool?
          </strong>
        </p>
        <p>
          Yes, you can use the formula manually. However, calculators save time
          and reduce the chances of mistakes, especially when dealing with large
          numbers or multiple subjects.
        </p>

        <p>
          <strong>Q8: When should I rely on this calculator?</strong>
        </p>
        <p>
          You should use it whenever you want a quick and accurate understanding
          of your performance, especially after results, during preparation, or
          when checking eligibility criteria.
        </p>

        <p>
          <strong>Q9: What is a good percentage to aim for?</strong>
        </p>
        <p>
          A good percentage depends on your goals. For top colleges, 85% and
          above is often considered strong, while 60–75% may be acceptable for
          general admissions.
        </p>

        <p>
          <strong>
            Q10: Can small differences in marks affect percentage significantly?
          </strong>
        </p>
        <p>
          Yes, especially in exams with lower total marks. Even a difference of
          a few marks can change your percentage and impact eligibility or
          ranking.
        </p>
      </section>
    </article>
  );
}
