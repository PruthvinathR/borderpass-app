import React from "react";
import { TextField } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface TextInputProps extends BaseUIProps{}

const TextInput = ({ label, value, required, options, onChange }: TextInputProps) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextInput;