"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import CustomSelect from "@/components/CustomSelect";
import { useLiff } from "@/hooks/useLiff";

export default function FirstTimeSetupPage() {
  const router = useRouter();
  const { profile } = useLiff();

  const [profileName, setProfileName] = useState("");
  const [profileVillage, setProfileVillage] = useState("");
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile?.displayName && !profileName) {
      setProfileName(profile.displayName);
    }
  }, [profile, profileName]);

  const canSubmit =
    profileName.trim().length > 0 &&
    profileVillage.trim().length > 0 &&
    isAcceptedTerms;

  const handleComplete = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const userData = {
        userId: profile?.userId || "U_MOCK_USER",
        profileName: profileName.trim(),
        profileVillage: profileVillage.trim(),
        pictureUrl: profile?.pictureUrl || "",
        setupCompleted: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("user_profile_data", JSON.stringify(userData));
      }

      router.push("/home");
    } catch (error) {
      console.error("Setup error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full justify-between"
      style={{ background: "#f5f7f5" }}
    >
      <div className="w-full flex flex-col justify-between flex-1">
        
        <div>
          {/* Header Banner สีเขียว เต็มหน้าจอ (Full Width) */}
          <div
            className="w-full flex flex-col items-center px-6 pt-12 pb-10 sm:pt-14 sm:pb-12 text-white shadow-xs"
            style={{
              background: "linear-gradient(135deg, #2d7a3a, #4caf50)",
            }}
          >
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center">
              {profile?.pictureUrl ? (
                <img
                  src={profile.pictureUrl}
                  alt={profileName}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 aspect-square rounded-3xl mb-3 object-cover border-4 border-white shadow-md ring-4 ring-emerald-700/20"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 aspect-square rounded-3xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-inner ring-4 ring-white/20">
                  <Icon
                    icon="mdi:account-circle"
                    className="text-white text-7xl sm:text-8xl md:text-9xl"
                  />
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center tracking-tight">
                ตั้งค่าข้อมูลส่วนตัว
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-center mt-1.5 text-emerald-50 font-medium">
                กรอกข้อมูลของท่านเพื่อเริ่มต้นใช้งานระบบ
              </p>
            </div>
          </div>

          {/* ฟอร์มกรอกข้อมูล แบบเต็มจอ (ไม่เป็นการ์ด) */}
          <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-8 md:px-10 py-6 sm:py-8 space-y-6 sm:space-y-7">
            
            {/* กล่องช่องกรอกข้อมูล */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-200/80 space-y-5 sm:space-y-6">
              <div>
                <label
                  className="text-lg sm:text-xl md:text-2xl font-bold block mb-2"
                  style={{ color: "#1a2e1a" }}
                >
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 text-lg sm:text-xl md:text-2xl focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] transition-all font-medium"
                  style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
                  placeholder="กรอกชื่อและนามสกุล"
                />
              </div>

              <div>
                <label
                  className="text-lg sm:text-xl md:text-2xl font-bold block mb-2"
                  style={{ color: "#1a2e1a" }}
                >
                  ชุมชน / หมู่บ้าน <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  value={profileVillage}
                  onChange={(val) => setProfileVillage(val)}
                  placeholder="- กรุณาเลือกชุมชน/หมู่บ้าน -"
                  options={[
                    { label: "ชุมชนบ้านสุขใจ", value: "ชุมชนบ้านสุขใจ" },
                    { label: "ชุมชนรักษ์ป่า", value: "ชุมชนรักษ์ป่า" },
                    { label: "ชุมชนพัฒนา", value: "ชุมชนพัฒนา" },
                    { label: "ชุมชนมิตรภาพ", value: "ชุมชนมิตรภาพ" },
                  ]}
                />
              </div>
            </div>

            {/* Checkbox ยอมรับเงื่อนไข */}
            <div>
              <label
                htmlFor="termsCheckbox"
                className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs cursor-pointer select-none hover:bg-emerald-50/40 transition-colors"
              >
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={isAcceptedTerms}
                  onChange={(e) => setIsAcceptedTerms(e.target.checked)}
                  className="mt-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 border-stone-400 cursor-pointer shrink-0"
                  style={{ accentColor: "#2d7a3a" }}
                />
                <span className="text-base sm:text-lg md:text-xl text-stone-800 leading-relaxed font-medium">
                  ข้าพเจ้าได้อ่านและยินยอมรับ{" "}
                  <span
                    className="underline font-bold"
                    style={{ color: "#2d7a3a" }}
                  >
                    เงื่อนไขและข้อตกลง
                  </span>{" "}
                  ในการเข้าร่วมโครงการ
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ปุ่มกดยืนยันด้านล่าง */}
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-8 md:px-10 pb-8 sm:pb-12 pt-2">
          <button
            onClick={handleComplete}
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-white text-lg sm:text-xl md:text-2xl transition-all shadow-md ${
              canSubmit && !isSubmitting
                ? "cursor-pointer active:scale-[0.98] hover:opacity-95 shadow-emerald-900/20"
                : "cursor-not-allowed opacity-50"
            }`}
            style={{ background: "#2d7a3a" }}
          >
            {isSubmitting ? "กำลังบันทึกข้อมูล..." : "เริ่มต้นใช้งาน"}
          </button>
        </div>

      </div>
    </div>
  );
}
