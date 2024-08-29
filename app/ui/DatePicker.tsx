import React from "react";
import { TextField } from "@mui/material";

interface DatePickerProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const DatePicker = ({ label, value, required, onChange }: DatePickerProps) => (
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
