import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="font-semibold text-slate-800">
          Job Application Tracker
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-slate-500 hover:text-slate-800">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2 text-slate-600">
          <UserCircle size={28} />

          <span className="hidden font-medium sm:block">
            Tazim
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;