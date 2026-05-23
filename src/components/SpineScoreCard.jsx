export default function SpineScoreCard({ title, score, description }) {
  return (
    <div className="card">
      <div className="header-row" style={{ marginBottom: 8 }}>
        <h3>{title}</h3>
        <span className="status-pill">{score}/100</span>
      </div>
      <p className="muted">{description}</p>
    </div>
  );
}