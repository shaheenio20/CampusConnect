import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../../components/StatusBadge";
import { showCancelBookingConfirmDialog, showBookingCancelledAlert } from "../../utils/alerts";

const MyEvents = () => {
  const { user, registeredEvents, unregisterEvent } = useAuth();

  const handleCancelBooking = async (eventId, eventTitle) => {
    const confirmed = await showCancelBookingConfirmDialog(eventTitle);
    if (confirmed) {
      unregisterEvent(eventId);
      showBookingCancelledAlert(eventTitle);
    }
  };

  // Conflict Detection: check if any 2 or more registered events share the same date
  const detectConflicts = () => {
    const grouped = {};
    registeredEvents.forEach((evt) => {
      if (!grouped[evt.date]) {
        grouped[evt.date] = [];
      }
      grouped[evt.date].push(evt);
    });

    const conflictGroups = [];
    Object.keys(grouped).forEach((date) => {
      if (grouped[date].length > 1) {
        conflictGroups.push({ date, events: grouped[date] });
      }
    });
    return conflictGroups;
  };

  const conflicts = detectConflicts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[75vh]">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10 p-6 sm:p-8 rounded-3xl border border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary text-white font-bold px-3 py-1 text-xs">
              {user?.displayName || user?.email}'s Schedule
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
            My Registered Events
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage your personal campus workshop schedule and monitor date conflicts.
          </p>
        </div>

        <Link
          to="/events"
          className="btn btn-primary rounded-2xl px-6 font-bold shadow-md shadow-primary/20 shrink-0"
        >
          + Add More Events
        </Link>
      </div>

      {/* Schedule Conflict Warning */}
      {conflicts.length > 0 && (
        <div className="alert bg-warning/15 border border-warning/30 shadow-lg rounded-2xl p-4 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="w-full space-y-1">
            <h3 className="font-bold text-sm text-base-content flex items-center gap-2">
              <span>Schedule Overlap Alert!</span>
              <span className="badge badge-sm badge-warning font-extrabold">{conflicts.length} Date Conflict{conflicts.length > 1 ? "s" : ""}</span>
            </h3>
            {conflicts.map((conf, idx) => (
              <p key={idx} className="text-xs text-base-content/80 mt-1 leading-relaxed">
                You have <strong>{conf.events.length} events</strong> scheduled on <strong>{conf.date}</strong>:{" "}
                {conf.events.map((e, i) => (
                  <span key={e.id}>
                    <strong className="text-primary font-semibold">"{e.title}"</strong> ({e.startTime}){i < conf.events.length - 1 ? " & " : ""}
                  </span>
                ))}. Please review your schedule.
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {registeredEvents.length === 0 ? (
        <div className="bg-base-100 border border-base-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl">
            📅
          </div>
          <h2 className="text-2xl font-bold text-base-content">No Events Booked Yet</h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            You haven't registered for any campus workshops or programming contests yet. Browse upcoming events to start building your custom schedule!
          </p>
          <Link to="/events" className="btn btn-primary rounded-2xl px-8 font-bold shadow-md">
            Browse All Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
              <span className="text-xs font-semibold text-base-content/60 uppercase">Total Booked</span>
              <p className="text-2xl font-black text-primary mt-1">{registeredEvents.length} Events</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
              <span className="text-xs font-semibold text-base-content/60 uppercase">Status</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Confirmed</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100 border border-base-200 shadow-sm col-span-2 sm:col-span-1">
              <span className="text-xs font-semibold text-base-content/60 uppercase">Account UID</span>
              <p className="text-xs font-bold text-base-content/70 mt-1 truncate">{user?.uid}</p>
            </div>
          </div>

          {/* Booked Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event) => {
              const hasConflict = registeredEvents.some((e) => e.date === event.date && e.id !== event.id);
              return (
                <div
                  key={event.id}
                  className={`bg-base-100 border rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl transition-all ${
                    hasConflict ? "border-warning ring-2 ring-warning/20" : "border-base-200"
                  }`}
                >
                  <div>
                    <div className="relative h-44 w-full">
                      <img
                        src={event.image}
                        alt={event.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="badge badge-primary text-white font-bold text-xs shadow-md">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {hasConflict && (
                          <span className="badge bg-amber-500 text-slate-900 font-bold text-xs shadow-md border-none animate-pulse">
                            ⚠️ Overlap
                          </span>
                        )}
                        <StatusBadge status={event.status} />
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                    <h3 className="font-bold text-lg text-base-content line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-xs text-base-content/70">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span className="font-semibold text-base-content">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🎙️</span>
                        <span className="truncate">{event.speaker}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2 border-t border-base-200/60 mt-4">
                  <div className="flex items-center justify-between gap-2 pt-3">
                    <Link
                      to={`/events/${event.id}`}
                      className="btn btn-outline btn-sm rounded-xl flex-1 font-semibold"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleCancelBooking(event.id, event.title)}
                      className="btn btn-error btn-sm rounded-xl text-white font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
