"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
} from "lucide-react";

export default function BackNavigation() {
  const router = useRouter();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-xl backdrop-blur-md">
        {/* Home */}
        <button
          onClick={() => router.push("/")}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 transition"
          title="Home"
        >
          <ChevronsLeft size={22} />
        </button>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 transition"
          title="Back"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Forward */}
        <button
          onClick={() => window.history.forward()}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 transition"
          title="Forward"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}