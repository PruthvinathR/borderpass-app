import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
}

const Dropdown = ({ label, value, options, required, onChange }: DropdownProps) => (
  <FormControl fullWidth required={required}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value as string)}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default Dropdown