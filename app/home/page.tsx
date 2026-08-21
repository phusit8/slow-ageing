"use client";

import { Icon } from "@iconify/react";
import { useLiff } from "@/hooks/useLiff";

export default function HomePage() {
  const { isReady, isLoggedIn, isInClient, profile, error, logout, closeWindow } =
    useLiff();

  // กำลังเช็คสถานะการเข้าสู่ระบบ
  if (!isReady) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-6"
        style={{ background: "#f5f7f5" }}
      >
        <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
        <p className="text-base font-medium" style={{ color: "#2d7a3a" }}>
          กำลังตรวจสอบสถานะการเข้าสู่ระบบ...
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-xs mt-4 underline text-stone-400 hover:text-stone-600 cursor-pointer"
        >
          หากรอนานเกินไป กดที่นี่เพื่อกลับหน้าแรก
        </button>
      </div>
    );
  }

  // เช็คแล้วแต่ไม่ได้ login หรือเกิด Error
  if (!isLoggedIn || !profile) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: "#f5f7f5" }}
      >
        <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600 mb-2">
          <Icon icon="mdi:alert-circle-outline" className="text-4xl" />
        </div>
        <h2 className="text-xl font-bold text-stone-800">
          ยังไม่ได้เข้าสู่ระบบ
        </h2>
        {error && (
          <p className="text-xs text-red-500 max-w-xs bg-red-50 p-3 rounded-xl border border-red-200">
            {error}
          </p>
        )}
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3.5 rounded-2xl font-bold text-white shadow-md cursor-pointer active:scale-95 transition-transform mt-2"
          style={{ background: "#06c755" }}
        >
          เข้าสู่ระบบด้วย LINE
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ background: "#f5f7f5" }}
    >
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex-1 flex flex-col px-6 sm:px-8 pt-10 pb-8">
        {/* Badge ยืนยันว่า login สำเร็จ */}
        <div
          className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl mb-6 w-full shadow-xs"
          style={{ background: "#e6f7ea" }}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:check-circle"
              style={{ color: "#06c755", fontSize: "20px" }}
            />
            <span className="text-sm font-medium" style={{ color: "#1a2e1a" }}>
              เข้าสู่ระบบด้วย LINE สำเร็จ
            </span>
          </div>

          {isInClient && (
            <span className="text-[11px] font-semibold bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-md">
              LINE In-App
            </span>
          )}
        </div>

        {/* การ์ดโปรไฟล์ */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center mb-6 border border-emerald-50">
          {profile.pictureUrl ? (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="w-24 h-24 rounded-full mb-4 object-cover shadow-sm ring-4 ring-emerald-100"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full mb-4 flex items-center justify-center shadow-sm"
              style={{ background: "#4caf50" }}
            >
              <Icon
                icon="mdi:account"
                style={{ color: "white", fontSize: "48px" }}
              />
            </div>
          )}
          <h2 className="text-xl font-bold" style={{ color: "#1a2e1a" }}>
            {profile.displayName}
          </h2>
          {profile.statusMessage && (
            <p className="text-sm mt-1 text-center" style={{ color: "#6b7b6b" }}>
              {profile.statusMessage}
            </p>
          )}
        </div>

        {/* ข้อมูลสำหรับ debug */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-emerald-50">
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "#9aada9" }}
          >
            ข้อมูลสำหรับทดสอบ (Debug)
          </p>
          <div className="text-sm space-y-1.5" style={{ color: "#1a2e1a" }}>
            <p className="flex justify-between items-center text-xs sm:text-sm">
              <span style={{ color: "#6b7b6b" }}>LINE User ID:</span>
              <span className="font-mono text-xs bg-stone-100 px-2 py-0.5 rounded max-w-[200px] truncate">
                {profile.userId}
              </span>
            </p>
            <p className="flex justify-between items-center text-xs sm:text-sm">
              <span style={{ color: "#6b7b6b" }}>Display Name:</span>
              <span className="font-medium">{profile.displayName}</span>
            </p>
          </div>
        </div>

        {error && (
          <p
            className="text-sm text-center mb-4 p-3 bg-red-50 rounded-xl text-red-600"
          >
            {error}
          </p>
        )}

        <div className="mt-auto space-y-2.5">
          {isInClient && (
            <button
              onClick={closeWindow}
              className="w-full py-3.5 rounded-2xl font-bold text-white cursor-pointer active:scale-[0.98] transition-transform shadow-md"
              style={{ background: "#2d7a3a" }}
            >
              ปิดหน้าต่าง LINE
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-2xl font-bold border cursor-pointer active:scale-[0.98] transition-transform text-sm"
            style={{
              borderColor: "#e53e3e",
              color: "#e53e3e",
              background: "white",
            }}
          >
            ออกจากระบบ (ทดสอบเข้าสู่ระบบใหม่)
          </button>
        </div>
      </div>
    </div>
  );
}