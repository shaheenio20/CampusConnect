
const StatusBadge = ({ status }) => {
  if (status === "Open") {
    return <span className="badge badge-success text-white font-semibold text-xs px-3 py-2 shadow-sm">Open</span>;
  }
  if (status === "Almost Full") {
    return <span className="badge badge-warning text-slate-900 font-semibold text-xs px-3 py-2 shadow-sm">Almost Full</span>;
  }
  return <span className="badge badge-error text-white font-semibold text-xs px-3 py-2 shadow-sm">Closed</span>;
};

export default StatusBadge;
