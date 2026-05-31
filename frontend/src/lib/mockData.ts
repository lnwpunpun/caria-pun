import type { Top10Response, GapAnalysisResponse, CareerVector, CourseRec } from '@/types';

// 3 demo persona IDs
export const DEMO_PERSONAS = [
  { user_id: 'U_ton', name: 'ต้น', program: 'DT', description: 'สายโปรแกรมเมอร์ ชอบ coding' },
  { user_id: 'U_mai', name: 'ใหม่', program: 'DM', description: 'สายครีเอทีฟ ชอบออกแบบ' },
  { user_id: 'U_fuse', name: 'ฟิวส์', program: 'DT', description: 'สาย data ชอบวิเคราะห์' },
];

// Mock Top10 response for persona ต้น
export const MOCK_TOP10: Top10Response = {
  assessment_id: 'ASM_U_ton',
  user_id: 'U_ton',
  timestamp: new Date().toISOString(),
  top10_careers: [
    { rank: 1, career_id: 'DT01', career_name: 'Software Developer', career_group: 'Software', program: 'DT', match_percentage: 95.0, raw_mes: 0.245, top_strengths: ['S20_Programming', 'S03_Complex_Problem_Solving'], top_gaps: ['S16_Negotiation', 'K26_Sales_and_Marketing'] },
    { rank: 2, career_id: 'DT02', career_name: 'Web Developer', career_group: 'Software', program: 'DT', match_percentage: 91.2, raw_mes: 0.238, top_strengths: ['S20_Programming', 'S27_Technology_Design'], top_gaps: ['S19_Persuasion', 'K07_Design'] },
    { rank: 3, career_id: 'DT07', career_name: 'Data Engineer', career_group: 'Data_AI', program: 'DT', match_percentage: 88.5, raw_mes: 0.232, top_strengths: ['S14_Mathematics', 'S25_Systems_Analysis'], top_gaps: ['A01_Artistic', 'K12_Fine_Arts'] },
    { rank: 4, career_id: 'DT03', career_name: 'Mobile App Developer', career_group: 'Software', program: 'DT', match_percentage: 85.1, raw_mes: 0.226, top_strengths: ['S20_Programming', 'S05_Critical_Thinking'], top_gaps: ['S16_Negotiation', 'K04_Communications_and_Media'] },
    { rank: 5, career_id: 'DT04', career_name: 'QA Engineer', career_group: 'Software', program: 'DT', match_percentage: 82.3, raw_mes: 0.221, top_strengths: ['S31_Quality_Control_Analysis', 'S28_Troubleshooting'], top_gaps: ['A03_Enterprising', 'K26_Sales_and_Marketing'] },
    { rank: 6, career_id: 'DT16', career_name: 'DevOps Engineer', career_group: 'Network_Infra', program: 'DT', match_percentage: 79.8, raw_mes: 0.217, top_strengths: ['S25_Systems_Analysis', 'S28_Troubleshooting'], top_gaps: ['S16_Negotiation', 'K01_Administration_and_Management'] },
    { rank: 7, career_id: 'DT08', career_name: 'ML Engineer', career_group: 'Data_AI', program: 'DT', match_percentage: 77.0, raw_mes: 0.212, top_strengths: ['S14_Mathematics', 'S20_Programming'], top_gaps: ['A01_Artistic', 'K24_Psychology'] },
    { rank: 8, career_id: 'DT05', career_name: 'Full-Stack Developer', career_group: 'Software', program: 'DT', match_percentage: 74.5, raw_mes: 0.208, top_strengths: ['S20_Programming', 'S26_Systems_Design'], top_gaps: ['K12_Fine_Arts', 'S19_Persuasion'] },
    { rank: 9, career_id: 'DT09', career_name: 'Data Analyst', career_group: 'Data_AI', program: 'DT', match_percentage: 71.2, raw_mes: 0.203, top_strengths: ['S14_Mathematics', 'S05_Critical_Thinking'], top_gaps: ['A01_Artistic', 'K07_Design'] },
    { rank: 10, career_id: 'DT06', career_name: 'Cloud Architect', career_group: 'Network_Infra', program: 'DT', match_percentage: 68.0, raw_mes: 0.198, top_strengths: ['S25_Systems_Analysis', 'S26_Systems_Design'], top_gaps: ['S12_Management_of_Financial_Resources', 'K08_Economics_and_Accounting'] },
  ],
};

