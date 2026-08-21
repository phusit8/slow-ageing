"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useLiff } from "@/hooks/useLiff";

export default function HomePage() {
  const router = useRouter();
  const { profile } = useLiff();

  // ข้อมูลโปรไฟล์ผู้ใช้
  const [userName, setUserName] = useState("คุณยายสมศรี");
  const [userVillage, setUserVillage] = useState("ชุมชนบ้านสุขใจ");
  const [userPicture, setUserPicture] = useState(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
  );
  const [currentThaiDate, setCurrentThaiDate] = useState("");
  const [greeting, setGreeting] = useState("สวัสดีตอนเช้า");

  // ความก้าวหน้าภารกิจ
  const [completedTasksCount, setCompletedTasksCount] = useState(3);
  const totalTasks = 4;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("user_profile_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.profileName) setUserName(parsed.profileName);
          if (parsed.profileVillage) setUserVillage(parsed.profileVillage);
          if (parsed.pictureUrl) setUserPicture(parsed.pictureUrl);
        } catch (e) {
          console.error("Failed to parse saved user data:", e);
        }
      } else if (profile?.displayName) {
        setUserName(profile.displayName);
        if (profile.pictureUrl) setUserPicture(profile.pictureUrl);
      }

      const savedTasks = localStorage.getItem("exercise_tasks_data");
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          const done = parsedTasks.filter((t: { completed: boolean }) => t.completed).length;
          setCompletedTasksCount(done);
        } catch (e) {
          console.error("Failed to parse tasks data:", e);
        }
      }
    }

    const now = new Date();
    const days = [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ];
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const dayName = days[now.getDay()];
    const dateNum = now.getDate();
    const monthName = months[now.getMonth()];
    const thaiYear = now.getFullYear() + 543;

    setCurrentThaiDate(`วัน ${dayName} ที่ ${dateNum} ${monthName} ${thaiYear}`);

    const hours = now.getHours();
    if (hours < 12) {
      setGreeting("สวัสดีตอนเช้า");
    } else if (hours < 16) {
      setGreeting("สวัสดีตอนบ่าย");
    } else {
      setGreeting("สวัสดีตอนเย็น");
    }
  }, [profile]);

  const progressPercent = Math.round((completedTasksCount / totalTasks) * 100);

  return (
    <div
      className="flex flex-col min-h-screen w-full justify-start items-center py-5 sm:py-8 px-4 sm:px-6"
      style={{ background: "#f5f7f5" }}
    >
      {/* Container สัดส่วนพอดี สวยงามบนมือถือ iPad และจอใหญ่ ไม่ยืดกว้างเกินไป */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col space-y-5 sm:space-y-6 pb-12">
        
        {/* Top Header: คำทักทาย + ปุ่มโปรไฟล์ */}
        <header className="flex items-center justify-between pt-2 pb-1">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-3xl sm:text-4xl text-amber-500">
              ☀️
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "#1a2e1a" }}
            >
              {greeting}
            </h1>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white text-base font-bold shadow-sm hover:opacity-95 active:scale-95 transition-transform cursor-pointer"
            style={{ background: "#2d7a3a" }}
          >
            <Icon icon="mdi:account-circle-outline" className="text-xl" />
            <span>โปรไฟล์</span>
          </button>
        </header>

        {/* User Card: รูป + ชื่อ + ชุมชน + วันที่ */}
        <div className="flex items-center gap-4 sm:gap-5 py-2">
          <img
            src={userPicture}
            alt={userName}
            className="w-22 h-22 sm:w-26 sm:h-26 rounded-full object-cover shadow-md border-3 border-white ring-4 ring-emerald-100 flex-shrink-0"
          />
          <div className="flex flex-col space-y-0.5 sm:space-y-1">
            <h2
              className="text-2xl sm:text-3xl font-extrabold leading-tight"
              style={{ color: "#1a2e1a" }}
            >
              {userName}
            </h2>
            <div
              className="flex items-center gap-1.5 text-base sm:text-lg font-semibold"
              style={{ color: "#2d7a3a" }}
            >
              <Icon icon="mdi:map-marker-outline" className="text-xl shrink-0" />
              <span>{userVillage}</span>
            </div>
            <div
              className="flex items-center gap-1.5 text-sm sm:text-base font-medium"
              style={{ color: "#4a5d4e" }}
            >
              <Icon icon="mdi:calendar-month-outline" className="text-lg shrink-0" />
              <span>{currentThaiDate || "-"}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
         * การ์ดความก้าวหน้าวันนี้ (Progress Card) - กระจายพื้นที่สมดุล ไม่โหวง
         * ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/80">
          <h3
            className="text-lg sm:text-xl font-extrabold mb-4 text-[#1a2e1a]"
          >
            ความก้าวหน้าวันนี้
          </h3>

          <div className="flex items-center justify-between gap-4 sm:gap-6">
            
            {/* ฝั่งซ้าย: วงกลม Progress */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#e2f5e8"
                  strokeWidth="11"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#2d7a3a"
                  strokeWidth="11"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1a]"
                >
                  {progressPercent}<span className="text-base sm:text-lg">%</span>
                </span>
              </div>
            </div>

            {/* ฝั่งขวา: สถิติและปุ่ม (จัดเรียงเต็มพื้นที่พอดี) */}
            <div className="flex-1 flex flex-col justify-center space-y-2 pl-2">
              <div>
                <span className="text-lg sm:text-xl font-bold block text-[#1a2e1a] leading-tight">
                  ทำภารกิจแล้ว
                </span>
                <span className="text-base sm:text-lg font-extrabold block text-[#2d7a3a] mt-0.5">
                  {completedTasksCount} จาก {totalTasks} ท่า
                </span>
              </div>

              <button
                onClick={() => router.push("/tasks")}
                className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-white text-base font-bold shadow-md hover:opacity-95 active:scale-95 transition-transform cursor-pointer w-full sm:w-fit gap-2"
                style={{ background: "#2d7a3a" }}
              >
                <span>ดูภารกิจวันนี้</span>
                <Icon icon="mdi:chevron-right" className="text-xl" />
              </button>
            </div>

          </div>
        </div>

        {/* Action Menu Cards List */}
        <div className="space-y-3 pt-1">
          
          {/* Card 1: ภารกิจวันนี้ */}
          <div
            onClick={() => router.push("/tasks")}
            className="group flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white shadow-sm border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ background: "#eef6ff" }}
              >
                <Icon
                  icon="mdi:dumbbell"
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#0066cc" }}
                />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#1a2e1a]">
                  ภารกิจวันนี้
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  ออกกำลังกายและกิจกรรมเพื่อสุขภาพ
                </p>
              </div>
            </div>
            <Icon
              icon="mdi:chevron-right"
              className="text-2xl text-stone-400 group-hover:text-stone-800 transition-colors shrink-0 ml-2"
            />
          </div>

          {/* Card 2: ปฏิทินรายเดือน */}
          <div onClick={() => router.push("/calendar")} className="group flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white shadow-sm border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer active:scale-[0.99]">
            <div className="flex items-center gap-4">
              <div
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ background: "#f2f9ed" }}
              >
                <Icon
                  icon="mdi:calendar-month-outline"
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#68a82d" }}
                />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#1a2e1a]">
                  ปฏิทินรายเดือน
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  ดูตารางกิจกรรม
                </p>
              </div>
            </div>
            <Icon
              icon="mdi:chevron-right"
              className="text-2xl text-stone-400 group-hover:text-stone-800 transition-colors shrink-0 ml-2"
            />
          </div>

          {/* Card 3: ความก้าวหน้า */}
          <div onClick={() => router.push("/progress")} className="group flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white shadow-sm border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer active:scale-[0.99]">
            <div className="flex items-center gap-4">
              <div
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ background: "#eef6ff" }}
              >
                <Icon
                  icon="mdi:chart-box-outline"
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#0066cc" }}
                />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#1a2e1a]">
                  ความก้าวหน้า
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  ดูสถิติและความก้าวหน้าของคุณ
                </p>
              </div>
            </div>
            <Icon
              icon="mdi:chevron-right"
              className="text-2xl text-stone-400 group-hover:text-stone-800 transition-colors shrink-0 ml-2"
            />
          </div>

        </div>

      </div>
    </div>
  );
}