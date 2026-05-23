import { Download, FileText } from "lucide-react";
import SummaryCard from "../components/SummaryCard";
import { dailySummary, weeklySummary } from "../data/sampleData";
import { generateDailyInsight, generateWeeklyInsight } from "../utils/summaryEngine";
import { downloadReportPdf } from "../utils/reportGenerator";

export default function Reports() {
  const dailyInsight = generateDailyInsight(dailySummary);
  const weeklyInsight = generateWeeklyInsight(weeklySummary);

  return (
    <section className="screen">
      <div className="header-row">
        <div>
          <h1>Reports</h1>
          <p className="muted">Your posture behaviour summaries</p>
        </div>
        <div className="avatar">F</div>
      </div>

      <div className="report-list">
        <div className="card">
          <div className="header-row">
            <div>
              <h2>Daily Report</h2>
              <p className="muted">Today’s posture behaviour and self-management summary</p>
            </div>
            <FileText size={28} />
          </div>

          <div className="grid-2">
            <SummaryCard label="Score" value={dailySummary.dailyScore} suffix="/100" />
            <SummaryCard label="Monitoring" value={dailySummary.monitoringMinutes} suffix=" min" />
            <SummaryCard label="Forward flexion" value={dailySummary.forwardFlexionMinutes} suffix=" min" />
            <SummaryCard label="Pain level" value={dailySummary.painLevel} suffix="/10" />
          </div>

          <div className="insight-box">
            <strong>SpineX Smart Summary:</strong> {dailyInsight}
          </div>

          <button className="dark-btn" style={{ marginTop: 14 }} onClick={() => downloadReportPdf("daily")}>
            <Download size={16} /> Download Daily Report
          </button>
        </div>

        <div className="card">
          <div className="header-row">
            <div>
              <h2>Weekly Report</h2>
              <p className="muted">Weekly posture trends and rehabilitation follow-up summary</p>
            </div>
            <FileText size={28} />
          </div>

          <div className="grid-2">
            <SummaryCard label="Avg score" value={weeklySummary.averageScore} suffix="/100" />
            <SummaryCard label="Avg monitoring" value={weeklySummary.averageMonitoringHours} suffix=" h/day" />
            <SummaryCard label="Static episodes" value={weeklySummary.staticEpisodes} />
            <SummaryCard label="Stretch adherence" value={weeklySummary.stretchAdherence} suffix="%" />
          </div>

          <div className="insight-box">
            <strong>SpineX Smart Summary:</strong> {weeklyInsight}
          </div>

          <button className="dark-btn" style={{ marginTop: 14 }} onClick={() => downloadReportPdf("weekly")}>
            <Download size={16} /> Download Weekly Report
          </button>
        </div>
      </div>

      <p className="disclaimer">
        These reports summarise posture behaviour patterns for user awareness and self-management support.
      </p>
    </section>
  );
}