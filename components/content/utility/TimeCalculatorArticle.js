import Link from "next/link";

export default function TimeCalculatorArticle() {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* 1. Introduction to the Calculator */}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">
          Free Time Calculator – Add, Subtract & Calculate Time Duration Easily
        </h1>

        <p>
          Managing time effectively is one of the most underrated skills in both
          personal and professional life. Whether you are tracking work hours,
          calculating project duration, planning travel schedules, or analyzing
          productivity, understanding time differences is essential.
        </p>

        <p>
          The Time Calculator on Swiftcalcfy helps you quickly calculate the
          difference between two times, add or subtract durations, and break
          down time into hours, minutes, and seconds with precision. It removes
          manual errors and gives instant, reliable results that you can trust
          for daily planning and decision-making.
        </p>

        <p>
          This tool is designed for students, professionals, freelancers,
          business owners, and anyone who needs accurate time calculations
          without relying on guesswork or complicated mental math.
        </p>
      </section>

      {/* 2. Why This Calculation Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Time Calculation Matters</h2>

        <p>
          Time is not just a measurement, it directly impacts productivity,
          cost, efficiency, and even profitability. Every hour you spend or
          waste has a measurable value, especially in professional and business
          environments.
        </p>

        <p>
          Inaccurate time calculation creates real problems. Freelancers can
          lose income by underestimating billable hours or damage trust by
          overbilling. Businesses may fail to meet deadlines, misallocate
          resources, or underestimate project costs, leading to operational
          inefficiencies and financial loss.
        </p>

        <p>
          Even in daily life, poor time tracking leads to missed appointments,
          ineffective study schedules, and reduced productivity. Over time,
          these small inefficiencies compound into bigger problems.
        </p>

        <p>
          Accurate time calculation allows you to plan realistically, track
          effort properly, and make informed decisions. It helps you understand
          where your time is going and how to optimize it for better results.
        </p>

        <p>
          Whether you are managing a project, tracking work hours, planning
          travel, or organizing your day, precise time calculation is the
          foundation of effective time management.
        </p>
      </section>
      {/* 3. What This Concept Means */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Understanding the Concept of Time Calculation
        </h2>

        <p>
          Time calculation is the process of measuring how long something takes
          or determining a specific point in time after adding or subtracting a
          duration. It sounds simple, but it becomes tricky because time does
          not follow the normal base-10 system used in regular math.
        </p>

        <p>
          Instead, time works on a base-60 structure. One hour equals 60
          minutes, and one minute equals 60 seconds. Because of this,
          calculations require constant conversion between units, which is where
          most manual mistakes happen.
        </p>

        <p>
          For example, adding 50 minutes to 30 minutes does not give 80 minutes
          in standard time format. It converts to 1 hour and 20 minutes. This
          conversion step is where people often go wrong when calculating
          mentally.
        </p>

        <p>
          Another challenge comes when time crosses boundaries like midnight or
          spans multiple days. Without a structured approach, it becomes
          difficult to track accurate durations.
        </p>

        <p>
          A Time Calculator removes these complexities by automatically
          converting units, handling overflow, and providing results in a clear
          and usable format. This allows you to focus on decisions instead of
          calculations.
        </p>
      </section>

      {/* 4. Key Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Key Terms Every User Should Understand
        </h2>

        <p>
          <strong>Start Time:</strong> The exact moment when an activity begins.
          This is the reference point for all calculations.
        </p>

        <p>
          <strong>End Time:</strong> The moment when the activity finishes. The
          difference between start and end time gives you the total duration.
        </p>

        <p>
          <strong>Duration:</strong> The total time elapsed between two points.
          This is usually expressed in hours, minutes, and seconds.
        </p>

        <p>
          <strong>Time Interval:</strong> A defined span of time between two
          events. This is commonly used in scheduling, work tracking, and
          planning tasks.
        </p>

        <p>
          <strong>Hours, Minutes, Seconds:</strong> The standard units used to
          measure time. Understanding how these units convert into each other is
          essential for accurate calculations.
        </p>

        <p>
          <strong>24-Hour Format:</strong> A time format that runs from 00:00 to
          23:59. It eliminates confusion between morning and evening times and
          is widely used in professional settings.
        </p>

        <p>
          <strong>AM/PM Format:</strong> A 12-hour clock system that divides the
          day into two periods. While common in daily use, it can sometimes lead
          to errors if not handled carefully.
        </p>

        <p>
          <strong>Time Overflow:</strong> When seconds exceed 60 or minutes
          exceed 60, they are automatically converted into the next higher unit.
          This is a key concept in accurate time calculation.
        </p>
      </section>
      {/* 5. How the Calculator Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Time Calculator Works</h2>

        <p>
          The Time Calculator follows a structured process to ensure accurate
          and reliable results. Instead of directly comparing time values, it
          first converts everything into a consistent internal format.
        </p>

        <p>
          The first step is normalization. The calculator converts hours,
          minutes, and seconds into total seconds or minutes. This removes the
          complexity of handling different time units separately and allows
          precise calculations.
        </p>

        <p>
          Once converted, the tool performs the selected operation. For example,
          when calculating the difference between two times, it subtracts the
          start time from the end time in total seconds.
        </p>

        <p>
          After the calculation, the result is converted back into standard time
          format. Seconds are broken down into minutes, and minutes into hours.
          This step ensures the output is easy to understand and usable in
          real-life scenarios.
        </p>

        <p>
          The calculator also handles complex cases automatically. If the time
          crosses midnight, it adjusts the calculation by adding 24 hours. If
          values exceed normal limits, such as 75 minutes, it converts them into
          1 hour and 15 minutes without errors.
        </p>

        <p>
          This structured approach ensures that the results are always accurate,
          regardless of how simple or complex the input values are.
        </p>
      </section>

      {/* 6. Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Inputs Required in the Calculator
        </h2>

        <p>
          To get accurate results, it is important to enter the correct inputs.
          Each field plays a specific role in the calculation.
        </p>

        <p>
          <strong>Start Time:</strong> This is the reference point where the
          time calculation begins. It should be entered carefully, especially
          when using AM/PM format to avoid confusion.
        </p>

        <p>
          <strong>End Time:</strong> This represents the point where the
          calculation ends. The difference between start and end time determines
          the total duration.
        </p>

        <p>
          <strong>Operation Type:</strong> This defines what you want to
          calculate. You can find the time difference between two points, add a
          duration to a specific time, or subtract time from an existing value.
        </p>

        <p>
          <strong>Time Format:</strong> You can choose between 12-hour (AM/PM)
          and 24-hour formats. The 24-hour format is generally more reliable for
          avoiding input errors, especially in professional use cases.
        </p>

        <p>
          <strong>Optional Seconds Input:</strong> Some advanced calculations
          may include seconds for higher precision, which is useful in technical
          or time-sensitive scenarios.
        </p>

        <p>
          Providing accurate inputs ensures that the calculator delivers
          meaningful and trustworthy results.
        </p>
      </section>
      {/* 7. Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding the Results</h2>

        <p>
          Once the calculation is complete, the Time Calculator provides results
          in a structured and easy-to-understand format. Each output has a
          specific meaning and practical use.
        </p>

        <p>
          <strong>Total Duration:</strong> This is the complete time difference
          between the start and end time. It tells you how long an activity
          lasted and is especially useful for tracking work hours, study
          sessions, or travel time.
        </p>

        <p>
          <strong>Detailed Breakdown:</strong> The total duration is split into
          hours, minutes, and seconds. This breakdown helps you understand time
          distribution more clearly instead of working with large numbers.
        </p>

        <p>
          <strong>Converted Time:</strong> When you add or subtract time, this
          result shows the final calculated time. It helps in scheduling tasks,
          setting deadlines, or planning future activities.
        </p>

        <p>
          <strong>Real-World Interpretation:</strong> The real value of these
          results comes from how you use them. For example, if your total
          duration shows 9 hours of work daily, you can evaluate productivity or
          identify overworking.
        </p>

        <p>
          Instead of just reading the output, use it to make decisions such as
          optimizing schedules, improving efficiency, or balancing workload.
        </p>
      </section>

      {/* 8. Formula */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Mathematical Formula Used</h2>

        <p>
          At its core, time calculation is based on simple arithmetic, but with
          unit conversion due to the base-60 structure of time.
        </p>

        <p>
          <strong>Duration Calculation:</strong>
        </p>
        <p>Duration = End Time − Start Time</p>

        <p>
          Before applying this formula, both time values are converted into a
          single unit such as total seconds or minutes. This ensures accurate
          subtraction without unit conflicts.
        </p>

        <p>
          <strong>Time Addition:</strong>
        </p>
        <p>Final Time = Initial Time + Duration</p>

        <p>
          <strong>Time Subtraction:</strong>
        </p>
        <p>Final Time = Initial Time − Duration</p>

        <p>
          After performing the calculation, the result is converted back into
          hours, minutes, and seconds. This step is essential because raw values
          like total seconds are not practical for everyday use.
        </p>

        <p>
          The key challenge in these formulas is handling overflow correctly.
          For example, 90 minutes must be converted into 1 hour and 30 minutes.
          The calculator automates this process to ensure accuracy.
        </p>
      </section>

      {/* 9. Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculations</h2>

        <p>
          Understanding time calculation becomes much easier when you look at
          real-life scenarios. Below are practical examples that reflect how
          people actually use this tool.
        </p>

        <p>
          <strong>Example 1: Standard Work Shift</strong>
          <br />
          Start Time: 9:00 AM
          <br />
          End Time: 5:00 PM
          <br />
          Result: 8 hours
          <br />
          This is a basic full-day work calculation used by employees and HR
          teams.
        </p>

        <p>
          <strong>Example 2: Partial Work Session</strong>
          <br />
          Start Time: 10:30 AM
          <br />
          End Time: 1:15 PM
          <br />
          Result: 2 hours 45 minutes
          <br />
          Useful for freelancers tracking billable hours or students managing
          study sessions.
        </p>

        <p>
          <strong>Example 3: Time Addition</strong>
          <br />
          Initial Time: 6:30 PM
          <br />
          Duration Added: 2 hours
          <br />
          Result: 8:30 PM
          <br />
          Helps in scheduling meetings or setting deadlines.
        </p>

        <p>
          <strong>Example 4: Crossing Midnight</strong>
          <br />
          Start Time: 10:00 PM
          <br />
          End Time: 2:00 AM (next day)
          <br />
          Result: 4 hours
          <br />
          This is a common scenario in night shifts or travel schedules, where
          manual calculation often leads to mistakes.
        </p>

        <p>
          <strong>Example 5: Minute Overflow Case</strong>
          <br />
          Start Time: 2:45 PM
          <br />
          End Time: 4:20 PM
          <br />
          Result: 1 hour 35 minutes
          <br />
          Demonstrates how minutes are correctly handled when they exceed
          standard limits.
        </p>

        <p>
          These examples show how the calculator adapts to different real-world
          situations and ensures accuracy in every case.
        </p>
      </section>

      {/* 10. Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Comparison Scenarios</h2>

        <p>
          Time calculation becomes more powerful when you compare different
          scenarios. This helps you understand how small changes in duration can
          impact productivity and planning.
        </p>

        <p>
          <strong>Scenario 1: Longer Working Hours</strong>
          <br />
          Working 10 hours instead of 8 may increase total output, but it can
          also lead to fatigue and reduced efficiency over time. More hours do
          not always mean better results.
        </p>

        <p>
          <strong>Scenario 2: Short Focused Sessions</strong>
          <br />
          Working in shorter intervals, such as 2 to 3 hours of focused effort,
          often improves concentration and quality of work. This approach is
          commonly used in productivity methods like deep work or time blocking.
        </p>

        <p>
          <strong>Scenario 3: Break vs No Break</strong>
          <br />A 6-hour continuous work session may feel productive, but
          splitting it into 3-hour blocks with breaks can improve performance
          and reduce burnout.
        </p>

        <p>
          <strong>Scenario 4: Planning vs No Planning</strong>
          <br />
          Without proper time calculation, tasks often take longer than
          expected. Using calculated durations allows for realistic scheduling
          and better deadline management.
        </p>

        <p>
          By comparing different time scenarios, you can identify the most
          efficient way to structure your day and make smarter decisions about
          how you spend your time.
        </p>
      </section>

      {/* 11. Factors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect the Result</h2>

        <p>
          Several factors can influence the accuracy and interpretation of time
          calculations. Understanding these ensures you avoid mistakes and get
          reliable results.
        </p>

        <p>
          <strong>Time Format Selection:</strong> Choosing between 12-hour
          (AM/PM) and 24-hour format can impact accuracy. Mistakes in AM/PM are
          one of the most common causes of incorrect calculations, especially in
          scheduling.
        </p>

        <p>
          <strong>Accuracy of Input:</strong> Even a small input error, such as
          entering 2:00 instead of 12:00, can completely change the result.
          Accurate data entry is critical for meaningful outcomes.
        </p>

        <p>
          <strong>Crossing Midnight:</strong> When time spans across days, such
          as 10:00 PM to 2:00 AM, the calculation requires adding 24 hours.
          Without proper handling, this can lead to negative or incorrect
          durations.
        </p>

        <p>
          <strong>Time Zone Differences:</strong> When dealing with
          international schedules or remote work, time zone differences must be
          considered. Ignoring them can result in missed meetings or incorrect
          planning.
        </p>

        <p>
          <strong>Inclusion of Breaks:</strong> In work or study calculations,
          whether breaks are included or excluded can significantly affect the
          final duration and productivity analysis.
        </p>

        <p>
          <strong>Precision Level:</strong> Some calculations require seconds
          for accuracy, while others only need hours and minutes. The level of
          precision you choose can impact how detailed your results are.
        </p>
      </section>

      {/* 12. Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Benefits of Using This Calculator
        </h2>

        <p>
          Using a Time Calculator offers more than just convenience. It directly
          improves accuracy, efficiency, and decision-making in everyday
          situations.
        </p>

        <p>
          <strong>Eliminates Manual Errors:</strong> Time calculations are prone
          to mistakes due to unit conversions. The calculator automates this
          process, ensuring precise results every time.
        </p>

        <p>
          <strong>Saves Time:</strong> Instead of spending minutes calculating
          durations manually, you get instant results. This is especially useful
          in fast-paced work environments.
        </p>

        <p>
          <strong>Improves Productivity Tracking:</strong> By accurately
          measuring how time is spent, you can identify inefficiencies and
          optimize your schedule.
        </p>

        <p>
          <strong>Supports Accurate Billing:</strong> Freelancers and service
          providers can use precise time calculations to bill clients fairly and
          maintain trust.
        </p>

        <p>
          <strong>Enhances Planning and Scheduling:</strong> Whether it is
          meetings, travel, or project deadlines, accurate time calculation
          helps you plan with confidence.
        </p>

        <p>
          <strong>Handles Complex Scenarios Easily:</strong> Situations like
          crossing midnight or dealing with multiple time intervals are handled
          instantly without confusion.
        </p>

        <p>
          Overall, the calculator transforms time tracking from a manual effort
          into a reliable and efficient process.
        </p>
      </section>
      {/* 13. Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Use Cases</h2>

        <p>
          Time calculation is used in a wide range of real-world situations.
          When used correctly, it helps improve accuracy, planning, and
          efficiency across different areas of life.
        </p>

        <p>
          <strong>Freelancers Tracking Billable Hours:</strong> Freelancers
          often work on an hourly basis. Accurate time calculation ensures they
          charge clients correctly and avoid revenue loss due to undercounting
          hours.
        </p>

        <p>
          <strong>Students Planning Study Sessions:</strong> Students can use
          time calculation to organize study schedules, allocate time for each
          subject, and maintain a balanced routine without overloading
          themselves.
        </p>

        <p>
          <strong>Businesses Managing Employee Shifts:</strong> Companies rely
          on accurate time tracking to manage employee shifts, calculate wages,
          and ensure smooth operations without scheduling conflicts.
        </p>

        <p>
          <strong>Travel Planning:</strong> Travelers can calculate journey
          durations, layover times, and arrival schedules to plan trips more
          effectively and avoid delays.
        </p>

        <p>
          <strong>Project Management:</strong> Managers can estimate how long
          tasks take, allocate resources efficiently, and ensure deadlines are
          met without unrealistic expectations.
        </p>

        <p>
          <strong>Daily Productivity Tracking:</strong> Individuals can track
          how much time they spend on different activities and identify areas
          where time is being wasted or underutilized.
        </p>
      </section>

      {/* 14. Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mistakes People Make</h2>

        <p>
          Even simple time calculations can go wrong if basic principles are
          ignored. These mistakes often lead to inaccurate results and poor
          decision-making.
        </p>

        <p>
          <strong>Ignoring AM/PM Differences:</strong> Confusing morning and
          evening times is one of the most common errors. Entering 7:00 PM
          instead of 7:00 AM can completely change the calculation outcome.
        </p>

        <p>
          <strong>Incorrect Manual Calculations:</strong> Many people forget
          that time uses a base-60 system. Adding minutes and hours like regular
          numbers often leads to wrong results.
        </p>

        <p>
          <strong>Not Handling Midnight Crossover:</strong> When time spans
          across midnight, failing to adjust the calculation can result in
          negative or inaccurate durations.
        </p>

        <p>
          <strong>Ignoring Time Zones:</strong> In remote work or international
          communication, failing to account for time zone differences can lead
          to missed meetings and scheduling conflicts.
        </p>

        <p>
          <strong>Overlooking Breaks:</strong> Including or excluding break time
          incorrectly can distort total working hours, especially in billing or
          shift calculations.
        </p>

        <p>
          <strong>Relying on Guesswork:</strong> Estimating time without proper
          calculation often leads to poor planning and unrealistic expectations.
        </p>
      </section>
      {/* 15. Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tips to Improve Results</h2>

        <p>
          Getting accurate results from a Time Calculator is not just about
          using the tool, it is about how you approach time tracking and input
          data. These practical tips will help you get the most reliable
          outcomes.
        </p>

        <p>
          <strong>Always Double-Check Inputs:</strong> Small mistakes in time
          entry can completely change the result. Verify start and end times
          carefully, especially when using AM/PM format.
        </p>

        <p>
          <strong>Prefer 24-Hour Format:</strong> Using a 24-hour format reduces
          confusion between morning and evening times. It is especially useful
          in professional and technical environments.
        </p>

        <p>
          <strong>Track Time in Real-Time:</strong> Instead of estimating later,
          record time as you work. This improves accuracy and gives a clearer
          picture of how your time is actually spent.
        </p>

        <p>
          <strong>Break Down Large Tasks:</strong> Divide long durations into
          smaller segments. This helps in better tracking, improves focus, and
          makes your data more meaningful.
        </p>

        <p>
          <strong>Account for Breaks:</strong> Always decide whether breaks
          should be included or excluded. Ignoring this can lead to inaccurate
          totals, especially in billing or shift calculations.
        </p>

        <p>
          <strong>Use Consistent Time Format:</strong> Switching between formats
          can lead to errors. Stick to one format throughout your calculation
          process.
        </p>

        <p>
          Following these practices ensures that your results are not only
          accurate but also useful for planning and decision-making.
        </p>
      </section>

      {/* 16. When to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          When Should You Use This Calculator
        </h2>

        <p>
          A Time Calculator is most useful whenever you need clarity, accuracy,
          and efficiency in managing time-related decisions.
        </p>

        <p>
          <strong>Before Scheduling Tasks:</strong> Use it to estimate how long
          tasks will take so you can plan your day realistically and avoid
          overloading your schedule.
        </p>

        <p>
          <strong>During Project Planning:</strong> It helps in breaking down
          timelines, allocating resources, and setting achievable deadlines
          based on actual durations.
        </p>

        <p>
          <strong>While Tracking Work Hours:</strong> Ideal for freelancers,
          employees, and businesses to calculate exact working time and ensure
          fair compensation.
        </p>

        <p>
          <strong>For Travel and Event Planning:</strong> Calculate journey
          durations, arrival times, and buffers between events to avoid delays.
        </p>

        <p>
          <strong>When Managing Daily Productivity:</strong> Use it to analyze
          how your time is distributed across different activities and identify
          areas for improvement.
        </p>

        <p>
          <strong>In Time-Sensitive Situations:</strong> When precision matters,
          such as deadlines or shift management, accurate time calculation
          becomes critical.
        </p>

        <p>
          Using the calculator at the right time helps you stay organized,
          reduce errors, and make better decisions in both personal and
          professional life.
        </p>
      </section>

      {/* 17. Related */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Calculators</h2>

        <p>
          If you frequently work with time, dates, or numerical calculations,
          these related tools can help you handle different types of
          calculations more efficiently and improve your overall planning
          accuracy.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <a href="/utility/age-calculator">Age Calculator</a> – Calculate
            your exact age in years, months, and days for personal or official
            use.
          </li>
          <li>
            <a href="/utility/date-difference-calculator">
              Date Difference Calculator
            </a>{" "}
            – Find the exact number of days between two dates for planning or
            tracking purposes.
          </li>
          <li>
            <a href="/utility/unit-converter">Unit Converter</a> – Convert
            between different units of measurement quickly and accurately.
          </li>
          <li>
            <a href="/utility/percentage-increase-calculator">
              Percentage Increase Calculator
            </a>{" "}
            – Measure growth and changes in values over time.
          </li>
          <li>
            <a href="/utility/discount-calculator">Discount Calculator</a> –
            Calculate savings and final prices when shopping or budgeting.
          </li>
        </ul>

        <p>
          Using these tools together allows you to handle a wide range of
          calculations without switching between multiple platforms.
        </p>
      </section>

      {/* 18. FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          <strong>1. Can the Time Calculator handle midnight crossover?</strong>
          <br />
          Yes, the calculator automatically adjusts when time crosses midnight
          by treating the next day correctly. This ensures accurate duration
          calculation even for night shifts or late-night activities.
        </p>

        <p>
          <strong>2. How accurate is the Time Calculator?</strong>
          <br />
          The calculator is highly accurate because it converts time into a
          standard unit before performing calculations. This removes common
          manual errors related to minute and second conversions.
        </p>

        <p>
          <strong>3. Can I add and subtract time using this tool?</strong>
          <br />
          Yes, you can both add durations to a specific time and subtract time
          from an existing value. This is useful for scheduling and deadline
          management.
        </p>

        <p>
          <strong>4. Does it support seconds for precise calculations?</strong>
          <br />
          Yes, the calculator supports seconds, which is helpful in scenarios
          where high precision is required, such as technical or time-sensitive
          tasks.
        </p>

        <p>
          <strong>5. Is this calculator suitable for business use?</strong>
          <br />
          Absolutely. Businesses can use it for employee shift tracking,
          billing, project timelines, and scheduling operations.
        </p>

        <p>
          <strong>6. Is the Time Calculator free to use?</strong>
          <br />
          Yes, it is completely free and accessible anytime without
          restrictions.
        </p>

        <p>
          <strong>7. Which format is better, 12-hour or 24-hour?</strong>
          <br />
          The 24-hour format is generally recommended because it reduces
          confusion and minimizes errors, especially in professional
          environments.
        </p>

        <p>
          <strong>8. Can I use this calculator daily?</strong>
          <br />
          Yes, it is designed for regular use. Whether you are tracking work
          hours, planning tasks, or managing schedules, it can be used as a
          daily tool.
        </p>
      </section>
    </article>
  );
}
