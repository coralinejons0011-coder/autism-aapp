import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MemoryActivity } from "@/components/MemoryActivity";
import { ArrowRight } from "lucide-react";

export default function MemoryPage() {
  const [, setLocation] = useLocation();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#f59e0b]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h1 className="text-xl font-bold text-[#0d1b2a]">الذاكرة البصرية</h1>
              <p className="text-sm text-gray-500">المحور الثالث - تذكر الأشكال والصور</p>
            </div>
          </div>
        </div>
      </div>
      <MemoryActivity onComplete={() => setLocation("/dashboard")} />
    </div>
  );
}
