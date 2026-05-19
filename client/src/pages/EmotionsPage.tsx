import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { EmotionsRecognitionActivity } from "@/components/EmotionsRecognitionActivity";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function EmotionsPage() {
  const [, setLocation] = useLocation();
  const handleComplete = () => { setLocation("/dashboard"); };
  
  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">😊</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">التعرف على المشاعر</h1>
              <p className="text-sm text-gray-500 font-bold">تعلم التعبيرات والمشاعر المختلفة بطريقة ممتعة</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <EmotionsRecognitionActivity onComplete={handleComplete} />
        </div>
      </div>
    </DashboardLayout>
  );
}
