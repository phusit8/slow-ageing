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
  steps: string[];
  caution: string;
  guideImages?: string[];
}

export default function TasksPage() {
  const router = useRouter();

  const [currentThaiDate, setCurrentThaiDate] = useState("วัน พุธ ที่ 15 สิงหาคม 2569");
  const [selectedTask, setSelectedTask] = useState<ExerciseTask | null>(null);
  const [hasIncompletePrevious, setHasIncompletePrevious] = useState(true);

  const [tasks, setTasks] = useState<ExerciseTask[]>([
    {
      id: 1,
      title: "บริหารคอ",
      reps: "10 ครั้ง",
      duration: "(ประมาณ 1 นาที)",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80",
      completed: true,
      steps: [
        "1. นั่งหรือยืนหลังตรง ผ่อนคลายไหล่",
        "2. ค่อยๆ หมุนคอไปทางซ้ายช้าๆ",
        "3. กลับมาที่ท่ากลาง",
        "4. หมุนคอไปทางขวาช้าๆ",
        "5. ทำซ้ำจนครบตามจำนวน",
      ],
      caution: "ควรทำช้าๆไม่กระตุกหากรู้สึกเป็นไปได้ให้หยุดทันที",
      guideImages: ["1. ก้มคอ", "2. เอียงคอ", "3. หันคอ", "4. เงยหน้า"],
    },
    {
      id: 2,
      title: "ยกแขนขึ้น-ลง",
      reps: "15 ครั้ง",
      duration: "(ประมาณ 1 นาที)",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
      completed: false,
      steps: [
        "1. นั่งตัวตรง เท้าทั้งสองข้างวางราบกับพื้น",
        "2. ค่อยๆ ยกแขนทั้งสองข้างขึ้นเหนือศีรษะช้าๆ",
        "3. ค้างไว้ 2-3 วินาที พร้อมหายใจเข้า",
        "4. ผ่อนแขนลงแนบลำตัวช้าๆ พร้อมหายใจออก",
        "5. ทำซ้ำจนครบตามจำนวน",
      ],
      caution: "ควรทำช้าๆไม่กระตุกหากรู้สึกเป็นไปได้ให้หยุดทันที",
      guideImages: ["1. ท่าเตรียม", "2. ยกแขน", "3. ค้างไว้", "4. ผ่อนลง"],
    },
    {
      id: 3,
      title: "เดินอยู่กับที่",
      reps: "2 นาที",
      duration: "(ประมาณ 2 นาที)",
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
    {
      id: 4,
      title: "เหยียดขา",
      reps: "10 ครั้ง",
      duration: "(ประมาณ 1 นาที)",
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
  ]);

  useEffect(() => {
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

    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("exercise_tasks_data");
      if (savedTasks) {
        try {
          const parsed = JSON.parse(savedTasks);
          setTasks(parsed);
        } catch (e) {
          console.error("Failed to parse tasks:", e);
        }
      }

      const savedPrevious = localStorage.getItem("previous_incomplete_tasks");
      if (savedPrevious) {
        try {
          const parsedPrev = JSON.parse(savedPrevious);
          const hasUnfinished = parsedPrev.some((t: { completed: boolean }) => !t.completed);
          setHasIncompletePrevious(hasUnfinished);
        } catch (e) {
          console.error("Failed to parse previous tasks:", e);
        }
      } else {
        setHasIncompletePrevious(true);
      }
    }
  }, []);

  const handleToggleComplete = (taskId: number) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("exercise_tasks_data", JSON.stringify(updated));
    }
    setSelectedTask(null);
  };

  // =========================================================================
  // VIEW 2: หน้าจอวิธีทำท่า (Screen 2 ในรูปขวา) - ขยายตามจอ iPad / Tablet
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
              วิธีทำท่า {selectedTask.title}
            </h1>
          </div>

          {/* Guide Video / Image Banner */}
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

            {/* Guide Step Labels */}
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

          {/* Title & Info */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              {selectedTask.id}. {selectedTask.title}
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
  // VIEW 1: หน้าจอภารกิจวันนี้ (Screen 1 ในรูปซ้าย) - ขยายตามจอ iPad / Tablet
  // =========================================================================
  return (
    <div className="flex flex-col min-h-screen w-full bg-white justify-between">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex-1 flex flex-col justify-between px-5 sm:px-8 pt-6 sm:pt-10 pb-8">
        <div>
          {/* Header */}
          <div className="relative flex items-center justify-center mb-6 sm:mb-8">
            <button
              onClick={() => router.push("/home")}
              className="absolute left-0 p-2 -ml-2 text-black cursor-pointer hover:bg-stone-100 rounded-xl transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="text-3xl sm:text-4xl" />
            </button>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                ภารกิจวันนี้
              </h1>
              <p className="text-base sm:text-lg text-stone-800 mt-1">
                {currentThaiDate}
              </p>
            </div>
          </div>

          {/* 4 Task Cards */}
          <div className="space-y-3.5 sm:space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200 bg-white cursor-pointer active:scale-[0.99] hover:border-emerald-300 transition-all shadow-xs"
              >
                {/* Number Badge */}
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold shrink-0 shadow-xs"
                  style={{ background: "#2d7a3a" }}
                >
                  {task.id}
                </div>

                {/* Thumbnail Image */}
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shrink-0 border border-stone-100"
                />

                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
                    {task.title}
                  </h3>
                  {task.id === 1 ? (
                    <>
                      <p className="text-sm sm:text-base text-stone-600 mt-0.5">
                        {task.duration}
                      </p>
                      <p className="text-base sm:text-lg md:text-xl font-bold text-black mt-0.5">
                        {task.reps}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base sm:text-lg md:text-xl font-bold text-black mt-0.5">
                        {task.reps}
                      </p>
                      <p className="text-sm sm:text-base text-stone-600 mt-0.5">
                        {task.duration}
                      </p>
                    </>
                  )}
                </div>

                {/* Checkmark Badge */}
                {task.completed && (
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shrink-0 ml-1 shadow-sm"
                    style={{ background: "#2d7a3a" }}
                  >
                    <Icon icon="mdi:check" className="text-xl sm:text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Box: แสดงเฉพาะเมื่อมีกิจกรรมค้าง */}
        {hasIncompletePrevious && (
          <div className="pt-6 sm:pt-8">
            <button
              onClick={() => router.push("/tasks/incomplete")}
              className="w-full py-4 sm:py-5 rounded-2xl border border-stone-200 bg-white text-center text-lg sm:text-xl font-bold text-[#d32f2f] hover:bg-red-50/50 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
            >
              กิจกรรมที่ยังไม่เสร็จ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
