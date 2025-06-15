import { FC, ChangeEvent } from "react";
import { SearchBarProps } from "./types";
import { SearchIcon } from "@/icons/SearchIcon";

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Поиск",
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white/20"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
        <SearchIcon className="w-5 h-5 text-white/60" />
      </div>
    </div>
  );
};

export default SearchBar;
