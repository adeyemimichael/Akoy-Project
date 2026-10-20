import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Grid3X3,
  Star,
  Image,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Logo } from "../../components/Logo";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { to: "/admin/divisions", label: "Divisions", icon: Grid3X3 },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth bypassed — sign out is a no-op for now
  const handleSignOut = () => navigate("/admin/dashboard");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo size="sm" />
        <p className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--brand-gold)' }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? "text-[#001050]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`
            }
            style={({ isActive }) =>
              isActive ? { background: 'var(--brand-gold)', color: 'var(--brand-deep)' } : undefined
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3 h-3" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User & Sign Out */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        <div className="px-2">
          <p className="text-[11px] text-slate-400 truncate">AKOY 360 Admin</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: '#F4F6F9' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 fixed top-0 left-0 h-full z-30"
        style={{ background: 'var(--brand-deep)', borderRight: '1px solid rgba(253,191,2,0.10)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative w-64 flex flex-col h-full z-50"
            style={{ background: 'var(--brand-deep)' }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-20"
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo size="sm" />
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
