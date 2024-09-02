

export interface BaseUIProps {
    label: string;
    value: string;
    required?: boolean;
    options: string[];
    onChange: (value: string) => void;
}