import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  errorMessage?: string;
  name: string;
  register: UseFormRegister<any>;
}

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { className, register, error, errorMessage, ...rest } = props;

  return (
    <React.Fragment>
      <input
        required
        {...rest}
        {...register(props.name)}
        className={`focus-none w-full rounded-md bg-transparent bg-white px-4 py-3 text-base shadow-xl outline-none ${className} ${error ? "border-2 border-red-500" : ""}`}
      />
      {error && (
        <p className="text-sm font-bold text-red-500">
          {errorMessage || "Error"}
        </p>
      )}
    </React.Fragment>
  );
};
