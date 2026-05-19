import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MemoryActivity } from "@/components/MemoryActivity";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function MemoryPage() {
  const [, setLocation] = useLocation();

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">الذاكرة البصرية</h1>
              <p className="text-sm text-gray-500 font-bold">المحور الثالث - تذكر الأشكال والصور</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-[#f59e0b]/20">
          <MemoryActivity onComplete={() => setLocation("/dashboard")} />
        </div>
      </div>
    </DashboardLayout>
  );
}
