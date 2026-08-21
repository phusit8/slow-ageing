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

    // ทำการ Auto-Redirect เข้า /home เฉพาะตอนที่ผู้ใช้ไม่ได้กดออกจากระบบเอง
    if (isReady && isLoggedIn && profile && !isManual) {
      window.location.replace("/home");
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

  return (
    <div
      className="flex flex-col min-h-screen w-full justify-between"
      style={{ background: "#f5f7f5" }}
    >
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 pt-8 sm:pt-12">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
            style={{
              background: "linear-gradient(135deg,#2d7a3a,#4caf50)",
            }}
          >
            <Icon
              icon="mdi:heart-pulse"
              style={{ color: "white", fontSize: "60px" }}
            />
          </div>
          <h1
            className="text-3xl font-bold text-center mb-1"
            style={{ color: "#1a2e1a" }}
          >
            Slow Aging
          </h1>
          <p
            className="text-base text-center mb-2"
            style={{ color: "#6b7b6b" }}
          >
            ระบบดูแลสุขภาพผู้สูงอายุ
          </p>
          <p className="text-sm" style={{ color: "#9aada9" }}>
            จังหวัดมหาสารคาม
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 sm:pb-12 pt-6 w-full max-w-md sm:max-w-lg mx-auto">
        {/* แสดง Error หากเกิดปัญหาเชื่อมต่อ LIFF */}
        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm text-center">
            <p className="font-semibold mb-1">เกิดข้อผิดพลาดในการเชื่อมต่อ LINE</p>
            <p className="text-red-500 break-all">{error}</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={!isReady || isLoggingIn}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl shadow-lg text-lg font-bold transition-transform ${
            !isReady || isLoggingIn
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer active:scale-[0.98]"
          }`}
          style={{ background: "#06c755", color: "white" }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
            <path d="M12 2C6.48 2 2 5.92 2 10.72c0 3.11 1.72 5.85 4.33 7.54L5.25 22l4.72-2.52c.66.18 1.34.27 2.03.27 5.52 0 10-3.92 10-8.75C22 5.92 17.52 2 12 2z" />
          </svg>
          {!isReady ? (
            <span>กำลังเตรียมระบบ LINE...</span>
          ) : isLoggingIn ? (
            <span>กำลังเข้าสู่ระบบ...</span>
          ) : (
            <span>เข้าสู่ระบบด้วย LINE</span>
          )}
        </button>

        <p className="text-sm text-center mt-3" style={{ color: "#9aada9" }}>
          ระบบนี้รองรับการเข้าสู่ระบบผ่าน LINE เท่านั้น
        </p>
      </div>
    </div>
  );
}