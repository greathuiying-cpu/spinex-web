import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Connect from "./pages/Connect";
import Reports from "./pages/Reports";
import HealthRecord from "./pages/HealthRecord";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/health-record" element={<HealthRecord />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;