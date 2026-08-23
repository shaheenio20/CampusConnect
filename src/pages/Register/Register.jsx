import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { createUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password, confirmPassword } = formData;

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createUser(email, password, name, photoURL);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered. Please log in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Avatar presets for quick selection
  const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  ];

  return (
    <div className="min-h-screen py-6 sm:py-12 px-0 sm:px-6 lg:px-8 flex justify-center lg:items-center bg-gradient-to-br from-base-100 via-primary/5 to-secondary/10">
      {/* Container: Acts as a Slide-Over Sidebar on sm/mobile screen and centered card on desktop */}
      <div className="w-full sm:max-w-md bg-base-100 p-6 sm:p-10 sm:rounded-3xl border-y sm:border border-base-200 shadow-2xl relative overflow-hidden flex flex-col justify-between my-auto sm:my-8 min-h-screen sm:min-h-0">
        {/* Top Decorative bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-indigo-600 to-secondary" />

        <div className="space-y-6">
          {/* Header with Sidebar Badge for Mobile */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-between sm:justify-center mb-2">
              <span className="sm:hidden badge badge-primary text-white text-xs font-bold px-3 py-1">
                Sidebar Register
              </span>
              <button
                onClick={() => navigate(-1)}
                className="sm:hidden text-xs text-base-content/60 hover:text-primary underline ml-auto"
              >
                Close ✕
              </button>
            </div>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30">
              C
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70">
              Register to book events & save them to your account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error text-white text-xs sm:text-sm py-2.5 rounded-2xl shadow-md flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Google Register Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn btn-outline w-full rounded-2xl border-base-300 hover:bg-primary/400 flex items-center justify-center gap-3 py-3 normal-case font-semibold text-base-content text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-base-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-base-content/50">Or Register with Email</span>
            <div className="flex-grow border-t border-base-200"></div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold text-base-content/80 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="input input-bordered w-full rounded-2xl focus:input-primary text-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-base-content/80 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                required
                className="input input-bordered w-full rounded-2xl focus:input-primary text-sm"
              />
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-xs font-bold text-base-content/80 uppercase tracking-wider mb-1">
                Avatar Image URL <span className="text-base-content/50 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full rounded-2xl focus:input-primary text-sm mb-2"
              />
              {/* Preset Avatar Selection */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-base-content/60 font-medium">Quick Pick:</span>
                <div className="flex gap-2">
                  {avatarPresets.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Avatar preset ${idx + 1}`}
                      onClick={() => setFormData({ ...formData, photoURL: url })}
                      className={`w-7 h-7 rounded-full cursor-pointer object-cover border-2 transition-all ${
                        formData.photoURL === url ? "border-primary scale-110" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-base-content/80 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                  className="input input-bordered w-full rounded-2xl focus:input-primary text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold text-base-content/80 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                className="input input-bordered w-full rounded-2xl focus:input-primary text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-2xl font-bold py-3 shadow-lg shadow-primary/25 hover:shadow-xl transition-all mt-4"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create New Account"}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-base-content/70 pt-4 border-t border-base-200 mt-6">
          Already have an account?{" "}
          <Link to="/login" state={{ from: location.state?.from }} className="text-primary font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
