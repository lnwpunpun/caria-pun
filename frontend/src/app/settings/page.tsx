"use client";

import Link from "next/link";
import { ArrowLeft, LogOut, Trash2, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { useMockUser, mockLogout, clearAssessmentHistory } from "@/lib/mock-auth";

export default function SettingsPage() {
  const user = useMockUser();

  const handleClearHistory = () => {
    if (window.confirm("ต้องการลบประวัติการประเมินทั้งหมดหรือไม่? การกระทำนี้ย้อนกลับไม่ได้")) {
      clearAssessmentHistory();
      window.alert("ลบประวัติการประเมินเรียบร้อยแล้ว");
    }
  };

  const initial = user?.name?.trim()?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-background text-foreground font-thai flex flex-col">
      <SiteHeader />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-28 pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="size-4" />
          กลับหน้าหลัก
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2">บัญชีและการตั้งค่า</h1>
        <p className="text-muted-foreground mb-8">จัดการบัญชีและข้อมูลการประเมินของคุณ</p>

        {/* Account card */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none mb-6">
          {user ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-orange text-2xl font-extrabold text-brand-orange-foreground">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold truncate">{user.name}</h2>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                    {user.provider}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => mockLogout()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-5 py-2">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">เข้าสู่ระบบเพื่อบันทึกผลลัพธ์</h2>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                  ตอนนี้คุณกำลังใช้งานแบบผู้เยี่ยมชม (Guest) — เข้าสู่ระบบเพื่อบันทึกผลการประเมินและดูวิชาเรียนที่แนะนำข้ามอุปกรณ์ได้
                </p>
              </div>
              <div className="w-full max-w-sm">
                <AuthButtons />
              </div>
            </div>
          )}
        </section>

        {/* Data & privacy */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0d1726] dark:shadow-none">
          <h3 className="text-base font-bold mb-1">ข้อมูลและความเป็นส่วนตัว</h3>
          <p className="text-sm text-muted-foreground mb-5">
            ประวัติการประเมินถูกเก็บไว้บนเครื่องของคุณ (PDPA-friendly) คุณสามารถลบทิ้งได้ทุกเมื่อ
          </p>
          <button
            type="button"
            onClick={handleClearHistory}
            className="inline-flex items-center gap-2 rounded-xl border border-danger/40 bg-danger/10 px-4 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/20"
          >
            <Trash2 className="size-4" />
            ลบประวัติการประเมิน
          </button>
        </section>
      </main>
    </div>
  );
}
