import { useRef, useState } from "react";
import {
  Bluetooth,
  CheckCircle,
  Circle,
  Radio,
  RotateCcw,
  AlertTriangle,
  X,
} from "lucide-react";

const defaultSensorData = {
  upperPitch: 0,
  upperRoll: 0,
  lowerPitch: 0,
  lowerRoll: 0,
  postureState: "Waiting for sensor data",
  staticMinutes: 0,
};

export default function Connect() {
  const [connected, setConnected] = useState(false);
  const [recording, setRecording] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sensorData, setSensorData] = useState(defaultSensorData);
  const [connectionMessage, setConnectionMessage] = useState(
    "Tap the Bluetooth icon to connect the SpineX sensor."
  );

  const portRef = useRef(null);
  const readerRef = useRef(null);
  const keepReadingRef = useRef(false);
  const baselineRef = useRef(null);

  const parseSensorLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  };

  const evaluatePosture = (data) => {
    const upperPitch = Number(data.upperPitch ?? 0);
    const upperRoll = Number(data.upperRoll ?? 0);
    const lowerPitch = Number(data.lowerPitch ?? 0);
    const lowerRoll = Number(data.lowerRoll ?? 0);
    const staticMinutes = Number(data.staticMinutes ?? 0);

    if (upperPitch > 15 || lowerPitch > 15) {
      return "Forward leaning";
    }

    if (Math.abs(upperRoll) > 10 || Math.abs(lowerRoll) > 10) {
      return "Lateral tilt";
    }

    if (staticMinutes >= 30) {
      return "Prolonged static posture";
    }

    return data.postureState || "Neutral posture";
  };

  const shouldTriggerAlert = (data) => {
    const upperPitch = Math.abs(Number(data.upperPitch ?? 0));
    const upperRoll = Math.abs(Number(data.upperRoll ?? 0));
    const lowerPitch = Math.abs(Number(data.lowerPitch ?? 0));
    const lowerRoll = Math.abs(Number(data.lowerRoll ?? 0));
    const staticMinutes = Number(data.staticMinutes ?? 0);

    return (
      upperPitch > 20 ||
      upperRoll > 15 ||
      lowerPitch > 20 ||
      lowerRoll > 15 ||
      staticMinutes >= 30
    );
  };

  const connectSerial = async () => {
    if (!("serial" in navigator)) {
      alert("Web Serial is not supported in this browser. Please use desktop Chrome or Edge.");
      return;
    }

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      portRef.current = port;
      keepReadingRef.current = true;
      setConnected(true);
      setConnectionMessage("Sensor connected. Reading live data from ESP32...");

      const reader = port.readable.getReader();
      readerRef.current = reader;

      const decoder = new TextDecoder();
      let buffer = "";

      while (keepReadingRef.current) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          const parsed = parseSensorLine(line);

          if (parsed) {
            const nextData = {
              upperPitch: Number(parsed.upperPitch ?? 0),
              upperRoll: Number(parsed.upperRoll ?? 0),
              lowerPitch: Number(parsed.lowerPitch ?? 0),
              lowerRoll: Number(parsed.lowerRoll ?? 0),
              staticMinutes: Number(parsed.staticMinutes ?? 0),
              postureState: evaluatePosture(parsed),
            };

            setSensorData(nextData);

            if (recording && shouldTriggerAlert(nextData)) {
              setShowAlert(true);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setConnectionMessage("Connection failed or was cancelled.");
      setConnected(false);
    }
  };

  const disconnectSerial = async () => {
    try {
      keepReadingRef.current = false;

      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current.releaseLock();
        readerRef.current = null;
      }

      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }
    } catch (error) {
      console.error(error);
    }

    setConnected(false);
    setRecording(false);
    setConnectionMessage("Sensor disconnected. Tap the Bluetooth icon to reconnect.");
  };

  const toggleConnection = async () => {
    if (connected) {
      await disconnectSerial();
    } else {
      await connectSerial();
    }
  };

  const calibrateNeutral = () => {
    baselineRef.current = {
      upperPitch: sensorData.upperPitch,
      upperRoll: sensorData.upperRoll,
      lowerPitch: sensorData.lowerPitch,
      lowerRoll: sensorData.lowerRoll,
    };

    setConnectionMessage("Neutral posture calibrated using current sensor position.");
  };

  const triggerPostureAlert = () => {
    setShowAlert(true);
  };

  return (
    <section className="screen">
      <div className="header-row">
        <div>
          <h1>Connect</h1>
          <p className="muted">Prototype sensor connection and live posture data</p>
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
              SpineX detected a posture pattern that may need attention. Please adjust
              your sitting position or take a short stretching break.
            </p>

            <div className="alert-suggestion">
              <strong>Suggested action:</strong>
              <span> Sit upright, relax your shoulders, and move gently for 30 seconds.</span>
            </div>

            <button className="primary-btn" onClick={() => setShowAlert(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="card connect-hero">
        <button
          className={`bluetooth-circle bluetooth-clickable ${
            connected ? "bluetooth-connected" : ""
          }`}
          onClick={toggleConnection}
          aria-label="Toggle SpineX sensor connection"
        >
          <Bluetooth size={72} />
        </button>

        <h2>{connected ? "SpineX Sensor Connected" : "Ready to pair"}</h2>
        <p className="muted">{connectionMessage}</p>
        <p className="muted">
          MVP prototype uses USB Serial through Chrome. Future product will use Bluetooth Low Energy.
        </p>

        <div className="button-row">
          <button className="secondary-btn" onClick={calibrateNeutral}>
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
            <div className="metric-value">{sensorData.upperPitch.toFixed(1)}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Upper roll</div>
            <div className="metric-value">{sensorData.upperRoll.toFixed(1)}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Lower pitch</div>
            <div className="metric-value">{sensorData.lowerPitch.toFixed(1)}°</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Lower roll</div>
            <div className="metric-value">{sensorData.lowerRoll.toFixed(1)}°</div>
          </div>
        </div>

        <div className="insight-box">
          Current posture state: <strong>{sensorData.postureState}</strong>. Static posture timer:{" "}
          <strong>{sensorData.staticMinutes} min</strong>.
        </div>
      </div>

      <p className="disclaimer">
        *The IMU sensors estimate posture-related movement angles, not clinical Cobb angle or diagnostic spinal measurements.
      </p>
    </section>
  );
}