
const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="badge badge-primary font-bold text-xs uppercase px-3 py-2">About Platform</span>
        <h1 className="text-4xl font-extrabold text-base-content">CampusConnect Portal</h1>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Empowering university students to discover academic workshops, programming contests, tech seminars, and career development activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="card bg-base-100 border border-base-200 p-6 space-y-3 shadow-sm">
          <h2 className="card-title text-primary text-xl">🎯 Platform Objective</h2>
          <p className="text-sm text-base-content/75 leading-relaxed">
            CampusConnect provides a streamlined, central hub for university engagement. It allows students to stay informed about upcoming workshops, save interested events, and avoid scheduling conflicts.
          </p>
        </div>

        <div className="card bg-base-100 border border-base-200 p-6 space-y-3 shadow-sm">
          <h2 className="card-title text-secondary text-xl">🚀 Core Features</h2>
          <ul className="text-sm text-base-content/75 space-y-2 list-disc list-inside">
            <li>Interactive event feed with category & date filters.</li>
            <li>Schedule conflict detection algorithm.</li>
            <li>1-click registration using browser localStorage.</li>
            <li>Full responsive design for mobile, tablet, and desktop.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;