"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import CustomSelect from "@/components/CustomSelect";
import { useLiff } from "@/hooks/useLiff";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile } = useLiff();

  const [profileName, setProfileName] = useState("");
  const [profileVillage, setProfileVillage] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("user_profile_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.profileName) setProfileName(parsed.profileName);
          if (parsed.profileVillage) setProfileVillage(parsed.profileVillage);
          if (parsed.birthday) setBirthday(parsed.birthday);
          if (parsed.gender) setGender(parsed.gender);
          if (parsed.height) setHeight(parsed.height);
          if (parsed.weight) setWeight(parsed.weight);
          if (parsed.disease) setDisease(parsed.disease);
          if (parsed.allergy) setAllergy(parsed.allergy);
        } catch (e) {
          console.error("Failed to load profile:", e);
        }
      }
    }
  }, []);

  const canSave = profileName.trim().length > 0 && profileVillage.trim().length > 0;

  const handleSave = () => {
    if (!canSave || isSaving) return;
    setIsSaving(true);

    try {
      const existing = localStorage.getItem("user_profile_data");
      const prev = existing ? JSON.parse(existing) : {};

      const userData = {
        ...prev,
        profileName: profileName.trim(),
        profileVillage: profileVillage.trim(),
        birthday: birthday.trim(),
        gender: gender.trim(),
        height: height.trim(),
        weight: weight.trim(),
        disease: disease.trim(),
        allergy: allergy.trim(),
      };

      localStorage.setItem("user_profile_data", JSON.stringify(userData));
      router.push("/profile");
    } catch (error) {
      console.error("Save error:", error);
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex-1 flex flex-col px-5 pt-5 pb-6">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-5">
          <button
            onClick={() => router.push("/profile")}
            className="absolute left-0 p-1 -ml-1 text-black cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <h1 className="text-xl font-bold text-black">แก้ไขข้อมูลส่วนตัว</h1>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-5">
          {profile?.pictureUrl ? (
            <img
              src={profile.pictureUrl}
              alt={profileName}
              className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md ring-4 ring-emerald-100"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-md ring-4 ring-emerald-100"
              style={{ background: "#d4edda" }}
            >
              <Icon icon="mdi:account-circle" className="text-5xl text-[#2d7a3a]" />
            </div>
          )}
        </div>

        {/* ฟอร์มแก้ไข */}
        <div className="space-y-4 flex-1">

          {/* ชื่อ-นามสกุล */}
          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
              style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
              placeholder="กรอกชื่อและนามสกุล"
            />
          </div>

          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">
              ชุมชน / หมู่บ้าน <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              value={profileVillage}
              onChange={(val) => setProfileVillage(val)}
              placeholder="- เลือกชุมชน -"
              options={[
                { label: "ชุมชนบ้านสุขใจ", value: "ชุมชนบ้านสุขใจ" },
                { label: "ชุมชนรักษ์ป่า", value: "ชุมชนรักษ์ป่า" },
                { label: "ชุมชนพัฒนา", value: "ชุมชนพัฒนา" },
                { label: "ชุมชนมิตรภาพ", value: "ชุมชนมิตรภาพ" },
              ]}
            />
          </div>

          {/* วันเกิด */}
          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">วันเกิด</label>
            <input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
              style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
              placeholder="เช่น 15 พฤษภาคม 2490"
            />
          </div>

          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">เพศ</label>
            <CustomSelect
              value={gender}
              onChange={(val) => setGender(val)}
              placeholder="- เลือกเพศ -"
              options={[
                { label: "ชาย", value: "ชาย" },
                { label: "หญิง", value: "หญิง" },
              ]}
            />
          </div>

          {/* ส่วนสูง + น้ำหนัก (แถวเดียวกัน) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">ส่วนสูง (ซม.)</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
                style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
                placeholder="158"
              />
            </div>
            <div>
              <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">น้ำหนัก (กก.)</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
                style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
                placeholder="58"
              />
            </div>
          </div>

          {/* โรคประจำตัว */}
          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">โรคประจำตัว</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
              style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
              placeholder="เช่น ความดันโลหิตสูง หรือ ไม่มี"
            />
          </div>

          {/* การแพ้ยา */}
          <div>
            <label className="text-base font-bold text-[#1a2e1a] block mb-1.5">การแพ้ยา</label>
            <input
              type="text"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] font-medium"
              style={{ borderColor: "#d1ded1", background: "#f9fbf9", color: "#1a2e1a" }}
              placeholder="เช่น แอสไพริน หรือ ไม่มี"
            />
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="pt-5">
          <button
            onClick={handleSave}
            disabled={!canSave || isSaving}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-lg transition-all shadow-md ${
              canSave && !isSaving
                ? "cursor-pointer active:scale-[0.98] hover:opacity-95"
                : "cursor-not-allowed opacity-50"
            }`}
            style={{ background: "#2d7a3a" }}
          >
            <Icon icon="mdi:check" className="text-xl" />
            <span>{isSaving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
