"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

// ข้อมูลปฏิทินสำหรับเดือนตัวอย่าง (สิงหาคม 2569)
// status: "done" = ทำครบ (เขียว), "partial" = ทำบางส่วน (ส้ม), "missed" = ไม่ได้ทำ (เทา), null = ยังไม่ถึง
interface DayData {
  day: number;
  status: "done" | "partial" | "missed" | null;
}

const MONTH_NAMES = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const DAY_HEADERS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

export default function CalendarPage() {
  const router = useRouter();

  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed, 7 = สิงหาคม
  const [currentYear, setCurrentYear] = useState(2569);

  // Mock data สำหรับเดือนสิงหาคม
  const calendarData: DayData[] = [
    { day: 1, status: null },
    { day: 2, status: "done" },
    { day: 3, status: null },
    { day: 4, status: null },
    { day: 5, status: null },
    { day: 6, status: "done" },
    { day: 7, status: "done" },
    { day: 8, status: "done" },
    { day: 9, status: "done" },
    { day: 10, status: null },
    { day: 11, status: null },
    { day: 12, status: null },
    { day: 13, status: null },
    { day: 14, status: null },
    { day: 15, status: "done" },
    { day: 16, status: "done" },
    { day: 17, status: null },
    { day: 18, status: null },
    { day: 19, status: null },
    { day: 20, status: "done" },
    { day: 21, status: "done" },
    { day: 22, status: null },
    { day: 23, status: "partial" },
    { day: 24, status: null },
    { day: 25, status: null },
    { day: 26, status: null },
    { day: 27, status: "done" },
    { day: 28, status: "partial" },
    { day: 29, status: "done" },
    { day: 30, status: "partial" },
    { day: 31, status: null },
  ];

  // คำนวณวันแรกของเดือนตรงกับวันอะไร (0=อา, 1=จ, ...)
  const realYear = currentYear - 543;
  const firstDayOfWeek = new Date(realYear, currentMonth, 1).getDay();

  // คำนวณจำนวนวันของเดือนก่อน (สำหรับ padding)
  const daysInPrevMonth = new Date(realYear, currentMonth, 0).getDate();

  // สถิติ
  const doneCount = calendarData.filter((d) => d.status === "done").length;
  const partialCount = calendarData.filter((d) => d.status === "partial").length;
  const missedCount = calendarData.filter((d) => d.status === "missed").length;
  const totalDays = calendarData.length;
  const consistencyPercent = Math.round(((doneCount + partialCount * 0.5) / totalDays) * 100);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // สร้าง grid array รวม padding วันของเดือนก่อน
  const gridCells: { day: number; inMonth: boolean; status: "done" | "partial" | "missed" | null }[] = [];

  // วันของเดือนก่อนหน้า (padding)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    gridCells.push({ day: daysInPrevMonth - i, inMonth: false, status: null });
  }
  // วันของเดือนนี้
  calendarData.forEach((d) => {
    gridCells.push({ day: d.day, inMonth: true, status: d.status });
  });
  // Padding วันของเดือนถัดไป
  const remainingCells = 7 - (gridCells.length % 7);
  if (remainingCells < 7) {
    for (let i = 1; i <= remainingCells; i++) {
      gridCells.push({ day: i, inMonth: false, status: null });
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex-1 flex flex-col px-5 pt-5 pb-6">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={() => router.push("/home")}
            className="absolute left-0 p-1 -ml-1 text-black cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <h1 className="text-xl font-bold text-black">ความก้าวหน้ารายเดือน</h1>
        </div>

        {/* เดือน/ปี Navigator */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={handlePrevMonth} className="p-1 cursor-pointer text-stone-600 hover:text-black">
            <Icon icon="mdi:chevron-left" className="text-2xl" />
          </button>
          <span className="text-base font-bold text-black min-w-[140px] text-center">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <button onClick={handleNextMonth} className="p-1 cursor-pointer text-stone-600 hover:text-black">
            <Icon icon="mdi:chevron-right" className="text-2xl" />
          </button>
        </div>

        {/* การ์ดความสม่ำเสมอ */}
        <div className="border border-stone-200 rounded-2xl p-4 mb-4">
          <p className="text-sm font-semibold text-stone-600 mb-1">ความสม่ำเสมอของเดือนนี้</p>
          <p className="text-3xl font-extrabold text-black mb-2">{consistencyPercent}%</p>
          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${consistencyPercent}%`, background: "#2d7a3a" }}
            />
          </div>
          <p className="text-xs text-stone-500 font-medium">
            ทำได้ {doneCount} วัน จาก {totalDays} วัน
          </p>
        </div>

        {/* ปฏิทิน */}
        <div className="mb-4">
          {/* วันในสัปดาห์ */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_HEADERS.map((d) => (
              <div key={d} className="text-center text-sm font-semibold text-stone-500 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* ตารางวันที่ */}
          <div className="grid grid-cols-7 gap-y-1.5">
            {gridCells.map((cell, idx) => {
              let bgColor = "transparent";
              let textColor = cell.inMonth ? "#1a2e1a" : "#c5c5c5";
              let fontWeight = "500";

              if (cell.inMonth && cell.status === "done") {
                bgColor = "#2d7a3a";
                textColor = "#ffffff";
                fontWeight = "700";
              } else if (cell.inMonth && cell.status === "partial") {
                bgColor = "#f59e0b";
                textColor = "#ffffff";
                fontWeight = "700";
              } else if (cell.inMonth && cell.status === "missed") {
                bgColor = "#9ca3af";
                textColor = "#ffffff";
                fontWeight = "700";
              }

              return (
                <div key={idx} className="flex items-center justify-center py-0.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                    style={{ background: bgColor, color: textColor, fontWeight }}
                  >
                    {cell.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#2d7a3a" }} />
            <span className="text-xs text-stone-600 font-medium">ทำครบ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <span className="text-xs text-stone-600 font-medium">ทำบางส่วน</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#9ca3af" }} />
            <span className="text-xs text-stone-600 font-medium">ไม่ได้ทำ</span>
          </div>
        </div>

        {/* สถิติเดือนนี้ */}
        <div className="border border-stone-200 rounded-2xl p-4">
          <h4 className="text-base font-bold text-black mb-3">สถิติเดือนนี้</h4>
          <div className="grid grid-cols-3 divide-x divide-stone-200">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-[#2d7a3a]">{doneCount}</span>
              <span className="text-xs text-stone-500 font-medium">วัน</span>
              <span className="text-xs text-stone-400 mt-0.5">ทำครบ</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-amber-500">{partialCount}</span>
              <span className="text-xs text-stone-500 font-medium">วัน</span>
              <span className="text-xs text-stone-400 mt-0.5">ทำบางส่วน</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-stone-400">{missedCount || totalDays - doneCount - partialCount}</span>
              <span className="text-xs text-stone-500 font-medium">วัน</span>
              <span className="text-xs text-stone-400 mt-0.5">ไม่ได้ทำ</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
