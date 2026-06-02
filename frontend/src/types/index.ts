// Shared TypeScript types — mirror backend/models/schemas.py.
// All competency scores are on a 0-100 scale.

export type CompetencyScores = Record<string, number>;

export interface CareerResult {
  rank: number;
  career_id: string;
  career_name: string;
  career_group: string;
  program: string;
  match_percentage: number;
  raw_mes: number;
  top_strengths: string[];
  top_gaps: string[];
}

export interface Top10Response {
  assessment_id: string;
  user_id: string;
  timestamp: string;
  top10_careers: CareerResult[];
  dream_career_group?: string;
  dream_career_id?: string;
}

export interface RadarSeries {
  labels: string[];
  student_scores: number[];
  career_scores: number[];
}

export interface RadarSummary {
  labels: string[];
  student_averages: number[];
  career_averages: number[];
}

export interface RadarData {
  summary_3axis: RadarSummary;
  drilldown_skills: RadarSeries;
  drilldown_attitudes: RadarSeries;
  drilldown_knowledge: RadarSeries;
}

export interface CourseRec {
  course_id: string;
  title: string;
  provider: string;
  price_thb: number;
  duration_hours: number;
  level?: string;
  url: string;
  affiliate: boolean;
  thumbnail_url?: string;
}

export interface GapItem {
  competency_id: string;
  domain: string;
  student_score: number;
  career_required: number;
  gap_score: number;
  gap_percentage: number;
  recommended_courses: CourseRec[];
}

export interface StrengthItem {
  competency_id: string;
  domain: string;
  student_score: number;
  career_required: number;
  surplus: number;
}

export interface GapAnalysisResponse {
  career: { career_id: string; career_name: string };
  match_percentage: number;
  readiness_percentage: number;
  radar_data: RadarData;
  gaps: GapItem[];
  strengths: StrengthItem[];
}

export interface CareerVector {
  career_id: string;
  career_name: string;
  career_group: string;
  program: string;
  competency_vector: CompetencyScores;
}
