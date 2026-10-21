import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Grid3X3, Star, Mail,
  TrendingUp, Clock, ArrowUpRight,
} from "lucide-react";
import { MOCK_INQUIRIES, MOCK_TESTIMONIALS, MOCK_SUBSCRIBERS, MOCK_DIVISIONS } from "../data/mockData";

const statusColors: Record<string, string> = {
  unread: "#ef4444",
  read: "#f59e0b",
  responded: "#10b981",
};

const Dashboard: React.FC = () => {
  const unread = MOCK_INQUIRIES.filter(i => i.status === "unread").length;
  const recentInquiries = MOCK_INQUIRIES.slice(0, 5);

  const stats = [
    {
      label: "Unread Inquiries",
      value: unread,
      icon: <MessageSquare className="w-5 h-5" />,
      to: "/admin/inquiries",
      accent: "#ef4444",
      sub: `${MOCK_INQUIRIES.length} total`,
    },
    {
      label: "Divisions",
      value: MOCK_DIVISIONS.length,
      icon: <Grid3X3 className="w-5 h-5" />,
      to: "/admin/divisions",
      accent: "var(--brand-gold)",
      sub: "editable content",
    },
    {
      label: "Testimonials",
      value: MOCK_TESTIMONIALS.length,
      icon: <Star className="w-5 h-5" />,
      to: "/admin/testimonials",
      accent: "#10b981",
      sub: `${MOCK_TESTIMONIALS.filter(t => t.published).length} published`,
    },
    {
      label: "Subscribers",
      value: MOCK_SUBSCRIBERS.length,
      icon: <Mail className="w-5 h-5" />,
      to: "/admin/subscribers",
      accent: "var(--brand-blue)",
      sub: "newsletter list",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>
            Welcome back
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>
            Admin
          </h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400">
            {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--brand-deep)' }}>AKOY 360 Admin Panel</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: s.accent }}>
                {s.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
            <p className="text-3xl font-extrabold mt-3" style={{ color: 'var(--brand-deep)' }}>{s.value}</p>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">{s.label}</p>
            {s.sub && <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>}
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--brand-deep)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "View Inquiries",       to: "/admin/inquiries",    icon: <MessageSquare className="w-4 h-4" /> },
            { label: "Edit Divisions",        to: "/admin/divisions",    icon: <Grid3X3 className="w-4 h-4" /> },
            { label: "Manage Testimonials",   to: "/admin/testimonials", icon: <Star className="w-4 h-4" /> },
            { label: "Site Settings",         to: "/admin/settings",     icon: <TrendingUp className="w-4 h-4" /> },
          ].map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-semibold hover:shadow-sm transition-all"
              style={{ color: 'var(--brand-deep)' }}
            >
              <span style={{ color: 'var(--brand-gold)' }}>{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Inquiries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--brand-deep)' }}>
            Recent Inquiries
          </h2>
          <Link to="/admin/inquiries" className="text-xs font-semibold hover:underline" style={{ color: 'var(--brand-gold)' }}>
            View all →
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Name</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Division</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--brand-deep)' }}>{inq.full_name}</td>
                  <td className="px-5 py-3.5 text-slate-500 capitalize hidden sm:table-cell">{inq.division}</td>
                  <td className="px-5 py-3.5 text-slate-400 hidden md:table-cell">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: statusColors[inq.status] ?? "#94a3b8" }}
                    >
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