// Mock Gap Analysis for DT01 (Software Developer)
export const MOCK_GAP_ANALYSIS: GapAnalysisResponse = {
  career: { career_id: 'DT01', career_name: 'Software Developer' },
  match_percentage: 95.0,
  readiness_percentage: 72.7,
  radar_data: {
    summary_3axis: {
      labels: ['Skills', 'Attitudes', 'Knowledge'],
      student_averages: [58.2, 52.0, 45.5],
      career_averages: [65.0, 55.0, 52.0],
    },
    drilldown_skills: {
      labels: ['Active Learning', 'Active Listening', 'Complex Problem Solving', 'Coordination', 'Critical Thinking', 'Programming', 'Systems Analysis', 'Writing', 'Time Management', 'Quality Control'],
      student_scores: [72, 65, 85, 50, 80, 92, 78, 55, 60, 45],
      career_scores: [75, 70, 90, 60, 85, 95, 80, 65, 70, 55],
    },
    drilldown_attitudes: {
      labels: ['Artistic', 'Conventional', 'Enterprising', 'Investigative', 'Realistic', 'Social'],
      student_scores: [30, 55, 40, 75, 65, 50],
      career_scores: [35, 60, 50, 80, 70, 55],
    },
    drilldown_knowledge: {
      labels: ['Administration', 'Computers & Electronics', 'Design', 'Engineering & Tech', 'English', 'Mathematics', 'Sales & Marketing'],
      student_scores: [35, 85, 40, 70, 65, 78, 30],
      career_scores: [45, 90, 50, 80, 75, 85, 40],
    },
  },
  gaps: [
    { competency_id: 'S16_Negotiation', domain: 'skill', student_score: 25, career_required: 60, gap_score: 35, gap_percentage: 58.3, recommended_courses: [{ course_id: 'C001', title: 'Negotiation Mastery', provider: 'Coursera', price_thb: 1490, duration_hours: 12, level: 'Intermediate', url: 'https://coursera.org/negotiation', affiliate: true }] },
    { competency_id: 'K26_Sales_and_Marketing', domain: 'knowledge', student_score: 30, career_required: 55, gap_score: 25, gap_percentage: 45.5, recommended_courses: [{ course_id: 'C002', title: 'Digital Marketing Fundamentals', provider: 'Skooldio', price_thb: 990, duration_hours: 8, level: 'Beginner', url: 'https://skooldio.com/marketing', affiliate: true }] },
    { competency_id: 'S19_Persuasion', domain: 'skill', student_score: 35, career_required: 55, gap_score: 20, gap_percentage: 36.4, recommended_courses: [{ course_id: 'C003', title: 'Persuasion & Influence', provider: 'Coursera', price_thb: 1290, duration_hours: 10, level: 'Intermediate', url: 'https://coursera.org/persuasion', affiliate: true }] },
    { competency_id: 'K07_Design', domain: 'knowledge', student_score: 40, career_required: 55, gap_score: 15, gap_percentage: 27.3, recommended_courses: [{ course_id: 'C004', title: 'UX Design Fundamentals', provider: 'Skooldio', price_thb: 1890, duration_hours: 15, level: 'Beginner', url: 'https://skooldio.com/ux', affiliate: true }] },
    { competency_id: 'A03_Enterprising', domain: 'attitude', student_score: 40, career_required: 50, gap_score: 10, gap_percentage: 20.0, recommended_courses: [{ course_id: 'C005', title: 'Entrepreneurial Mindset', provider: 'Coursera', price_thb: 0, duration_hours: 6, level: 'Beginner', url: 'https://coursera.org/entrepreneur', affiliate: false }] },
  ],
  strengths: [
    { competency_id: 'S20_Programming', domain: 'skill', student_score: 92, career_required: 80, surplus: 12 },
    { competency_id: 'S03_Complex_Problem_Solving', domain: 'skill', student_score: 85, career_required: 78, surplus: 7 },
    { competency_id: 'S05_Critical_Thinking', domain: 'skill', student_score: 80, career_required: 75, surplus: 5 },
  ],
};

// Mock courses
export const MOCK_COURSES: CourseRec[] = [
  { course_id: 'C001', title: 'Negotiation Mastery', provider: 'Coursera', price_thb: 1490, duration_hours: 12, level: 'Intermediate', url: 'https://coursera.org/negotiation', affiliate: true },
  { course_id: 'C002', title: 'Digital Marketing Fundamentals', provider: 'Skooldio', price_thb: 990, duration_hours: 8, level: 'Beginner', url: 'https://skooldio.com/marketing', affiliate: true },
  { course_id: 'C003', title: 'Persuasion & Influence', provider: 'Coursera', price_thb: 1290, duration_hours: 10, level: 'Intermediate', url: 'https://coursera.org/persuasion', affiliate: true },
  { course_id: 'C004', title: 'UX Design Fundamentals', provider: 'Skooldio', price_thb: 1890, duration_hours: 15, level: 'Beginner', url: 'https://skooldio.com/ux', affiliate: true },
  { course_id: 'C005', title: 'Entrepreneurial Mindset', provider: 'Coursera', price_thb: 0, duration_hours: 6, level: 'Beginner', url: 'https://coursera.org/entrepreneur', affiliate: false },
  { course_id: 'C006', title: 'Python for Data Science', provider: 'Skooldio', price_thb: 1690, duration_hours: 20, level: 'Intermediate', url: 'https://skooldio.com/python-ds', affiliate: true },
];
