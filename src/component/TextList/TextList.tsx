import React, { useState } from "react";

type AutocompleteProps = {
  options: string[];
  placeholder: string;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setDropdownVisible(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(!!filteredOptions.length)}
        className="w-full border rounded px-2 py-1"
        placeholder={placeholder}
      />
      {isDropdownVisible && (
        <ul className="absolute w-full border rounded bg-white shadow-md max-h-40 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
