import React, { useState } from "react";
import { Search, Trash2, Download, Mail, Clock } from "lucide-react";
import type { Subscriber } from "../../types/supabaseType";
import { MOCK_SUBSCRIBERS } from "../data/mockData";
import toast from "react-hot-toast";

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] =
    useState<Subscriber[]>(MOCK_SUBSCRIBERS);
  const [search, setSearch] = useState("");

  const remove = (id: string, email: string) => {
    if (!confirm(`Remove ${email} from subscribers?`)) return;
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    toast.success("Subscriber removed");
    // TODO: supabase.from("subscribers").delete().eq("id", id)
  };

  const exportCSV = () => {
    const rows = [
      ["Email", "Subscribed At"],
      ...filtered.map((s) => [
        s.email,
        new Date(s.created_at).toLocaleString(),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `akoy360-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
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
            Subscribers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {subscribers.length} newsletter subscriber
            {subscribers.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all disabled:opacity-40"
          style={{ color: "var(--brand-deep)" }}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            No results found.
          </div>
        ) : (
          <>
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Showing {filtered.length} of {subscribers.length}
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">
                    Subscribed
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(0,16,80,0.06)" }}
                        >
                          <Mail
                            className="w-3.5 h-3.5"
                            style={{ color: "var(--brand-deep)" }}
                          />
                        </div>
                        <span className="font-medium text-slate-700">
                          {s.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs hidden sm:table-cell">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(s.created_at).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => remove(s.id, s.email)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscribers;
