"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

// Mock data สำหรับกราฟรายเดือน (สิงหาคม 2569)
const DAILY_DATA = [
  85, 70, 100, 60, 90, 75, 80, 100, 65, 50,
  80, 90, 75, 100, 70, 85, 60, 95, 80, 70,
  100, 75, 85, 90, 65, 100, 80, 70, 95, 85,
];

// Mock data สำหรับกราฟรายปี (12 เดือน)
const MONTHLY_DATA = [
  { month: "ม.ค.", value: 72 },
  { month: "ก.พ.", value: 68 },
  { month: "มี.ค.", value: 75 },
  { month: "เม.ย.", value: 80 },
  { month: "พ.ค.", value: 70 },
  { month: "มิ.ย.", value: 78 },
  { month: "ก.ค.", value: 86 },
  { month: "ส.ค.", value: 78 },
  { month: "ก.ย.", value: 74 },
  { month: "ต.ค.", value: 72 },
  { month: "พ.ย.", value: 76 },
  { month: "ธ.ค.", value: 70 },
];

export default function ProgressPage() {
  const router = useRouter();

  const overallPercent = 78;
  const daysCompleted = 24;
  const totalDays = 31;
  const bestMonth = "กรกฎาคม (86%)";

  const avgMonthly = Math.round(DAILY_DATA.reduce((a, b) => a + b, 0) / DAILY_DATA.length);
  const maxDaily = Math.max(...DAILY_DATA);

  // สถิติ
  const statsDone = 24;
  const statsPartial = 4;
  const statsMissed = 3;

  // Streak
  const currentStreak = 7;
  const longestStreak = 24;

  return (
    <div className="flex flex-col min-h-screen w-full" style={{ background: "#f5f7f5" }}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex-1 flex flex-col px-5 pt-5 pb-8">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-5">
          <button
            onClick={() => router.push("/home")}
            className="absolute left-0 p-1 -ml-1 text-black cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <h1 className="text-xl font-bold text-black">ความก้าวหน้า</h1>
        </div>

        {/* =========================================================
         * การ์ดที่ 1: ความสำเร็จโดยรวม (Donut + สถิติ)
         * ========================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80 mb-3.5">
          <h3 className="text-base font-bold text-black mb-3">ความสำเร็จโดยรวม</h3>
          <div className="flex items-center gap-5">
            {/* Donut SVG */}
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#e2f5e8" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="38" fill="transparent"
                  stroke="#2d7a3a" strokeWidth="10"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 * (1 - overallPercent / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-extrabold text-[#1a2e1a]">
                  {overallPercent}<span className="text-sm">%</span>
                </span>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-black">
                ทำได้ {daysCompleted} วัน
              </p>
              <p className="text-sm text-stone-500 font-medium">
                จาก {totalDays} วัน
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
         * การ์ดที่ 2: กราฟรายเดือน (Bar Chart)
         * ========================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80 mb-3.5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-black">กราฟรายเดือน</h3>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Icon icon="mdi:calendar-outline" className="text-sm" />
              สิงหาคม 2569
            </span>
          </div>

          {/* Y-axis labels + Bars */}
          <div className="flex gap-1.5">
            {/* Y labels */}
            <div className="flex flex-col justify-between text-[10px] text-stone-400 font-medium pr-1 py-0.5" style={{ height: 120 }}>
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            {/* Bars */}
            <div className="flex-1 flex items-end gap-[2px]" style={{ height: 120 }}>
              {DAILY_DATA.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                  <div
                    className="w-full rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${val}%`,
                      background: val === maxDaily ? "#1a5c28" : "#2d7a3a",
                      opacity: val >= 80 ? 1 : 0.7,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X labels */}
          <div className="flex justify-between ml-8 mt-1">
            <span className="text-[10px] text-stone-400">1</span>
            <span className="text-[10px] text-stone-400">5</span>
            <span className="text-[10px] text-stone-400">10</span>
            <span className="text-[10px] text-stone-400">15</span>
            <span className="text-[10px] text-stone-400">20</span>
            <span className="text-[10px] text-stone-400">25</span>
            <span className="text-[10px] text-stone-400">30</span>
          </div>

          {/* ค่าเฉลี่ย */}
          <div className="flex items-center gap-1.5 mt-2.5 px-3 py-2 bg-emerald-50 rounded-xl">
            <Icon icon="mdi:chart-line" className="text-base text-[#2d7a3a]" />
            <span className="text-xs font-semibold text-[#2d7a3a]">
              ค่าเฉลี่ยความสำเร็จของเดือนนี้: {avgMonthly}%
            </span>
          </div>
        </div>

        {/* =========================================================
         * การ์ดที่ 3: กราฟรายปี (Bar Chart)
         * ========================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80 mb-3.5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-black">กราฟรายปี</h3>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Icon icon="mdi:calendar-outline" className="text-sm" />
              2569
            </span>
          </div>

          {/* Y-axis labels + Bars */}
          <div className="flex gap-1.5">
            <div className="flex flex-col justify-between text-[10px] text-stone-400 font-medium pr-1 py-0.5" style={{ height: 120 }}>
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="flex-1 flex items-end gap-1" style={{ height: 120 }}>
              {MONTHLY_DATA.map((m, idx) => {
                const isBest = m.value === Math.max(...MONTHLY_DATA.map((x) => x.value));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${m.value}%`,
                        background: isBest ? "#1a5c28" : "#2d7a3a",
                        opacity: m.value >= 75 ? 1 : 0.7,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* X labels เดือน */}
          <div className="flex ml-8 mt-1">
            {MONTHLY_DATA.map((m, idx) => (
              <div key={idx} className="flex-1 text-center text-[9px] text-stone-400">
                {m.month}
              </div>
            ))}
          </div>

          {/* เดือนที่ดีที่สุด */}
          <div className="flex items-center gap-1.5 mt-2.5 px-3 py-2 bg-amber-50 rounded-xl">
            <span className="text-sm">⭐</span>
            <span className="text-xs font-semibold text-amber-700">
              เดือนที่ดีที่สุด: {bestMonth}
            </span>
          </div>
        </div>

        {/* =========================================================
         * การ์ดที่ 4: สถิติของคุณ
         * ========================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80 mb-3.5">
          <h3 className="text-base font-bold text-black mb-3">สถิติของคุณ</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 py-2">
              <Icon icon="mdi:check-circle-outline" className="text-2xl text-[#2d7a3a]" />
              <span className="text-2xl font-extrabold text-[#2d7a3a]">{statsDone}</span>
              <span className="text-xs text-stone-500 font-medium text-center leading-tight">
                วันที่ทำครบ
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <Icon icon="mdi:circle-half-full" className="text-2xl text-amber-500" />
              <span className="text-2xl font-extrabold text-amber-500">{statsPartial}</span>
              <span className="text-xs text-stone-500 font-medium text-center leading-tight">
                วันที่ทำบางส่วน
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <Icon icon="mdi:close-circle-outline" className="text-2xl text-stone-400" />
              <span className="text-2xl font-extrabold text-stone-400">{statsMissed}</span>
              <span className="text-xs text-stone-500 font-medium text-center leading-tight">
                วันที่ไม่ได้ทำ
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
         * การ์ดที่ 5: สถิติการทำต่อเนื่อง (Streak)
         * ========================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200/80">
          <h3 className="text-base font-bold text-black mb-3">สถิติการทำต่อเนื่อง</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center py-2">
              <p className="text-xs text-stone-500 font-medium mb-1">ทำต่อเนื่องตอนนี้</p>
              <p className="text-3xl font-extrabold text-[#2d7a3a]">{currentStreak}</p>
              <p className="text-xs text-stone-500 font-medium">วัน</p>
            </div>
            <div className="text-center py-2">
              <p className="text-xs text-stone-500 font-medium mb-1">ทำต่อเนื่องสูงสุด</p>
              <p className="text-3xl font-extrabold text-[#2d7a3a]">{longestStreak}</p>
              <p className="text-xs text-stone-500 font-medium">วัน</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
