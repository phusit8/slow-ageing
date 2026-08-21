"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface ExerciseTask {
  id: number;
  title: string;
  reps: string;
  duration: string;
  image: string;
  completed: boolean;
  date: string;
  steps: string[];
  caution: string;
  guideImages?: string[];
}

export default function IncompleteTasksPage() {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<ExerciseTask | null>(null);

  const [incompleteTasks, setIncompleteTasks] = useState<ExerciseTask[]>([
    {
      id: 101,
      title: "เหยียดขา (เมื่อวาน)",
      reps: "10 ครั้ง",
      duration: "(ประมาณ 1 นาที)",
      date: "วัน อังคาร ที่ 14 สิงหาคม 2569",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop&q=80",
      completed: false,
      steps: [
        "1. นั่งบนเก้าอี้ที่มั่นคง หลังตรง",
        "2. เหยียดขาข้างหนึ่งตรงไปข้างหน้า",
        "3. เกร็งค้างไว้ 3-5 วินาที",
        "4. วางเท้าลงแล้วสลับทำอีกข้าง",
        "5. ทำซ้ำจนครบตามจำนวน",
      ],
      caution: "ควรทำช้าๆไม่กระตุกหากรู้สึกเป็นไปได้ให้หยุดทันที",
      guideImages: ["1. นั่งหลังตรง", "2. เหยียดขา", "3. เกร็งค้าง", "4. สลับข้าง"],
    },
    {
      id: 102,
      title: "เดินอยู่กับที่ (เมื่อวาน)",
      reps: "2 นาที",
      duration: "(ประมาณ 2 นาที)",
      date: "วัน อังคาร ที่ 14 สิงหาคม 2569",
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&auto=format&fit=crop&q=80",
      completed: false,
      steps: [
        "1. ยืนตัวตรงอย่างมั่นคง",
        "2. ก้าวเท้ายกเข่าขึ้นสลับซ้าย-ขวา ช้าๆ",
        "3. แกว่งแขนตามจังหวะอย่างเป็นธรรมชาติ",
        "4. เดินต่อเนื่องตามเวลาที่กำหนด",
      ],
      caution: "ควรทำช้าๆไม่กระตุกหากรู้สึกเป็นไปได้ให้หยุดทันที",
      guideImages: ["1. ท่ายืน", "2. ยกเข่าซ้าย", "3. สลับขวา", "4. เดินต่อเนื่อง"],
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("previous_incomplete_tasks");
      if (saved) {
        try {
          setIncompleteTasks(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load previous tasks:", e);
        }
      }
    }
  }, []);

  const handleToggleComplete = (taskId: number) => {
    const updated = incompleteTasks.map((t) =>
      t.id === taskId ? { ...t, completed: true } : t
    );
    setIncompleteTasks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("previous_incomplete_tasks", JSON.stringify(updated));
    }
    setSelectedTask(null);
  };

  const pendingList = incompleteTasks.filter((t) => !t.completed);

  // =========================================================================
  // VIEW: หน้ารายละเอียดวิธีทำท่า (ขยายตามจอ iPad / Tablet)
  // =========================================================================
  if (selectedTask) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white justify-between">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex-1 flex flex-col px-5 sm:px-8 pt-6 sm:pt-10 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6 sm:mb-8">
            <button
              onClick={() => setSelectedTask(null)}
              className="p-2 -ml-2 text-black cursor-pointer hover:bg-stone-100 rounded-xl transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="text-3xl sm:text-4xl" />
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center flex-1 pr-8 sm:pr-10 text-black">
              วิธีทำท่า {selectedTask.title.replace(" (เมื่อวาน)", "")}
            </h1>
          </div>

          {/* Guide Video / Image */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 bg-stone-100 border border-stone-200 shadow-xs">
            <img
              src={selectedTask.image}
              alt={selectedTask.title}
              className="w-full h-56 sm:h-72 md:h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center text-stone-700 shadow-md">
                <Icon icon="mdi:play" className="text-3xl sm:text-5xl ml-1 text-stone-700" />
              </div>
            </div>

            {selectedTask.guideImages && (
              <div className="absolute top-3 inset-x-3 flex justify-between gap-1.5 text-xs sm:text-sm text-stone-700 font-medium">
                {selectedTask.guideImages.map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-white/85 backdrop-blur-xs px-2 py-1 rounded-lg shadow-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              {selectedTask.title}
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              ทำ {selectedTask.reps}
            </p>
            <p className="text-base sm:text-lg text-stone-600">
              {selectedTask.duration}
            </p>
          </div>

          {/* วิธีทำ */}
          <div className="space-y-3 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              วิธีทำ
            </h3>
            <div className="space-y-2 text-base sm:text-lg md:text-xl text-stone-800 leading-relaxed font-normal">
              {selectedTask.steps.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>

          {/* ข้อควรระวัง */}
          <p className="text-sm sm:text-base md:text-lg text-stone-600 mb-8 leading-relaxed">
            {selectedTask.caution}
          </p>

          {/* ปุ่มทำเสร็จแล้ว */}
          <div className="mt-auto pt-2">
            <button
              onClick={() => handleToggleComplete(selectedTask.id)}
              className="w-full flex items-center justify-center gap-2 py-4 sm:py-5 rounded-2xl font-bold text-white text-xl sm:text-2xl cursor-pointer active:scale-[0.98] transition-transform shadow-md"
              style={{ background: "#2d7a3a" }}
            >
              <Icon icon="mdi:check" className="text-2xl sm:text-3xl" />
              <span>ทำเสร็จแล้ว</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: หน้ารายการกิจกรรมที่ยังไม่เสร็จ (ขยายตามจอ iPad / Tablet)
  // =========================================================================
  return (
    <div className="flex flex-col min-h-screen w-full bg-white justify-between">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex-1 flex flex-col justify-between px-5 sm:px-8 pt-6 sm:pt-10 pb-8">
        <div>
          {/* Header */}
          <div className="relative flex items-center justify-center mb-6 sm:mb-8">
            <button
              onClick={() => router.push("/tasks")}
              className="absolute left-0 p-2 -ml-2 text-black cursor-pointer hover:bg-stone-100 rounded-xl transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="text-3xl sm:text-4xl" />
            </button>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                กิจกรรมที่ยังไม่เสร็จ
              </h1>
              <p className="text-base sm:text-lg text-stone-800 mt-1">
                ภารกิจของวันก่อนหน้าที่ทำไม่ครบ
              </p>
            </div>
          </div>

          {/* Task Cards List */}
          {pendingList.length > 0 ? (
            <div className="space-y-3.5 sm:space-y-4">
              {pendingList.map((task, idx) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200 bg-white cursor-pointer active:scale-[0.99] hover:border-red-300 transition-all shadow-xs"
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold shrink-0 shadow-xs"
                    style={{ background: "#d32f2f" }}
                  >
                    {idx + 1}
                  </div>

                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shrink-0 border border-stone-100"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
                      {task.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                      {task.date}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-black mt-0.5">
                      {task.reps} <span className="text-sm sm:text-base font-normal text-stone-600">{task.duration}</span>
                    </p>
                  </div>

                  <Icon icon="mdi:chevron-right" className="text-3xl text-stone-400 shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20 space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Icon icon="mdi:check-circle" className="text-4xl sm:text-5xl" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                ไม่มีกิจกรรมค้างแล้ว
              </h3>
              <p className="text-base sm:text-lg text-stone-500">
                ท่านทำภารกิจย้อนหลังครบถ้วนแล้ว
              </p>
            </div>
          )}
        </div>

        {/* ปุ่มกลับสู่ภารกิจวันนี้ */}
        <div className="pt-6 sm:pt-8">
          <button
            onClick={() => router.push("/tasks")}
            className="w-full py-4 sm:py-5 rounded-2xl font-bold text-white text-xl sm:text-2xl cursor-pointer active:scale-[0.98] transition-transform shadow-md"
            style={{ background: "#2d7a3a" }}
          >
            กลับสู่ภารกิจวันนี้
          </button>
        </div>
      </div>
    </div>
  );
}
