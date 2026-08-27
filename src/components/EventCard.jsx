import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useAuth } from "../context/AuthContext";

const EventCard = ({ event }) => {
  const { isRegistered, getConflictingEvent } = useAuth();
  const registered = isRegistered ? isRegistered(event.id) : false;
  const conflictingEvent = !registered && getConflictingEvent ? getConflictingEvent(event) : null;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full rounded-2xl overflow-hidden">
      <figure className="relative h-48 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="badge bg-primary text-white border-none font-medium px-3 py-2 text-xs shadow-md">
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {registered ? (
            <span className="badge bg-emerald-500 text-white font-bold px-2 py-1 text-[10px] shadow-md border-none">
              ✓ Registered
            </span>
          ) : conflictingEvent ? (
            <span
              className="badge bg-amber-500 text-slate-900 font-bold px-2 py-1 text-[10px] shadow-md border-none cursor-help"
              title={`Time conflict with "${conflictingEvent.title}" (${conflictingEvent.startTime} - ${conflictingEvent.endTime})`}
            >
              ⚠️ Time Overlap
            </span>
          ) : null}
          <StatusBadge status={event.status} />
        </div>
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date} • {event.startTime}
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="card-title text-lg font-bold text-base-content line-clamp-2 hover:text-primary transition-colors mb-2">
            {event.title}
          </h2>
          <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-3 border-t border-base-200">
          <div className="flex items-center text-xs text-base-content/80 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate font-medium">{event.speaker}</span>
          </div>

          <div className="flex items-center text-xs text-base-content/70 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center justify-between mt-4 pt-2">
            <span className="text-xs font-semibold text-primary">
              {event.seatsLeft > 0 ? `${event.seatsLeft} seats left` : "Full"}
            </span>
            <Link
              to={`/events/${event.id}`}
              className="btn btn-primary btn-sm rounded-xl px-4 gap-1 shadow-md hover:shadow-lg transition-all"
            >
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
