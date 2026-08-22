import React from "react";
import { Link } from "react-router-dom";

const MyEvents = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-base-content">My Registered Events</h1>
        <p className="text-sm text-base-content/70 mt-1">Manage your saved schedule and check for overlap conflicts.</p>
      </div>

      <div className="bg-base-200/50 border border-base-300 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
        <div className="text-5xl">📅</div>
        <h2 className="text-xl font-bold text-base-content">No Registered Events Yet</h2>
        <p className="text-sm text-base-content/70">
          Explore campus workshops and register your interest to build your custom schedule.
        </p>
        <Link to="/events" className="btn btn-primary btn-sm rounded-xl px-6">
          Browse Events
        </Link>
      </div>
    </div>
  );
};

export default MyEvents;
