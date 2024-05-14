import { ChangeEvent } from "react";

interface IFormInput {
    labelText?: string;
    labelColor?: string;
    labelBg?: string;
    type?: "button" | "submit" | "reset" | "checkbox" | "radio" | "file" | "image" | "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "range" | "color" | "hidden";
    value?: string;
    onChange: (value: string) => void;
    width?: string
}

const FormInput: React.FC<IFormInput> = ({ value, onChange, labelText, labelColor, labelBg, type, width, ...rest }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={`${width ? width : 'w-full'} flex flex-col mb-4 lg:mb-2`}>
            <label className={`text-md lg:text-sm  font-semibold text-${labelColor} text-start`}>{labelText}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} {...rest} className="border border-palette-line rounded h-9 p-2" />
        </div>
    );
}

export default FormInput;