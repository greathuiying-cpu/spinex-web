import jsPDF from "jspdf";
import { dailySummary, weeklySummary } from "../data/sampleData";
import { generateDailyInsight, generateWeeklyInsight } from "./summaryEngine";

export function downloadReportPdf(type = "daily") {
  const doc = new jsPDF();
  const isDaily = type === "daily";
  const title = isDaily
    ? "SpineX Daily Posture Behaviour Report"
    : "SpineX Weekly Posture Behaviour Report";

  const summary = isDaily ? dailySummary : weeklySummary;
  const insight = isDaily ? generateDailyInsight(dailySummary) : generateWeeklyInsight(weeklySummary);

  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, 14, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("For posture awareness and self-management support. Not diagnostic evidence.", 14, y);

  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Summary Metrics", 14, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const rows = isDaily
    ? [
        ["Daily Spine Habit Score", `${summary.dailyScore}/100`],
        ["Monitoring Time", `${summary.monitoringMinutes} min`],
        ["Neutral Posture", `${summary.neutralPercent}%`],
        ["Forward Flexion", `${summary.forwardFlexionMinutes} min`],
        ["Lateral Tilt", `${summary.lateralTiltMinutes} min`],
        ["Static Posture Episodes", `${summary.prolongedStaticEpisodes}`],
        ["Stretch Completion", `${summary.stretchCompleted}/${summary.stretchTarget}`],
        ["Pain Level", `${summary.painLevel}/10`],
      ]
    : [
        ["Average Spine Habit Score", `${summary.averageScore}/100`],
        ["Average Monitoring Time", `${summary.averageMonitoringHours} h/day`],
        ["Forward Leaning Trend", summary.forwardTrend],
        ["Lateral Tilt Trend", summary.lateralTiltTrend],
        ["Static Posture Episodes", `${summary.staticEpisodes}`],
        ["Stretch Adherence", `${summary.stretchAdherence}%`],
        ["Average Pain Level", `${summary.averagePainLevel}/10`],
      ];

  rows.forEach(([label, value]) => {
    doc.text(`${label}:`, 14, y);
    doc.text(String(value), 82, y);
    y += 7;
  });

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("SpineX Smart Summary", 14, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  const wrapped = doc.splitTextToSize(insight, 180);
  doc.text(wrapped, 14, y);

  y += wrapped.length * 5 + 10;
  doc.setFont("helvetica", "bold");
  doc.text("User Note", 14, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  const note =
    "This report summarises user-generated posture behaviour data, including posture trends, stretching adherence and symptom check-ins. It is designed to support personal posture awareness, daily habit tracking and self-management. It is not a diagnostic report.";
  doc.text(doc.splitTextToSize(note, 180), 14, y);

  doc.save(isDaily ? "SpineX_Daily_Report.pdf" : "SpineX_Weekly_Report.pdf");
}