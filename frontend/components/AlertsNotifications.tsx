const alerts = [
  {
    title: "1 Medicines Expired",
    desc: "Remove expired medicines from inventory",
    type: "error", // red
    items: ["Vitamin D (BATCHEXP5)"],
  },
  {
    title: "3 Items Low on Stock",
    desc: "These items need to be reordered soon",
    type: "warning", // yellow
    items: ["headache (BATCHEXP6)", "Vitamin D (A123)"],
  },
  {
    title: "3 Items Low on Stock",
    desc: "These items need to be reordered soon",
    type: "warning", // yellow
    items: ["headache (BATCHEXP6)", "Vitamin D (A123)"],
  },
  {
    title: "3 Items Low on Stock",
    desc: "These items need to be reordered soon",
    type: "warning", // yellow
    items: ["headache (BATCHEXP6)", "Vitamin D (A123)"],
  },
  {
    title: "3 Items Low on Stock",
    desc: "These items need to be reordered soon",
    type: "warning", // yellow
    items: ["headache (BATCHEXP6)", "Vitamin D (A123)"],
  },
  {
    title: "3 Items Low on Stock",
    desc: "These items need to be reordered soon",
    type: "warning", // yellow
    items: ["headache (BATCHEXP6)", "Vitamin D (A123)"],
  },
];

export function AlertsNotifications() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm h-96">
      {/* Fixed Header */}
      <div className="flex items-center gap-2 p-6 pb-4">
        <span className="text-orange-500">🔔</span>
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
          Alerts & Notifications
        </h3>
      </div>

      {/* Scrollable Data Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <div className="space-y-4">
          {alerts.map((alert, idx) => (
            <div key={idx} className="space-y-2">
              {/* Header Alert Box */}
              <div
                className={`p-3 rounded-lg border ${
                  alert.type === "error"
                    ? "bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 text-amber-700 dark:text-amber-400"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    {alert.type === "error" ? "🚫" : "⚠️"}
                  </span>
                  <div>
                    <p className="text-xs font-bold">{alert.title}</p>
                    <p className="text-[10px] opacity-80">{alert.desc}</p>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              {alert.items.map((item) => (
                <div
                  key={item}
                  className={`p-3 rounded-lg border text-xs font-medium ${
                    alert.type === "error"
                      ? "bg-red-50/50 border-red-100 dark:bg-red-950/10 dark:border-red-900/20 text-red-800 dark:text-red-300"
                      : "bg-amber-50/50 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/20 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
