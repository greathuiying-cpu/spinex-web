import { CloudUpload, ExternalLink, FileJson, FileText, ShieldCheck } from "lucide-react";
import { exportFhirJson } from "../utils/fhirExport";
import { downloadReportPdf } from "../utils/reportGenerator";

export default function HealthRecord() {
  return (
    <section className="screen">
      <div className="header-row">
        <div>
          <h1>My Health Record</h1>
          <p className="muted">Clinician sharing and future My Health Record integration</p>
        </div>
        <div className="avatar">F</div>
      </div>

      <div className="card health-upload">
        <CloudUpload size={44} />
        <h2>Your weekly report export</h2>
        <p className="muted">
          SpineX can generate a clinician-readable PDF now. Future integration may support My Health Record or clinic EHR pathways.
        </p>

        <div className="button-row">
          <button className="dark-btn" onClick={() => downloadReportPdf("weekly")}>
            <FileText size={16} /> Download PDF
          </button>
          <button className="secondary-btn" onClick={exportFhirJson}>
            <FileJson size={16} /> Export FHIR JSON
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Future My Health Record Workflow</h2>
        <div className="workflow">
          <div>User consent</div>
          <span>→</span>
          <div>FHIR Bundle</div>
          <span>→</span>
          <div>My Health Record / EHR</div>
          <span>→</span>
          <div>Clinician review</div>
        </div>

        <button className="secondary-btn disabled-btn" disabled>
          <ExternalLink size={16} /> Connect MyGov / My Health Record
        </button>

        <div className="insight-box">
          <ShieldCheck size={16} /> Future integration requires user consent, security review, identity controls, and approved interoperability pathways.
        </div>
      </div>

      <p className="disclaimer">
        Current MVP does not automatically upload health information. PDF and FHIR-style export are used for demonstration and future system design.
      </p>
    </section>
  );
}