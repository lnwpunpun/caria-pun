const fs = require('fs');
const path = require('path');

const gapPath = path.join(__dirname, 'src', 'components', 'GapAnalysisSection.tsx');
let gapContent = fs.readFileSync(gapPath, 'utf-8');

// Import mock data
if (!gapContent.includes("import { MOCK_GAP_ANALYSIS }")) {
  gapContent = gapContent.replace('import { useRef, useState } from "react";', 'import { useRef, useState } from "react";\nimport { MOCK_GAP_ANALYSIS } from "@/lib/mockData";');
}

// Replace hardcoded radarData and gapDetails
const hardcodedDataRegex = /const radarData = \[[\s\S]*?\];\s*const gapDetails = \[[\s\S]*?\];/;
const dynamicData = `
const getRadarData = (tab: "skills" | "attitudes" | "knowledge") => {
  const data = MOCK_GAP_ANALYSIS.radar_data[\`drilldown_\${tab}\`];
  return data.labels.map((label, i) => ({
    subject: label,
    student: data.student_scores[i],
    career: data.career_scores[i],
    fullMark: 100
  }));
};

const gapDetails = MOCK_GAP_ANALYSIS.gaps.map(g => ({
  skill: g.competency_id.replace(/^[ASK]\\d{2}_/, '').replace(/_/g, ' '),
  student: g.student_score,
  required: g.career_required,
  gap: g.gap_score,
  priority: g.gap_score >= 30 ? "Critical" : g.gap_score >= 20 ? "High" : "Medium"
}));
`;
gapContent = gapContent.replace(hardcodedDataRegex, dynamicData);

// Update activeTab state
gapContent = gapContent.replace('const [activeTab, setActiveTab] = useState<"radar" | "gaps">("radar");', 'const [activeTab, setActiveTab] = useState<"skills" | "attitudes" | "knowledge">("skills");\n  const radarData = getRadarData(activeTab);');

// Add Tabs UI above Radar Chart
const chartHeaderRegex = /<h3 className="font-syne font-bold text-white text-lg">Competency Radar<\/h3>\s*<p className="text-xs font-dm text-white\/40 mt-0\.5">Data Scientist pathway<\/p>/;
const tabsUI = `
<div className="flex flex-col gap-2">
  <h3 className="font-syne font-bold text-white text-lg">Competency Radar</h3>
  <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
    {(['skills', 'attitudes', 'knowledge'] as const).map(t => (
      <button 
        key={t}
        onClick={() => setActiveTab(t)}
        className={\`px-3 py-1 text-xs font-dm rounded-md transition-colors \${activeTab === t ? 'bg-[#1E90FF] text-white' : 'text-white/50 hover:text-white/80'}\`}
      >
        {t.charAt(0).toUpperCase() + t.slice(1)}
      </button>
    ))}
  </div>
</div>
`;
gapContent = gapContent.replace(chartHeaderRegex, tabsUI);

fs.writeFileSync(gapPath, gapContent, 'utf-8');
console.log('Updated GapAnalysisSection.tsx');

// Now for SimulatorSection.tsx
const simPath = path.join(__dirname, 'src', 'components', 'SimulatorSection.tsx');
let simContent = fs.readFileSync(simPath, 'utf-8');

// Import mock data and functions
if (!simContent.includes("import { MOCK_TOP10, MOCK_GAP_ANALYSIS }")) {
  simContent = simContent.replace('import { useRef, useState, useEffect } from "react";', 'import { useRef, useState, useEffect } from "react";\nimport { MOCK_TOP10, MOCK_GAP_ANALYSIS } from "@/lib/mockData";\nimport { calculateMES, adjustScores } from "@/lib/mes-client";\nimport type { CareerVector } from "@/types";');
}

// Replace initialSkills and careerTargets
const mockSimDataRegex = /const initialSkills = \[[\s\S]*?\];\s*const careerTargets = \[[\s\S]*?\];/;
const dynamicSimData = `
const initialSkills = MOCK_GAP_ANALYSIS.gaps.slice(0, 5).map((g, i) => {
  const colors = ["#F39200", "#1E90FF", "#A78BFA", "#4ADE80", "#F472B6"];
  return {
    id: g.competency_id,
    label: g.competency_id.replace(/^[ASK]\\d{2}_/, '').replace(/_/g, ' '),
    value: g.student_score,
    color: colors[i % colors.length]
  };
});

// Create dummy career vectors for the top 3 matches based on MOCK_TOP10
const careerTargets = MOCK_TOP10.top10_careers.slice(0, 3).map(c => {
  const vector: Record<string, number> = {};
  MOCK_GAP_ANALYSIS.gaps.forEach(g => {
    vector[g.competency_id] = g.career_required * (Math.random() * 0.4 + 0.8); // slight variance
  });
  return {
    id: c.career_id,
    title: c.career_name,
    base: c.match_percentage,
    competency_vector: vector
  };
});

function computeMatch(skills: typeof initialSkills, career: typeof careerTargets[0]) {
  // convert skills to scores object
  const adjustedScores: Record<string, number> = {};
  skills.forEach(s => adjustedScores[s.id] = s.value);
  // for missing skills, use some default or 0
  
  const score = calculateMES(adjustedScores, career.competency_vector);
  return Math.min(99, Math.round(score * 100)); // assuming MES returns 0-1
}
`;
// Wait, the computeMatch uses calculateMES. Let's make a simpler computeMatch that just offsets the base percentage based on slider changes, like the old mock did but dynamic.
const simplerDynamicSimData = `
const initialSkills = MOCK_GAP_ANALYSIS.gaps.slice(0, 5).map((g, i) => {
  const colors = ["#F39200", "#1E90FF", "#A78BFA", "#4ADE80", "#F472B6"];
  return {
    id: g.competency_id,
    label: g.competency_id.replace(/^[ASK]\\d{2}_/, '').replace(/_/g, ' '),
    value: g.student_score,
    originalValue: g.student_score,
    color: colors[i % colors.length]
  };
});

const careerTargets = MOCK_TOP10.top10_careers.slice(0, 3).map(c => {
  return {
    id: c.career_id,
    title: c.career_name,
    base: c.match_percentage,
    weights: {
      // Just assign some random weights to the top gaps for simulation
      [initialSkills[0]?.id]: 0.35,
      [initialSkills[1]?.id]: 0.20,
      [initialSkills[2]?.id]: 0.15,
      [initialSkills[3]?.id]: 0.20,
      [initialSkills[4]?.id]: 0.10,
    }
  };
});

function computeMatch(skills: typeof initialSkills, career: typeof careerTargets[0]) {
  let improvement = 0;
  skills.forEach(s => {
    const diff = Math.max(0, s.value - s.originalValue);
    const w = career.weights[s.id as keyof typeof career.weights] || 0;
    improvement += (diff / 100) * w * 100;
  });
  return Math.min(99, Math.round(career.base + improvement));
}
`;
simContent = simContent.replace(mockSimDataRegex, simplerDynamicSimData);

fs.writeFileSync(simPath, simContent, 'utf-8');
console.log('Updated SimulatorSection.tsx');
