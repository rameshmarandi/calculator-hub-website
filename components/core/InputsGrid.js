// "use client";

import { AmountInput } from "@/components/inputs/AmountInput";
import { PercentageInput } from "@/components/inputs/PercentageInput";
import NumberInput from "@/components/inputs/NumberInput";

/*
  InputsGrid is ONLY layout.
  It never renders raw <input />.
*/

export default function InputsGrid({ inputs, values, setValues }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {inputs.map((i) => {
        const commonProps = {
          label: i.label,
          placeholder: i.placeholder,
          value: values[i.key],
          onChange: (v) =>
            setValues({
              ...values,
              [i.key]: v,
            }),
        };

        return (
          <div key={i.key}>
            {/* TYPE SWITCH */}
            {i.type === "amount" && <AmountInput {...commonProps} />}

            {i.type === "percent" && <PercentageInput {...commonProps} />}

            {i.type === "number" && (
              <NumberInput {...commonProps} min={i.min || 1} />
            )}

            {/* OPTIONAL HINT */}
            {i.hint && <p className="text-xs text-gray-500 mt-1">{i.hint}</p>}
          </div>
        );
      })}
    </div>
  );
}
