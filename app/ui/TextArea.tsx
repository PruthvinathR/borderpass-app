import React from "react";
import { TextField } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface TextAreaProps extends BaseUIProps {}

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
