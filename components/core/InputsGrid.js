"use client";

import { AmountInput } from "@/components/inputs/AmountInput";
import { PercentageInput } from "@/components/inputs/PercentageInput";
import NumberInput from "@/components/inputs/NumberInput";
import SelectInput from "@/components/inputs/SelectInput";

/*
  InputsGrid
  Pure layout renderer
  Supports:
  - amount
  - percent
  - number
  - select
*/

export default function InputsGrid({ inputs, values, setValues }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {inputs.map((i) => {
        const commonProps = {
          label: i.label,
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

            {i.type === "amount" && (
              <AmountInput {...commonProps} placeholder={i.placeholder} />
            )}

            {i.type === "percent" && (
              <PercentageInput {...commonProps} placeholder={i.placeholder} />
            )}

            {i.type === "number" && (
              <NumberInput
                {...commonProps}
                placeholder={i.placeholder}
                min={i.min || 1}
              />
            )}

            {i.type === "select" && (
              <SelectInput
                {...commonProps}
                options={i.options || []}
              />
            )}

            {/* HINT */}
            {i.hint && (
              <p className="text-xs text-gray-500 mt-1">{i.hint}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
