import { useState } from "react";
import { AlertCircle, Play, X } from "lucide-react";
import backImage from "../assets/discover-back.png";
import videoThumb from "../assets/stretch-thumb.png";

export default function Discover() {
  const [painLevel, setPainLevel] = useState(2);
  const [painPoints, setPainPoints] = useState([
    { id: 1, x: 42, y: 34 },
    { id: 2, x: 50, y: 48 },
    { id: 3, x: 62, y: 62 },
  ]);

  const addPainPoint = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPainPoints((prev) => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
      },
    ]);
  };

  const removePainPoint = (event, id) => {
    event.stopPropagation();
    setPainPoints((prev) => prev.filter((point) => point.id !== id));
  };

  const dotSize = 18 + painLevel * 2.2;
  const dotOpacity = 0.25 + painLevel * 0.06;

  return (
    <section className="screen">
      <div className="header-row">
        <div>
          <h1>Discover</h1>
          <p className="muted">Pain check-in and guided stretching support</p>
        </div>
        <div className="avatar">F</div>
      </div>

      <div className="card discover-card">
        <div className="header-row discover-top-row">
          <h2>Pain level: {painLevel}</h2>
          <span className="warning-pill">
            <AlertCircle size={14} />
            Check-in
          </span>
        </div>

        <div className="discover-body-wrap no-blue-bg">
          <div className="back-image-area clickable-back" onClick={addPainPoint}>
            <img
              src={backImage}
              alt="Back pain check-in illustration"
              className="discover-back-image"
            />

            {painPoints.map((point) => (
              <button
                key={point.id}
                className="interactive-pain-dot"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${dotSize}px`,
                  height: `${dotSize}px`,
                  backgroundColor: `rgba(203, 34, 56, ${dotOpacity})`,
                  boxShadow: `0 0 0 ${8 + painLevel}px rgba(203, 34, 56, 0.16)`,
                }}
                onClick={(event) => removePainPoint(event, point.id)}
                title="Click to remove this pain point"
              >
                <X size={painLevel > 5 ? 14 : 10} />
              </button>
            ))}
          </div>
        </div>

        <p className="muted pain-help-text">
          Click anywhere on the back image to mark a pain point. Click a red point again to remove it.
        </p>

        <div className="slider-wrap">
          <span className="slider-label">low</span>
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="pain-slider"
          />
          <span className="slider-label">high</span>
        </div>
      </div>

      <div className="card video-card">
        <div className="video-thumb-wrap">
          <img
            src={videoThumb}
            alt="Guided spine stretching daily 10 min exercise"
            className="video-thumb"
          />
          <button className="play-button">
            <Play size={30} fill="currentColor" />
          </button>
        </div>

        <div className="video-info">
          <h2>Guided spine stretching exercise</h2>
          <p className="muted">
            A simple rehabilitation exercise demo for posture awareness and spinal mobility.
          </p>
        </div>
      </div>
    </section>
  );
}