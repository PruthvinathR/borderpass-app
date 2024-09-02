import React from "react";
import { Button, Typography } from "@mui/material";
import { BaseUIProps } from "./BaseUIProps";

interface FileUploadProps extends Omit<BaseUIProps, 'value' | 'onChange'> {
  value: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ label, value, required, options, onChange }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        onChange(file);
      }}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <Typography variant="body1" component="label" htmlFor="file-upload" style={{ marginRight: '20px' }}>
        {label} {required && "*"}
      </Typography>
      <input
        accept="*/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        required={required}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" size="small">
          Choose File
        </Button>
      </label>
      <Typography variant="body2" style={{ marginTop: '10px' }}>
        or drag and drop file here
      </Typography>
      {value && <Typography variant="body2" style={{ marginTop: '10px' }}>{value.name}</Typography>}
    </div>
  );
};

export default FileUpload;
