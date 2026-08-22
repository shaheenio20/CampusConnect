import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-bold border-b-2 border-primary rounded-none px-3 py-2"
      : "text-base-content/80 hover:text-primary font-medium transition-colors px-3 py-2";

  return (
    <div className="bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto navbar px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-52 p-3 shadow-xl border border-base-200 gap-1"
            >
              <li>
                <NavLink to="/" className={activeStyle}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/events" className={activeStyle}>Events</NavLink>
              </li>
              <li>
                <NavLink to="/my-events" className={activeStyle}>My Events</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={activeStyle}>About</NavLink>
              </li>
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              C
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-base-content">
              Campus<span className="text-primary">Connect</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <NavLink to="/" className={activeStyle}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/events" className={activeStyle}>Events</NavLink>
            </li>
            <li>
              <NavLink to="/my-events" className={activeStyle}>My Events</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={activeStyle}>About</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link
            to="/events"
            className="btn btn-primary btn-sm rounded-xl px-5 shadow-md shadow-primary/20 hover:shadow-lg transition-all font-semibold"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
