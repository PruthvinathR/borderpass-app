import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface RadioButtonGroupProps extends BaseUIProps {}

const RadioButtonGroup = ({ label, options, value, required, onChange }: RadioButtonGroupProps) => (
  <FormControl component="fieldset" required={required}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButtonGroup;
