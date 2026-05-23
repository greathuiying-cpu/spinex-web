import { dailySummary } from "../data/sampleData";

export function exportFhirJson() {
  const fhirBundle = {
    resourceType: "Bundle",
    type: "collection",
    timestamp: new Date().toISOString(),
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: "spinex-demo-user",
          name: [{ text: "Demo User" }],
        },
      },
      {
        resource: {
          resourceType: "Device",
          id: "spinex-dual-imu-prototype",
          deviceName: [{ name: "SpineX dual-IMU prototype", type: "user-friendly-name" }],
        },
      },
      {
        resource: {
          resourceType: "Observation",
          id: "daily-spine-habit-score",
          status: "final",
          code: { text: "Daily Spine Habit Score" },
          valueQuantity: {
            value: dailySummary.dailyScore,
            unit: "score out of 100",
          },
        },
      },
      {
        resource: {
          resourceType: "Observation",
          id: "forward-flexion-duration",
          status: "final",
          code: { text: "Forward flexion duration" },
          valueQuantity: {
            value: dailySummary.forwardFlexionMinutes,
            unit: "minutes",
          },
        },
      },
    ],
  };

  const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "SpineX_FHIR_Demo_Bundle.json";
  link.click();
  URL.revokeObjectURL(url);
}