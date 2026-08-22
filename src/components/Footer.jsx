import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-md">
              C
            </div>
            <span className="font-extrabold text-xl tracking-tight text-base-content">
              Campus<span className="text-primary">Connect</span>
            </span>
          </Link>
          <p className="text-sm text-base-content/70 leading-relaxed">
            The all-in-one student event platform for discovering workshops, programming contests, tech seminars, and university engagement activities.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-3 text-base-content">Quick Links</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-colors">All Events</Link></li>
            <li><Link to="/my-events" className="hover:text-primary transition-colors">My Events</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Portal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-3 text-base-content">Event Categories</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li><Link to="/events?category=Workshop" className="hover:text-primary transition-colors">Workshops</Link></li>
            <li><Link to="/events?category=Programming" className="hover:text-primary transition-colors">Programming Contests</Link></li>
            <li><Link to="/events?category=Seminar" className="hover:text-primary transition-colors">Seminars & Talks</Link></li>
            <li><Link to="/events?category=Career" className="hover:text-primary transition-colors">Career Fairs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-3 text-base-content">Stay Updated</h3>
          <p className="text-sm text-base-content/70 mb-3">
            Subscribe to get instant notifications on new university events.
          </p>
          <div className="join w-full">
            <input type="email" placeholder="student@university.edu" className="input input-bordered input-sm join-item w-full" />
            <button className="btn btn-primary btn-sm join-item">Join</button>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 pt-6 text-center text-xs text-base-content/60">
        <p>© 2026 CampusConnect Portal. All rights reserved. Built for University Students.</p>
      </div>
    </footer>
  );
};

export default Footer;
