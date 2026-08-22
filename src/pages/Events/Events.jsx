import React from "react";
import eventsData from "../../data/events.json";
import EventCard from "../../components/EventCard";

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-base-content">All Events & Workshops</h1>
        <p className="text-sm text-base-content/70 mt-1">Browse upcoming campus events, contests, and seminars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
