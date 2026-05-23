import { NavLink } from "react-router-dom";
import { Home, PersonStanding, Bluetooth, FileText, HeartPulse } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: PersonStanding },
  { to: "/connect", label: "Connect", icon: Bluetooth },
  { to: "/reports", label: "Report", icon: FileText },
  { to: "/health-record", label: "Health", icon: HeartPulse },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className="nav-item">
          <Icon size={18} strokeWidth={2.4} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}