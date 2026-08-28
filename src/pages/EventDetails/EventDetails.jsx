import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import eventsData from "../../data/events.json";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import {
  showBookingSuccessAlert,
  showAlreadyBookedAlert,
  showCancelBookingConfirmDialog,
  showBookingCancelledAlert,
  showAuthRequiredAlert,
  showConflictWarningAlert,
} from "../../utils/alerts";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, registerEvent, unregisterEvent, isRegistered, getConflictingEvent } = useAuth();

  const event = eventsData.find((evt) => evt.id === id);

  const [isProcessing, setIsProcessing] = useState(false);

  const registered = event ? isRegistered(event.id) : false;
  const conflictingEvent = event ? getConflictingEvent(event) : null;
  const isClosed = event ? (event.status === "Closed" || event.seatsLeft === 0) : false;

  // Auto-book after successful registration & login sequence
  useEffect(() => {
    if (user && location.state?.autoBook && event && !registered && !isProcessing) {
      const executeAutoBook = async () => {
        setIsProcessing(true);
        try {
          let res = registerEvent(event);

          if (res.conflict) {
            const existingSlot = `${res.conflictingEvent.startTime} - ${res.conflictingEvent.endTime}`;
            const newSlot = `${event.startTime} - ${event.endTime}`;
            const confirmConflict = await showConflictWarningAlert(
              event.title,
              res.conflictingEvent.title,
              event.date,
              existingSlot,
              newSlot
            );
            if (confirmConflict) {
              res = registerEvent(event, true);
            } else {
              return;
            }
          }

          if (res.success) {
            const goToMyEvents = await showBookingSuccessAlert(event.title);
            if (goToMyEvents) {
              navigate("/my-events");
            }
          } else if (res.alreadyBooked) {
            await showAlreadyBookedAlert(event.title);
          }
        } finally {
          setIsProcessing(false);
          // Clear autoBook state from location
          navigate(location.pathname, { replace: true, state: {} });
        }
      };

      executeAutoBook();
    }
  }, [user, location.state?.autoBook, event?.id]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl">🔍</div>
        <h1 className="text-3xl font-extrabold text-base-content">Event Not Found</h1>
        <p className="text-base-content/70">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="btn btn-primary rounded-xl px-6">
          ← Back to All Events
        </Link>
      </div>
    );
  }

  const handleToggleRegistration = async () => {
    if (!user) {
      const loginConfirmed = await showAuthRequiredAlert();
      if (loginConfirmed) {
        navigate("/login", { state: { from: location, autoBook: true } });
      }
      return;
    }

    setIsProcessing(true);
    try {
      if (registered) {
        const result = await showAlreadyBookedAlert(event.title);
        if (result.isConfirmed) {
          navigate("/my-events");
        } else if (result.isDenied) {
          const confirmedCancel = await showCancelBookingConfirmDialog(event.title);
          if (confirmedCancel) {
            unregisterEvent(event.id);
            showBookingCancelledAlert(event.title);
          }
        }
      } else {
        let res = registerEvent(event);

        if (res.conflict) {
          const existingSlot = `${res.conflictingEvent.startTime} - ${res.conflictingEvent.endTime}`;
          const newSlot = `${event.startTime} - ${event.endTime}`;
          const confirmConflict = await showConflictWarningAlert(
            event.title,
            res.conflictingEvent.title,
            event.date,
            existingSlot,
            newSlot
          );
          if (confirmConflict) {
            res = registerEvent(event, true);
          } else {
            return;
          }
        }

        if (res.success) {
          const goToMyEvents = await showBookingSuccessAlert(event.title);
          if (goToMyEvents) {
            navigate("/my-events");
          }
        } else if (res.alreadyBooked) {
          const result = await showAlreadyBookedAlert(event.title);
          if (result.isConfirmed) {
            navigate("/my-events");
          }
        } else if (res.requireLogin) {
          const loginConfirmed = await showAuthRequiredAlert();
          if (loginConfirmed) {
            navigate("/login", { state: { from: location, autoBook: true } });
          }
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* ⬅️ Back Navigation Bar */}
      <div className="bg-base-200/50 border-b border-base-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/70 hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </button>
        </div>
      </div>

      {/* 🖼️ Hero Banner Header */}
      <section className="relative h-72 sm:h-96 w-full overflow-hidden bg-base-300">
        <img
          src={event.image}
          alt={event.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-black/40 to-black/20" />

        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="badge badge-primary text-white font-bold px-3 py-2 text-xs shadow-md">
              {event.category}
            </span>
            <StatusBadge status={event.status} />
            {registered && (
              <span className="badge bg-emerald-500 text-white font-bold px-3 py-2 text-xs shadow-md flex items-center gap-1">
                ✓ Registered
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-md max-w-4xl leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* 📑 Detailed Content & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-base-content border-b border-base-200 pb-3 flex items-center gap-2">
                <span>📝</span> About This Event
              </h2>
              <p className="text-base-content/80 text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-base-200/50 border border-base-200">
                  <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Organized By</span>
                  <p className="font-bold text-base text-base-content mt-1">{event.organizer}</p>
                </div>
                <div className="p-4 rounded-2xl bg-base-200/50 border border-base-200">
                  <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Available Seats</span>
                  <p className="font-bold text-base text-primary mt-1">
                    {event.seatsLeft > 0 ? `${event.seatsLeft} Seats Remaining` : "Fully Booked"}
                  </p>
                </div>
              </div>
            </div>

            {/* Speaker Information Card */}
            <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-base-content border-b border-base-200 pb-3 flex items-center gap-2">
                <span>🎙️</span> Featured Speaker
              </h2>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                  {event.speaker ? event.speaker.charAt(0) : "S"}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-base-content">{event.speaker}</h3>
                  <p className="text-xs text-base-content/70">Guest Speaker & Industry Expert</p>
                </div>
              </div>
            </div>

            {/* Agenda Timeline Preview */}
            <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-base-content border-b border-base-200 pb-3 flex items-center gap-2">
                <span>🕒</span> Event Schedule Breakdown
              </h2>

              <ul className="timeline timeline-vertical timeline-compact">
                <li>
                  <div className="timeline-middle text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box bg-base-200/60 font-semibold border-none text-xs">
                    {event.startTime} — Welcome & Introduction
                  </div>
                  <hr className="bg-primary" />
                </li>
                <li>
                  <hr className="bg-primary" />
                  <div className="timeline-middle text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box bg-base-200/60 font-semibold border-none text-xs">
                    Keynote Presentation & Hands-on Session
                  </div>
                  <hr className="bg-primary" />
                </li>
                <li>
                  <hr className="bg-primary" />
                  <div className="timeline-middle text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box bg-base-200/60 font-semibold border-none text-xs">
                    {event.endTime} — Q&A & Networking Wrap-up
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sticky Sidebar (Registration & Details Card) */}
          <div className="space-y-6">
            <div className="bg-base-100 p-6 rounded-3xl border border-base-200 shadow-lg sticky top-24 space-y-6">
              <h3 className="font-bold text-lg text-base-content border-b border-base-200 pb-3">
                Event Logistics
              </h3>

              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    📅
                  </div>
                  <div>
                    <span className="text-xs text-base-content/60 font-medium">Date</span>
                    <p className="font-bold text-sm text-base-content">{event.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    ⏰
                  </div>
                  <div>
                    <span className="text-xs text-base-content/60 font-medium">Time Slot</span>
                    <p className="font-bold text-sm text-base-content">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    📍
                  </div>
                  <div>
                    <span className="text-xs text-base-content/60 font-medium">Venue</span>
                    <p className="font-bold text-sm text-base-content">{event.venue}</p>
                  </div>
                </div>
              </div>

              {/* 🎯 Register Interest Button */}
              <div className="pt-4 border-t border-base-200 space-y-3">
                {!registered && conflictingEvent && (
                  <div className="bg-warning/15 border border-warning/30 text-warning-content rounded-2xl p-3.5 flex items-start gap-2.5 text-xs shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <span className="font-bold text-base-content block">Schedule Conflict Warning!</span>
                      <p className="text-base-content/80 mt-0.5 leading-relaxed">
                        You already have <strong>"{conflictingEvent.title}"</strong> booked on <strong>{event.date}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleToggleRegistration}
                  disabled={(isClosed && !registered) || isProcessing}
                  className={`btn w-full btn-lg rounded-2xl font-bold shadow-md transition-all ${
                    registered
                      ? "btn-error text-white"
                      : isClosed
                        ? "bg-red-600 hover:bg-red-600 text-white border-none cursor-not-allowed opacity-90"
                        : "btn-primary shadow-primary/25"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-md"></span>
                      <span>Processing...</span>
                    </div>
                  ) : registered ? (
                    <>
                      <span>Cancel Registration</span>
                    </>
                  ) : isClosed ? (
                    "Registration Closed"
                  ) : (
                    <>
                      <span>Book & Save Event</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </button>

                {registered ? (
                  <p className="text-xs text-center text-emerald-600 font-semibold flex items-center justify-center gap-1">
                    ✓ Registered for this event! View in <Link to="/my-events" className="underline">My Events</Link>.
                  </p>
                ) : (
                  <p className="text-xs text-center text-base-content/60">
                    {user ? "Saved securely to your account." : "Account required to book & store."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
