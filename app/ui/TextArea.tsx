import React from "react";
import { TextField } from "@mui/material";

interface TextAreaProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const TextArea = ({ label, value, required, onChange }: TextAreaProps) => (
  <TextField
    fullWidth
    multiline
    rows={4}
    label={label}
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextArea;
