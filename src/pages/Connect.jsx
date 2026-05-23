import { useState } from "react";
import {
  Bluetooth,
  CheckCircle,
  Circle,
  Radio,
  RotateCcw,
  AlertTriangle,
  X,
} from "lucide-react";
import { liveSample } from "../data/sampleData";

export default function Connect() {
  const [connected, setConnected] = useState(false);
  const [recording, setRecording] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleConnection = () => {
    setConnected((prev) => !prev);
  };

  const triggerPostureAlert = () => {
    setShowAlert(true);
  };

  return (
    <section className="screen">
      <div className="header-row">
        <div>
          <h1>Connect</h1>
          <p className="muted">Sensor vest connection centre</p>
        </div>
        <div className="avatar">F</div>
      </div>

      {showAlert && (
        <div className="posture-alert-overlay">
          <div className="posture-alert-card">
            <button className="alert-close-btn" onClick={() => setShowAlert(false)}>
              <X size={18} />
            </button>

            <div className="alert-icon">
              <AlertTriangle size={34} />
            </div>

            <h2>Posture Reminder</h2>
            <p>
              SpineX detected a posture pattern that may need attention. You have been
              leaning forward or staying static for a prolonged period.
            </p>

            <div className="alert-suggestion">
              <strong>Suggested action:</strong>
              <span> Sit upright, relax your shoulders, and take a short stretching break.</span>
            </div>

            <button className="primary-btn" onClick={() => setShowAlert(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="card connect-hero">
        <button
          className={`bluetooth-circle bluetooth-clickable ${connected ? "bluetooth-connected" : ""}`}
          onClick={toggleConnection}
          aria-label="Toggle SpineX sensor connection"
        >
          <Bluetooth size={72} />
        </button>

        <h2>{connected ? "SpineX Sensor Connected" : "Ready to pair"}</h2>
        <p className="muted">
          Tap the Bluetooth icon to {connected ? "disconnect" : "connect"} the SpineX sensor.
        </p>
        <p className="muted">
          MVP prototype uses USB Serial through Chrome. Future product will use Bluetooth Low Energy.
        </p>

        <div className="button-row">
          <button className="secondary-btn">
            <RotateCcw size={16} /> Calibrate Neutral
          </button>

          <button className="dark-btn" onClick={() => setRecording((v) => !v)}>
            <Radio size={16} /> {recording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        <div className="button-row">
          <button className="secondary-btn warning-action" onClick={triggerPostureAlert}>
            <AlertTriangle size={16} /> Posture Alert
          </button>
        </div>
      </div>

      <div className="card">
        <div className="header-row">
          <h2>Live Sensor Status</h2>
          <span className={connected ? "status-pill" : "status-pill warning-pill"}>
            {connected ? <CheckCircle size={14} /> : <Circle size={14} />}
            {connected ? "Connected" : "Not connected"}
          </span>
        </div>

        <div className="grid-2">
          <div className="metric-card">
            <div className="metric-label">Upper pitch</div>
            <div className="metric-value">{liveSample.upperPitch}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Upper roll</div>
            <div className="metric-value">{liveSample.upperRoll}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Lower pitch</div>
            <div className="metric-value">{liveSample.lowerPitch}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Lower roll</div>
            <div className="metric-value">{liveSample.lowerRoll}°</div>
          </div>
        </div>

        <div className="insight-box">
          Current posture state: <strong>{liveSample.postureState}</strong>. Static posture timer:{" "}
          <strong>{liveSample.staticMinutes} min</strong>.
        </div>
      </div>

      <p className="disclaimer">
        *The IMU sensors estimate posture-related movement angles, not clinical Cobb angle or diagnostic spinal measurements.
      </p>
    </section>
  );
}