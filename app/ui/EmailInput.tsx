
import React from "react";
import { TextField } from "@mui/material";

interface EmailInputProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const EmailInput = ({ label, value, required, onChange }: EmailInputProps) => (
  <TextField
    fullWidth
    type="email"
    label={label}
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value)}
    variant="outlined"
    margin="normal"
    inputProps={{
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
    }}
    helperText="Please enter a valid email address (e.g. example@example.com)"
  />
);

export default EmailInput;
