"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "-- กรุณาเลือก --",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อกดข้างนอก
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className="relative">
      {/* ปุ่มเปิด Dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-base font-medium cursor-pointer transition-all text-left"
        style={{
          borderColor: isOpen ? "#2d7a3a" : "#d1ded1",
          background: "#f9fbf9",
          color: value ? "#1a2e1a" : "#8c9b8c",
          boxShadow: isOpen ? "0 0 0 3px rgba(45, 122, 58, 0.15)" : "none",
        }}
      >
        <span className={value ? "text-[#1a2e1a]" : "text-stone-400"}>
          {selectedLabel || placeholder}
        </span>
        <Icon
          icon="mdi:chevron-down"
          className="text-2xl text-stone-500 shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden"
          style={{ maxHeight: 240, overflowY: "auto" }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-left cursor-pointer transition-colors hover:bg-emerald-50"
                style={{
                  background: isSelected ? "#eef7ef" : "transparent",
                  color: isSelected ? "#2d7a3a" : "#1a2e1a",
                }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Icon icon="mdi:check" className="text-xl text-[#2d7a3a] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
