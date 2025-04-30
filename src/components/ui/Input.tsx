import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      <input
        {...props}
        className={`block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none peer ${className}`}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="absolute text-white/80 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent backdrop-blur-md px-2 peer-focus:px-2 peer-focus:text-black peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
      >
        {label}
      </label>
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
