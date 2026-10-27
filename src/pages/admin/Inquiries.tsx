import React, { useState } from "react";
import {
  Search, Trash2, Mail, Phone, Clock, ChevronDown, X, MessageCircle,
} from "lucide-react";
import type { Inquiry } from "../../types/supabaseType";
import { useInquiries } from "../../hooks";
import toast from "react-hot-toast";

// Strip everything except digits, then build a wa.me link
const whatsappLink = (phone: string, inquiry: Inquiry) => {
  const digits = phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${inquiry.full_name}, this is AKOY 360. Thank you for your inquiry regarding our ${inquiry.division} services. We'd be happy to assist you. How can we help?`,
  );
  return `https://wa.me/${digits}?text=${message}`;
};

const STATUS_OPTIONS = ["all", "unread", "read", "responded"] as const;
const DIVISION_OPTIONS = [
  "all",
  "properties",
  "construction",
  "travel",
  "logistics",
  "business-services",
  "diaspora",
];

const statusColors: Record<string, { bg: string; text: string }> = {
  unread: { bg: "#fee2e2", text: "#dc2626" },
  read: { bg: "#fef3c7", text: "#d97706" },
  responded: { bg: "#d1fae5", text: "#059669" },
};

const Inquiries: React.FC = () => {
  const { inquiries, loading, updateStatus: hookUpdateStatus, deleteInquiry: hookDeleteInquiry } = useInquiries();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [divisionFilter, setDivisionFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    const { error } = await hookUpdateStatus(id, status);
    if (error) { toast.error("Failed to update status"); return; }
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    toast.success("Status updated");
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    const { error } = await hookDeleteInquiry(id);
    if (error) { toast.error("Failed to delete"); return; }
    if (selected?.id === id) setSelected(null);
    toast.success("Inquiry deleted");
  };

  const filtered = inquiries
    .filter((i) => statusFilter === "all" || i.status === statusFilter)
    .filter((i) => divisionFilter === "all" || i.division === divisionFilter)
    .filter(
      (i) =>
        i.full_name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase()),
    );

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white text-slate-700 focus:border-slate-400 transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--brand-gold)" }}
        >
          Management
        </p>
        <h1
          className="text-2xl font-extrabold font-display mt-0.5"
          style={{ color: "var(--brand-deep)" }}
        >
          Inquiries
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Contact form submissions from clients across all divisions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${inputBase} pr-8 appearance-none min-w-[130px]`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all"
                  ? "All Status"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className={`${inputBase} pr-8 appearance-none min-w-[160px]`}
          >
            {DIVISION_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d === "all"
                  ? "All Divisions"
                  : d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400 text-sm animate-pulse">Loading inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">
              No inquiries found.
            </div>
          ) : (
            <div className="overflow-x-auto">              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">
                      Division
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq) => (
                    <tr
                      key={inq.id}
                      onClick={() => setSelected(inq)}
                      className={`border-b border-slate-50 last:border-0 cursor-pointer transition-colors ${selected?.id === inq.id ? "bg-slate-50" : "hover:bg-slate-50"}`}
                    >
                      <td className="px-5 py-3.5">
                        <p
                          className="font-semibold"
                          style={{ color: "var(--brand-deep)" }}
                        >
                          {inq.full_name}
                        </p>
                        <p className="text-xs text-slate-400">{inq.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 capitalize hidden sm:table-cell">
                        {inq.division}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-xs hidden md:table-cell">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(inq.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: statusColors[inq.status]?.bg,
                            color: statusColors[inq.status]?.text,
                          }}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteInquiry(inq.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 p-5 space-y-4 self-start sticky top-5">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className="font-bold text-base"
                  style={{ color: "var(--brand-deep)" }}
                >
                  {selected.full_name}
                </h3>
                <p className="text-xs text-slate-400 capitalize">
                  {selected.division} · {selected.country}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Mail
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--brand-gold)" }}
                />{" "}
                {selected.email}
              </a>
              <a
                href={`tel:${selected.phone}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Phone
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--brand-gold)" }}
                />{" "}
                {selected.phone}
              </a>
              <a
                href={whatsappLink(selected.phone, selected)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:opacity-80 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Open WhatsApp chat
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5" />{" "}
                {new Date(selected.created_at).toLocaleString()}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selected.message}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
                Update Status
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["unread", "read", "responded"] as Inquiry["status"][]).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className="py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border"
                      style={
                        selected.status === s
                          ? {
                              background: statusColors[s].bg,
                              color: statusColors[s].text,
                              borderColor: statusColors[s].text,
                            }
                          : {
                              background: "white",
                              color: "#94a3b8",
                              borderColor: "#e2e8f0",
                            }
                      }
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`mailto:${selected.email}?subject=Re: Your ${selected.division} inquiry to AKOY 360`}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                style={{
                  background: "var(--brand-deep)",
                  color: "var(--brand-gold)",
                }}
                onClick={() => updateStatus(selected.id, "responded")}
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
              <a
                href={whatsappLink(selected.phone, selected)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                style={{ background: "#25D366" }}
                onClick={() => updateStatus(selected.id, "responded")}
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button
                onClick={() => deleteInquiry(selected.id)}
                className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
