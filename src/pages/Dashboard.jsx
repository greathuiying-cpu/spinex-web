import logo from "../assets/spinex-logo.png";
import spineImage from "../assets/spine-dashboard.png";

const spineRegions = [
  {
    name: "Cervical",
    score: 95,
    status: "Comfortable",
    className: "region-green",
  },
  {
    name: "Thoracic",
    score: 68,
    status: "Needs attention",
    className: "region-yellow",
  },
  {
    name: "Lumbar",
    score: 42,
    status: "Tense today",
    className: "region-orange",
  },
  {
    name: "Sacral & Coccyx",
    score: 38,
    status: "Low comfort",
    className: "region-red",
  },
];

export default function Dashboard() {
  const overallScore = 70;

  return (
    <section className="screen dashboard-simple">
      <div className="header-row">
        <div className="brand">
          <img src={logo} alt="SpineX logo" className="logo-mark" />
          <div>
            <h1>SpineX</h1>
            <p className="muted">Your spinal health mentor</p>
            <h1>Welcome back❤</h1>
          </div>
        </div>
        <div className="avatar">F</div>
      </div>

      <div className="dashboard-score-card">
        <div>
          <p className="muted">Today’s Overall Score</p>
          <h2 className="overall-score">{overallScore}/100</h2>
        </div>
        <div className="score-badge">"Keep going 😊 small posture breaks can improve your daily spine comfort👍"</div>
      </div>

      <div className="spine-region-layout">
        
  <div className="spine-image-card">
    <img
      src={spineImage}
      alt="Cartoon spine health regions"
      className="spine-dashboard-image"
    />
  </div>

  <div className="region-side-list">
    {spineRegions.map((region) => (
      <div className="region-side-card" key={region.name}>
        <div className="region-title-row">
          <span className={`region-dot ${region.className}`} />
          <h3>{region.name}</h3>
        </div>
        <p className="muted">{region.status}</p>
        <strong>{region.score}/100</strong>
      </div>
    ))}
  </div>
</div>

    </section>
  );
}