import { FC, useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";

interface SelectDropdownProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  icon?: React.ReactNode;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  icon,
}) => {
  const lenis = useLenis();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const selectedOptionRef = useRef<HTMLDivElement>(null);

  // Handle dropdown animations
  useEffect(() => {
    if (!dropdownRef.current || !optionsRef.current || !arrowRef.current)
      return;

    if (isDropdownOpen) {
      // Animate options appearing
      gsap.fromTo(
        optionsRef.current,
        {
          opacity: 0,
          y: -10,
          display: "none",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          display: "block",
          onComplete: () => {
            // Ensure Lenis knows about the height change
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );

      // Rotate arrow
      gsap.to(arrowRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Animate options disappearing
      gsap.to(optionsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(optionsRef.current, { display: "none" });
          // Ensure Lenis knows about the height change
          if (lenis) {
            lenis.resize();
          }
        },
      });

      // Rotate arrow back
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isDropdownOpen, lenis]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection with animation
  const handleOptionChange = (newValue: string) => {
    if (value === newValue) return;

    if (selectedOptionRef.current) {
      // Animate the selected option without changing size
      gsap.fromTo(
        selectedOptionRef.current,
        { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }

    onChange(newValue);
    setIsDropdownOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-white/60 text-sm flex items-center">
        {icon}
        {label}
      </span>
      <div ref={dropdownRef} className="relative">
        {/* Custom selected option */}
        <div
          ref={selectedOptionRef}
          className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 cursor-pointer flex justify-between items-center w-70 h-10"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsDropdownOpen(!isDropdownOpen);
            }
          }}
        >
          <div className="w-full overflow-visible">
            <span className="block text-white">{selectedOption?.label}</span>
          </div>
          <svg
            ref={arrowRef}
            className="w-5 h-5 text-white/60 ml-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {/* Dropdown options */}
        <div
          ref={optionsRef}
          className="absolute left-0 right-0 top-full bg-zinc-800 rounded-lg overflow-hidden z-20 border border-white/10 shadow-lg w-70"
          style={{ display: "none" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors ${
                value === option.value ? "bg-white/5" : ""
              } whitespace-nowrap h-10 flex items-center`}
              onClick={() => handleOptionChange(option.value)}
            >
              <span className="block truncate text-white">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;
