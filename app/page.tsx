"use client";

import { Icon } from "@iconify/react";
import { useLiff } from "@/hooks/useLiff";
import { useEffect, useState } from "react";

export default function Home() {
  const { isReady, isLoggedIn, isLoggingIn, profile, error, login } = useLiff();
  const [isLoggedOutManual, setIsLoggedOutManual] = useState(false);

  useEffect(() => {
    const isManual =
      typeof window !== "undefined" &&
      sessionStorage.getItem("manual_logout") === "true";

    setIsLoggedOutManual(isManual);

    // Auto-Redirect เข้า /home เฉพาะตอนที่ไม่ได้กดออกจากระบบเอง
    if (isReady && isLoggedIn && profile && !isManual) {
      // เช็คว่าเคยตั้งค่าข้อมูลครั้งแรกหรือยัง
      const savedProfile = typeof window !== "undefined"
        ? localStorage.getItem("user_profile_data")
        : null;

      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.setupCompleted) {
            window.location.replace("/home");
          } else {
            window.location.replace("/firsttimesetup");
          }
        } catch {
          window.location.replace("/firsttimesetup");
        }
      } else {
        window.location.replace("/firsttimesetup");
      }
    }
  }, [isReady, isLoggedIn, profile]);

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("manual_logout");
    }
    setIsLoggedOutManual(false);

    if (isLoggedIn && profile) {
      window.location.replace("/home");
    } else {
      login();
    }
  };

  // กำลังโหลด LIFF
  if (!isReady) {
    return (
      <div
        className="flex flex-col min-h-screen w-full items-center justify-center"
        style={{ background: "#f5f7f5" }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          style={{ background: "linear-gradient(135deg, #2d7a3a, #4caf50)" }}
        >
          <Icon icon="mdi:heart-pulse" className="text-white text-5xl" />
        </div>
        <p className="text-lg font-bold text-[#2d7a3a] animate-pulse">
          กำลังเตรียมระบบ...
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen w-full justify-between py-6 sm:py-10"
      style={{ background: "#f5f7f5" }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex-1 flex flex-col justify-between px-5 sm:px-6">
        
        {/* Top Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-6 sm:pt-10">
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #2d7a3a, #4caf50)",
            }}
          >
            <Icon
              icon="mdi:heart-pulse"
              className="text-white text-6xl sm:text-7xl"
            />
          </div>

          <h1
            className="text-3xl sm:text-4xl font-extrabold text-center mb-2 tracking-tight"
            style={{ color: "#1a2e1a" }}
          >
            Slow Aging
          </h1>

          <p
            className="text-xl sm:text-2xl font-bold text-center mb-1"
            style={{ color: "#2d7a3a" }}
          >
            ระบบดูแลสุขภาพผู้สูงอายุ
          </p>

          <p
            className="text-base sm:text-lg font-semibold text-center"
            style={{ color: "#6b7b6b" }}
          >
            จังหวัดมหาสารคาม
          </p>
        </div>

        {/* Action Button Section */}
        <div className="w-full pt-8 pb-4 space-y-3">
          
          {/* แสดง error ถ้ามี */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 mb-2">
              <p className="text-sm text-red-700 font-medium text-center">
                เกิดข้อผิดพลาด: {error}
              </p>
            </div>
          )}

          {/* ปุ่มเข้าสู่ระบบด้วย LINE */}
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className={`w-full flex items-center justify-center gap-3 py-4 sm:py-5 px-6 rounded-2xl shadow-lg text-xl sm:text-2xl font-extrabold transition-transform ${
              isLoggingIn
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer active:scale-[0.98]"
            }`}
            style={{ background: "#06c755", color: "white" }}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-current shrink-0">
              <path d="M12 2C6.48 2 2 5.92 2 10.72c0 3.11 1.72 5.85 4.33 7.54L5.25 22l4.72-2.52c.66.18 1.34.27 2.03.27 5.52 0 10-3.92 10-8.75C22 5.92 17.52 2 12 2z" />
            </svg>
            <span>{isLoggingIn ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วย LINE"}</span>
          </button>

          <p
            className="text-sm sm:text-base text-center mt-2 font-medium"
            style={{ color: "#7a8a7a" }}
          >
            ระบบนี้รองรับการเข้าสู่ระบบผ่าน LINE เท่านั้น
          </p>
        </div>

      </div>
    </div>
  );
}