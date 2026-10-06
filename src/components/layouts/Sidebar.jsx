import {
  LayoutDashboard,
  BriefcaseBusiness,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    icon: BriefcaseBusiness,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white md:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-blue-600">JobTrack</h1>
        </div>

        <nav className="flex-1 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <BriefcaseBusiness size={20} />
            <span className="font-medium">Applications</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
