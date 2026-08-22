import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser, registeredEvents } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically close sidebar when navigation/route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsSidebarOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-bold bg-primary/10 rounded-xl px-4 py-2.5 flex items-center justify-between"
      : "text-base-content/80 hover:text-primary hover:bg-base-200/60 font-medium rounded-xl transition-colors px-4 py-2.5 flex items-center justify-between";

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto navbar px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          {/* Hamburger Icon to toggle Full Height Sidebar on mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="btn btn-ghost lg:hidden p-2 text-base-content"
            aria-label="Open Mobile Sidebar"
          >
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
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              C
            </div>
            <span className="font-extrabold lg:text-2xl text-lg tracking-tight text-base-content">
              Campus<span className="text-primary">Connect</span>
            </span>
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-bold border-b-2 border-primary rounded-none px-3 py-2 flex items-center gap-1.5" : "text-base-content/80 hover:text-primary font-medium transition-colors px-3 py-2 flex items-center gap-1.5")}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({ isActive }) => (isActive ? "text-primary font-bold border-b-2 border-primary rounded-none px-3 py-2 flex items-center gap-1.5" : "text-base-content/80 hover:text-primary font-medium transition-colors px-3 py-2 flex items-center gap-1.5")}>Events</NavLink>
            </li>
            <li>
              <NavLink to="/my-events" className={({ isActive }) => (isActive ? "text-primary font-bold border-b-2 border-primary rounded-none px-3 py-2 flex items-center gap-1.5" : "text-base-content/80 hover:text-primary font-medium transition-colors px-3 py-2 flex items-center gap-1.5")}>
                My Events
                {user && registeredEvents.length > 0 && (
                  <span className="badge badge-primary badge-sm text-white font-bold">
                    {registeredEvents.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary font-bold border-b-2 border-primary rounded-none px-3 py-2 flex items-center gap-1.5" : "text-base-content/80 hover:text-primary font-medium transition-colors px-3 py-2 flex items-center gap-1.5")}>About</NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: Auth buttons / User Profile Dropdown */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-primary/40 hover:border-primary transition-all p-0.5"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt={user.displayName || "User"}
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-3 w-60 p-3 shadow-2xl border border-base-200 space-y-1"
                >
                  <li className="p-2 bg-base-200/50 rounded-xl mb-1">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-bold text-sm text-base-content truncate max-w-[180px]">
                        {user.displayName || "Student User"}
                      </span>
                      <span className="text-xs text-base-content/60 truncate max-w-[180px]">
                        {user.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link to="/my-events" className="flex items-center justify-between font-medium">
                      <span>📅 My Registered Events</span>
                      <span className="badge badge-primary badge-sm text-white font-bold">
                        {registeredEvents.length}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="font-medium">
                      🔍 Explore All Events
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error font-semibold hover:bg-error/10 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Stable Log In button on Navbar for mobile & desktop */}
              <Link
                to="/login"
                className="btn btn-primary btn-sm rounded-xl font-bold px-4 text-white shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                Log In
              </Link>
              {/* Register button visible on desktop, in sidebar on mobile */}
              <Link
                to="/register"
                className="hidden lg:inline-flex btn btn-outline btn-sm rounded-xl px-4 border-base-300 font-semibold text-base-content hover:bg-base-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 📱 FULL HEIGHT MOBILE SIDEBAR DRAWER & BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          />

          {/* Full Height Sidebar Drawer Container */}
          <aside className="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 h-screen min-h-screen bg-base-100 shadow-2xl border-r border-base-200 p-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              {/* Top Header inside Sidebar with Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-base-200">
                <Link to="/" onClick={closeSidebar} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white font-black text-lg shadow-md">
                    C
                  </div>
                  <span className="font-extrabold text-xl tracking-tight text-base-content">
                    Campus<span className="text-primary">Connect</span>
                  </span>
                </Link>
                <button
                  onClick={closeSidebar}
                  className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-base-content hover:bg-base-200"
                  aria-label="Close Sidebar"
                >
                  ✕
                </button>
              </div>

              {/* User Profile Summary (if logged in) inside Sidebar */}
              {user && (
                <div className="p-3 bg-base-200/60 rounded-2xl flex items-center gap-3 border border-base-200">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-primary/30">
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt={user.displayName || "User"}
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm text-base-content truncate">
                      {user.displayName || "Student User"}
                    </p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links inside Sidebar (auto-close sidebar on click) */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/50 px-2 block mb-2">
                  Navigation Menu
                </span>

                <NavLink to="/" onClick={closeSidebar} className={activeStyle}>
                  <span>🏠 Home</span>
                </NavLink>

                <NavLink to="/events" onClick={closeSidebar} className={activeStyle}>
                  <span>🎉 All Events</span>
                </NavLink>

                <NavLink to="/my-events" onClick={closeSidebar} className={activeStyle}>
                  <span>📅 My Events</span>
                  {user && registeredEvents.length > 0 && (
                    <span className="badge badge-primary badge-sm text-white font-bold">
                      {registeredEvents.length}
                    </span>
                  )}
                </NavLink>

                <NavLink to="/about" onClick={closeSidebar} className={activeStyle}>
                  <span>ℹ️ About Us</span>
                </NavLink>
              </div>
            </div>

            {/* Bottom Actions inside Sidebar */}
            <div className="pt-4 border-t border-base-200 space-y-3 mt-6">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/50 px-1">
                    Account Options
                  </span>
                  <Link
                    to="/register"
                    onClick={closeSidebar}
                    className="btn btn-primary rounded-2xl w-full text-white font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <span>📝 Register Sidebar Form</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeSidebar}
                    className="btn btn-outline rounded-2xl w-full border-base-300 font-semibold flex items-center justify-center gap-2"
                  >
                    <span>🔑 Log In</span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline rounded-2xl w-full text-white font-bold flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default Navbar;
