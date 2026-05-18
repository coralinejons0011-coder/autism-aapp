import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ClosurePage() {
  const [, setLocation] = useLocation();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧩</span>
            <h1 className="text-xl font-bold text-[#0d1b2a]">الإغلاق البصري</h1>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#0d1b2a] mb-8 text-center">أكمل الشكل الناقص</h2>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="w-20 h-20 border-4 border-green-500 rounded-lg"></div>
            <div className="text-3xl">?</div>
            <div className="w-20 h-20 bg-green-500 rounded-lg"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-500">اختر الشكل الصحيح لإكمال السلسلة</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
