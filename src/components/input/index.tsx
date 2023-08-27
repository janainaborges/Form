import React, { useState } from "react";

const Input: React.FC<any> = ({
  value,
  name,
  placeholder,
  type,
  onChange,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="w-full">
      <input
        type={type}
        value={inputValue}
        name={name}
        className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
