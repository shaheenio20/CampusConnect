import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import eventsData from "../../data/events.json";
import EventCard from "../../components/EventCard";
import EventSkeleton from "../../components/EventSkeleton";

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter featured events from JSON data with smooth loading state
    const featured = eventsData.filter((evt) => evt.featured).slice(0, 3);
    setFeaturedEvents(featured);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      name: "Workshop",
      icon: "💻",
      count: "4 Active",
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600",
      description: "Hands-on tech & design skill building",
    },
    {
      name: "Programming",
      icon: "⚡",
      count: "3 Contests",
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600",
      description: "Competitive coding & hackathons",
    },
    {
      name: "Seminar",
      icon: "🎙️",
      count: "5 Talks",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600",
      description: "Keynotes from tech pioneers",
    },
    {
      name: "Career",
      icon: "💼",
      count: "2 Fairs",
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600",
      description: "Internships & resume reviews",
    },
    {
      name: "Community",
      icon: "🌱",
      count: "6 Events",
      color: "from-rose-500/10 to-red-500/10 border-rose-500/20 text-rose-600",
      description: "Student clubs & green projects",
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* 🚀 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-base-100 to-base-100 py-16 sm:py-24 border-b border-base-200">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            🎓 Your Student Workshop & Event Portal
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-base-content tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Discover, Register & Excel in <span className="bg-gradient-to-r from-primary via-indigo-600 to-secondary bg-clip-text text-transparent">Campus Events</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-base-content/75 max-w-2xl mx-auto leading-relaxed">
            Never miss a programming contest, tech workshop, or career fair. Join hundreds of students building their portfolio with CampusConnect.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="btn btn-primary btn-lg rounded-2xl px-8 shadow-lg shadow-primary/25 hover:shadow-xl transition-all w-full sm:w-auto font-bold"
            >
              Explore All Events
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/my-events"
              className="btn btn-outline btn-lg rounded-2xl px-8 border-base-300 hover:bg-purple-500 hover:border-purple-500 w-full sm:w-auto font-semibold"
            >
              My Saved Schedule
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-base-200/80">
            <div className="p-4 rounded-2xl bg-base-100/60 backdrop-blur border border-base-200">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">50+</p>
              <p className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">Annual Events</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100/60 backdrop-blur border border-base-200">
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary">1,200+</p>
              <p className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">Active Students</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100/60 backdrop-blur border border-base-200">
              <p className="text-3xl sm:text-4xl font-extrabold text-accent">15+</p>
              <p className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">University Clubs</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100/60 backdrop-blur border border-base-200">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">100%</p>
              <p className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">Conflict Detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ Explore Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-primary uppercase">Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content mt-1">Browse by Event Type</h2>
          </div>
          <Link to="/events" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/events?category=${cat.name}`)}
              className={`cursor-pointer p-5 rounded-2xl bg-gradient-to-br ${cat.color} border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-40`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{cat.icon}</span>
                <span className="badge badge-sm font-bold bg-base-100/80 border-none">{cat.count}</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-base-content">{cat.name}</h3>
                <p className="text-xs text-base-content/70 mt-0.5 line-clamp-1">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-secondary uppercase">Featured Spotlight</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content mt-1">Upcoming Top Events</h2>
          </div>
          <Link
            to="/events"
            className="btn btn-outline btn-primary btn-sm rounded-xl px-4 font-semibold"
          >
            See All Events ({eventsData.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <EventSkeleton key={idx} />
            ))
          ) : (
            featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </section>

      {/* 💡 Why CampusConnect Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-base-200/60 rounded-3xl p-8 sm:p-12 border border-base-300">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content">
              Why CampusConnect?
            </h2>
            <p className="text-sm sm:text-base text-base-content/70 mt-2">
              Designed specifically for students to manage academic schedules and extracurricular activities hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                🔍
              </div>
              <h3 className="font-bold text-lg text-base-content">Smart Search & Filters</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Filter workshops and programming contests instantly by category, date range, or speaker name.
              </p>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-warning/15 text-warning-content flex items-center justify-center text-2xl font-bold">
                ⚠️
              </div>
              <h3 className="font-bold text-lg text-base-content">Schedule Conflict Alerts</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Never double-book yourself. CampusConnect automatically flags overlapping event date and time slots.
              </p>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-success/15 text-success-content flex items-center justify-center text-2xl font-bold">
                💾
              </div>
              <h3 className="font-bold text-lg text-base-content">1-Click Local Save</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Save your registered events directly to your browser’s localStorage with zero registration friction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;