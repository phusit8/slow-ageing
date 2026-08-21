"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useLiff } from "@/hooks/useLiff";

export default function HomePage() {
  const router = useRouter();
  const { isReady, isLoggedIn, profile, error, logout } = useLiff();

  // ยังไม่พร้อม / กำลังเช็คสถานะ login
  if (!isReady) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#f5f7f5" }}
      >
        <p style={{ color: "#6b7b6b" }}>กำลังโหลด...</p>
      </div>
    );
  }

  // เช็คแล้วแต่ไม่ได้ login -> เด้งกลับหน้าแรก
  if (!isLoggedIn || !profile) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-6"
        style={{ background: "#f5f7f5" }}
      >
        <p style={{ color: "#e53e3e" }}>ยังไม่ได้เข้าสู่ระบบ</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-2xl font-bold"
          style={{ background: "#06c755", color: "white" }}
        >
          กลับไปหน้าเข้าสู่ระบบ
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-full" style={{ background: "#f5f7f5" }}>
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex-1 flex flex-col px-6 sm:px-8 pt-10 pb-8">
        {/* Badge ยืนยันว่า login สำเร็จ */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl mb-6 w-fit"
          style={{ background: "#e6f7ea" }}
        >
          <Icon icon="mdi:check-circle" style={{ color: "#06c755", fontSize: "20px" }} />
          <span className="text-sm font-medium" style={{ color: "#1a2e1a" }}>
            เข้าสู่ระบบด้วย LINE สำเร็จ
          </span>
        </div>

        {/* การ์ดโปรไฟล์ */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center mb-6">
          {profile.pictureUrl ? (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full mb-4 flex items-center justify-center"
              style={{ background: "#4caf50" }}
            >
              <Icon icon="mdi:account" style={{ color: "white", fontSize: "48px" }} />
            </div>
          )}
          <h2 className="text-xl font-bold" style={{ color: "#1a2e1a" }}>
            {profile.displayName}
          </h2>
          {profile.statusMessage && (
            <p className="text-sm mt-1" style={{ color: "#6b7b6b" }}>
              {profile.statusMessage}
            </p>
          )}
        </div>

        {/* ข้อมูลดิบสำหรับ debug */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <p className="text-xs font-semibold mb-2" style={{ color: "#9aada9" }}>
            ข้อมูลสำหรับทดสอบ (Debug)
          </p>
          <div className="text-sm space-y-1" style={{ color: "#1a2e1a" }}>
            <p>
              <span style={{ color: "#6b7b6b" }}>LINE User ID: </span>
              {profile.userId}
            </p>
            <p>
              <span style={{ color: "#6b7b6b" }}>Display Name: </span>
              {profile.displayName}
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-center mb-4" style={{ color: "#e53e3e" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl font-bold border cursor-pointer"
          style={{ borderColor: "#e53e3e", color: "#e53e3e", background: "white" }}
        >
          ออกจากระบบ (ทดสอบใหม่)
        </button>
      </div>
    </div>
  );
}