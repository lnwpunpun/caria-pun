/**
 * Admin analytics mock data — mirrors backend/data/stats_mock.json.
 * Kept client-side so /admin/analytics renders as a self-contained static
 * dashboard for the B2B pitch (no backend round-trip required).
 * When the backend `GET /api/v1/admin/stats` endpoint lands, swap these
 * constants for a fetch — the shapes match.
 */

export interface CareerGroupStat {
  group: string;
  nameTh: string;
  module_id: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CareerStat {
  career_id: string;
  career_name: string;
  count: number;
  percentage: number;
}

export interface GapStat {
  competency_id: string;
  label_th: string;
  label_en: string;
  domain: string;
  avg_gap: number;
  students_below_threshold: number;
}

export interface ModuleForecast {
  module_id: string;
  name_th: string;
  current_term: number;
  next_term_forecast: number;
  trend: "up" | "down";
}

export const ADMIN_STATS = {
  academic_year: 2569,
  total_assessments: 245,
  model_accuracy: 83.2,
};

export const CAREER_GROUP_DISTRIBUTION: CareerGroupStat[] = [
  { group: "Enterprise Software", nameTh: "วิศวกรรมซอฟต์แวร์องค์กร", module_id: "DIGITECH-ENT", count: 78, percentage: 31.8, color: "#2563EB" },
  { group: "Data Science", nameTh: "วิทยาการข้อมูล", module_id: "DIGITECH-DATA", count: 62, percentage: 25.3, color: "#F39200" },
  { group: "Web Application", nameTh: "เว็บแอปพลิเคชัน", module_id: "DIGITECH-WEB", count: 45, percentage: 18.4, color: "#10B981" },
  { group: "Cloud Technology", nameTh: "คลาวด์ & ความปลอดภัย", module_id: "DIGITECH-CLOUD", count: 35, percentage: 14.3, color: "#8B5CF6" },
  { group: "AI & Emerging Technology", nameTh: "AI & เทคโนโลยีอุบัติใหม่", module_id: "DIGITECH-AI", count: 18, percentage: 7.3, color: "#EC4899" },
  { group: "IT Support", nameTh: "ไอทีซัพพอร์ต", module_id: "DIGITECH-ITSUP", count: 7, percentage: 2.9, color: "#64748B" },
];

export const TOP_CAREERS: CareerStat[] = [
  { career_id: "DT08", career_name: "Software Developer", count: 38, percentage: 15.5 },
  { career_id: "DT18", career_name: "Data Scientist / Analyst", count: 32, percentage: 13.1 },
  { career_id: "DT06", career_name: "UI/UX Designer", count: 28, percentage: 11.4 },
  { career_id: "DT04", career_name: "Web Developer", count: 24, percentage: 9.8 },
  { career_id: "DT07", career_name: "Mobile Developer", count: 22, percentage: 9.0 },
  { career_id: "DT25", career_name: "AI Engineer", count: 20, percentage: 8.2 },
];

export const TOP_GAPS: GapStat[] = [
  { competency_id: "S25_Systems_Analysis", label_th: "การวิเคราะห์ระบบ", label_en: "Systems Analysis", domain: "skill", avg_gap: -32.5, students_below_threshold: 172 },
  { competency_id: "S20_Programming", label_th: "การเขียนโปรแกรม", label_en: "Programming", domain: "skill", avg_gap: -28.1, students_below_threshold: 158 },
  { competency_id: "S26_Systems_Design", label_th: "การออกแบบระบบ", label_en: "Systems Design", domain: "skill", avg_gap: -26.4, students_below_threshold: 149 },
  { competency_id: "S18_Operations_Analysis", label_th: "การวิเคราะห์การปฏิบัติงาน", label_en: "Operations Analysis", domain: "skill", avg_gap: -24.7, students_below_threshold: 141 },
  { competency_id: "S03_Complex_Problem_Solving", label_th: "การแก้ปัญหาที่ซับซ้อน", label_en: "Complex Problem Solving", domain: "skill", avg_gap: -22.3, students_below_threshold: 133 },
];

export const MODULE_DEMAND_FORECAST: ModuleForecast[] = [
  { module_id: "DIGITECH-ENT", name_th: "วิศวกรรมซอฟต์แวร์องค์กร", current_term: 78, next_term_forecast: 86, trend: "up" },
  { module_id: "DIGITECH-DATA", name_th: "วิทยาการข้อมูล", current_term: 62, next_term_forecast: 74, trend: "up" },
  { module_id: "DIGITECH-WEB", name_th: "เว็บแอปพลิเคชัน", current_term: 45, next_term_forecast: 42, trend: "down" },
  { module_id: "DIGITECH-CLOUD", name_th: "คลาวด์ & ความปลอดภัย", current_term: 35, next_term_forecast: 48, trend: "up" },
  { module_id: "DIGITECH-AI", name_th: "AI & อุบัติใหม่", current_term: 18, next_term_forecast: 30, trend: "up" },
  { module_id: "DIGITECH-ITSUP", name_th: "ไอทีซัพพอร์ต", current_term: 7, next_term_forecast: 6, trend: "down" },
];
