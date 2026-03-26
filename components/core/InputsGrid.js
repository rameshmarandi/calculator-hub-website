"use client";

import { AmountInput } from "@/components/inputs/AmountInput";
import { PercentageInput } from "@/components/inputs/PercentageInput";
import NumberInput from "@/components/inputs/NumberInput";
import SelectInput from "@/components/inputs/SelectInput";

/*
  InputsGrid
  Pure layout renderer

  Supported input types
  - amount
  - percent
  - number
  - select
*/

export default function InputsGrid({
  inputs = [],
  values = {},
  setValues,
}) {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    return null;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {inputs.map((i, index) => {
        if (!i) return null;

        const key = i?.key ?? `input-${index}`;

        const value = values?.[key] ?? "";

        const handleChange = (v) => {
          if (typeof setValues !== "function") return;

          setValues((prev) => ({
            ...(prev || {}),
            [key]: v ?? "",
          }));
        };

        const commonProps = {
          label: i?.label ?? "",
          value,
          onChange: handleChange,
        };

        return (
          <div key={key}>
            {/* TYPE SWITCH */}

            {i?.type === "amount" && (
              <AmountInput
                {...commonProps}
                placeholder={i?.placeholder ?? ""}
                prefix={i?.prefix ?? ""}
              />
            )}

            {i?.type === "percent" && (
              <PercentageInput
                {...commonProps}
                placeholder={i?.placeholder ?? ""}
              />
            )}

            {i?.type === "number" && (
              <NumberInput
                {...commonProps}
                placeholder={i?.placeholder ?? ""}
                min={Number.isFinite(i?.min) ? i.min : 1}
              />
            )}

            {i?.type === "select" && (
              <SelectInput
                {...commonProps}
                options={Array.isArray(i?.options) ? i.options : []}
              />
            )}

            {/* HINT */}

            {i?.hint && (
              <p className="text-xs text-gray-500 mt-1">{i.hint}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}