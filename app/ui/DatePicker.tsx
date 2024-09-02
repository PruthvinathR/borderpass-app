import React from "react";
import { TextField } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface DatePickerProps extends BaseUIProps {}

const DatePicker = ({ label, value, required, options, onChange }: DatePickerProps) => (
  <TextField
    fullWidth
    type="date"
    label={label}
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
);


export default DatePicker
