import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SpatialActivity } from "@/components/SpatialActivity";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function SpatialPage() {
  const [, setLocation] = useLocation();

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧩</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">التنظيم المكاني</h1>
              <p className="text-sm text-gray-500 font-bold">المحور الثاني - الاتجاهات والمواضع</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-[#7c3aed]/20">
          <SpatialActivity onComplete={() => setLocation("/dashboard")} />
        </div>
      </div>
    </DashboardLayout>
  );
}
