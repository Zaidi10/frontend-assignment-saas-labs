import { useCallback, useState } from "react";
import "./Dropdown.css";

type DropdownData = {
  options: number[];
  onSelect: (option: number) => void;
};

function Dropdown(props: DropdownData) {
  const { options, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleMouseEnter = useCallback(() => setIsOpen(true), []);
  const handleMouseLeave = useCallback(() => setIsOpen(false), []);

  const onOptionsSelect = useCallback(
    (option: number) => {
      setSelectedOption(option);
      onSelect && onSelect(option);
    },
    [onSelect]
  );

  if (!options) return;

  return (
    <div
      className="dropdown-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        aria-label="Select an option"
        data-testid={"open-modal"}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <div
          id="dropdown-menu"
          className="dropdown-menu"
          role="menu"
          aria-labelledby="dropdown-button"
        >
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => onOptionsSelect(option)}
                className={`dropdown-item ${
                  selectedOption === option ? "active" : ""
                }`}
                role="menuitem"
                tabIndex={0}
                data-testid={`option-${option}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
