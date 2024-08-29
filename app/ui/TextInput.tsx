import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const TextInput = ({ label, value, required, onChange }: TextInputProps) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextInput;