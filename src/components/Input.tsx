import { useField } from "@unform/core";
import { InputHTMLAttributes, useEffect, useRef } from "react";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input({ name, ...rest }: InputComponentProps) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);
  return (
    <input
      className="py-1 px-2 border-none bg-gray-200 rounded"
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}
