import React from "react";
import { FormControl, FormControlLabel, FormGroup, FormLabel, Checkbox } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface CheckboxGroupProps extends Omit<BaseUIProps, 'value' | 'onChange'> {
  value: string[];
  onChange: (value: string[]) => void;
}

const CheckboxGroup = ({ label, options, value, required, onChange }: CheckboxGroupProps) => {
  const handleChange = (option: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
      ? [...value, option]
      : value.filter((item) => item !== option);
    onChange(newValue);
  };

  return (
    <FormControl component="fieldset" required={required}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={value.includes(option)}
                onChange={handleChange(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxGroup