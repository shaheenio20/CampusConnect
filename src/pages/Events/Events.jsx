import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import eventsData from "../../data/events.json";
import EventCard from "../../components/EventCard";
import EventSkeleton from "../../components/EventSkeleton";

const CATEGORIES = ["All", "Workshop", "Programming", "Seminar", "Career", "Community"];
const STATUSES = ["All", "Open", "Almost Full", "Closed"];

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Initial page load simulated loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Sync category from URL query parameter (e.g. /events?category=Workshop)
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const foundCategory = CATEGORIES.find(
        (cat) => cat.toLowerCase() === categoryParam.toLowerCase()
      );
      if (foundCategory) {
        setSelectedCategory(foundCategory);
      } else {
        setSelectedCategory("All");
      }
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Filter events based on search query, category, and status
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || event.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === "All" || event.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[80vh]">
      {/* 📍 Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            Discover Campus Events
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Explore hands-on workshops, competitive coding events, tech keynotes, and student activities.
          </p>
        </div>

        <div className="badge badge-primary badge-outline font-semibold px-4 py-3 text-xs shrink-0">
          Showing {filteredEvents.length} of {eventsData.length} Events
        </div>
      </div>

      {/* 🔍 Search & Filter Controls Card */}
      <div className="bg-base-100 p-5 rounded-3xl border border-base-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Live Search Bar (6 columns) */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search by title, speaker, topic, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full rounded-2xl pl-10 pr-10 focus:input-primary text-sm"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/40 hover:text-base-content"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Dropdown Filter (3 columns) */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select select-bordered w-full rounded-2xl text-sm font-semibold focus:select-primary"
            >
              <option value="All">All Statuses</option>
              {STATUSES.filter((s) => s !== "All").map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button (3 columns) */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="btn btn-outline btn-block rounded-2xl text-sm font-semibold border-base-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Category Pills (Horizontal scrollable tags) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 mr-2 shrink-0">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`btn btn-xs rounded-xl px-3.5 font-semibold transition-all shrink-0 ${
                  isActive
                    ? "btn-primary shadow-sm text-white"
                    : "btn-ghost bg-base-200/70 text-base-content/80 hover:bg-base-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎴 Events Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventSkeleton key={index} />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* 🚫 Empty Search State */
        <div className="bg-base-100 border border-base-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 text-warning flex items-center justify-center text-3xl">
            🔍
          </div>
          <h3 className="text-xl font-bold text-base-content">No Matching Events Found</h3>
          <p className="text-xs sm:text-sm text-base-content/70">
            We couldn't find any events matching your search keyword or selected filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn btn-primary rounded-xl px-6 font-semibold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;

