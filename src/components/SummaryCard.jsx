export default function SummaryCard({ label, value, suffix = "" }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
        {suffix}
      </div>
    </div>
  );
}