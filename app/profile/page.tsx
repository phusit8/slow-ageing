"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function ProfilePage() {
  const router = useRouter();

  const [userName, setUserName] = useState("คุณยายสมศรี ใจดี");
  const [userPicture, setUserPicture] = useState("");
  const [userId, setUserId] = useState("1234567890");

  // ข้อมูลส่วนตัว
  const [profileData, setProfileData] = useState({
    village: "ชุมชนบ้านสุขใจ",
    birthday: "15 พฤษภาคม 2490",
    age: "77 ปี",
    gender: "หญิง",
    height: "158 ซม.",
    weight: "58 กก.",
    disease: "ความดันโลหิตสูง",
    allergy: "ไม่มี",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("user_profile_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.profileName) setUserName(parsed.profileName);
          if (parsed.pictureUrl) setUserPicture(parsed.pictureUrl);
          if (parsed.userId) setUserId(parsed.userId);
          setProfileData((prev) => ({
            ...prev,
            village: parsed.profileVillage || prev.village,
            birthday: parsed.birthday || prev.birthday,
            age: parsed.age || prev.age,
            gender: parsed.gender || prev.gender,
            height: parsed.height ? `${parsed.height} ซม.` : prev.height,
            weight: parsed.weight ? `${parsed.weight} กก.` : prev.weight,
            disease: parsed.disease || prev.disease,
            allergy: parsed.allergy || prev.allergy,
          }));
        } catch (e) {
          console.error("Failed to parse profile:", e);
        }
      }
    }
  }, []);

  // ดึงตัวอักษรย่อจากชื่อ
  const initials = userName
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2);

  const infoRows = [
    { icon: "mdi:map-marker-outline", label: "ชุมชน", value: profileData.village },
    { icon: "mdi:cake-variant-outline", label: "วันเกิด", value: profileData.birthday },
    { icon: "mdi:calendar-account-outline", label: "อายุ", value: profileData.age },
    { icon: "mdi:gender-female", label: "เพศ", value: profileData.gender },
    { icon: "mdi:human-male-height", label: "ส่วนสูง", value: profileData.height },
    { icon: "mdi:weight-kilogram", label: "น้ำหนัก", value: profileData.weight },
    { icon: "mdi:hospital-box-outline", label: "โรคประจำตัว", value: profileData.disease },
    { icon: "mdi:pill", label: "การแพ้ยา", value: profileData.allergy },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex-1 flex flex-col px-5 pt-5 pb-6">
        
        {/* Header */}
        <div className="relative flex items-center justify-center mb-5">
          <button
            onClick={() => router.push("/home")}
            className="absolute left-0 p-1 -ml-1 text-black cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <h1 className="text-xl font-bold text-black">ข้อมูลส่วนตัว</h1>
        </div>

        {/* Avatar + ชื่อ */}
        <div className="flex flex-col items-center mb-5">
          {userPicture ? (
            <img
              src={userPicture}
              alt={userName}
              className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md ring-4 ring-emerald-100 mb-2.5"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-2.5 shadow-md ring-4 ring-emerald-100"
              style={{ background: "#d4edda" }}
            >
              <span className="text-2xl font-extrabold text-[#2d7a3a]">
                {initials}
              </span>
            </div>
          )}
          <h2 className="text-lg font-bold text-black text-center">{userName}</h2>
          <p className="text-sm text-stone-500 font-medium">ID: {userId}</p>
        </div>

        {/* ตารางข้อมูลส่วนตัว */}
        <div className="space-y-0 border-t border-stone-100">
          {infoRows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-stone-100"
            >
              <div className="flex items-center gap-2 text-stone-600">
                <Icon icon={row.icon} className="text-lg text-[#2d7a3a] shrink-0" />
                <span className="text-base font-medium">{row.label}</span>
              </div>
              <span className="text-base font-semibold text-black text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* ปุ่มแก้ไขข้อมูล */}
        <div className="mt-auto pt-6">
          <button
            onClick={() => router.push("/profile/edit")}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-[#2d7a3a] bg-white text-[#2d7a3a] text-lg font-bold cursor-pointer active:scale-[0.98] transition-transform"
          >
            <Icon icon="mdi:pencil-outline" className="text-xl" />
            <span>แก้ไขข้อมูลส่วนตัว</span>
          </button>
        </div>

      </div>
    </div>
  );
}
