import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showLoginSuccessAlert, showLoginErrorAlert } from "../../utils/alerts";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: location.state?.registeredEmail || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || location.state?.from || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userCredential = await loginUser(email, password);
      const userName = userCredential?.user?.displayName || userCredential?.user?.email?.split("@")[0] || "";
      await showLoginSuccessAlert(userName);
      navigate(from, {
        replace: true,
        state: { autoBook: location.state?.autoBook || false },
      });
    } catch (err) {
      console.error("Login error:", err);
      let errMsg = err.message || "Failed to log in. Please try again.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        errMsg = "Invalid email or password. Please check your credentials.";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Please enter a valid email address.";
      }
      setError(errMsg);
      showLoginErrorAlert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await googleLogin();
      const userName = res?.user?.displayName || "Student";
      await showLoginSuccessAlert(userName);
      navigate(from, {
        replace: true,
        state: { autoBook: location.state?.autoBook || false },
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      const errMsg = err.message || "Failed to sign in with Google.";
      setError(errMsg);
      showLoginErrorAlert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-to-br from-base-100 via-primary/5 to-secondary/10">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 sm:p-10 rounded-3xl border border-base-200 shadow-2xl relative overflow-hidden">
        {/* Top Decorative Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-indigo-600 to-secondary" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30">
            C
          </div>
          <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-sm text-base-content/70">
            Log in to manage your registered campus events
          </p>
        </div>

        {/* Registration Success Banner */}
        {location.state?.justRegistered && (
          <div className="alert alert-success bg-emerald-600 text-white text-xs sm:text-sm py-3 rounded-2xl shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>🎉 Registration successful! Please log in with your credentials to proceed.</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error text-white text-sm py-3 rounded-2xl shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full rounded-2xl border-base-300 hover:bg-primary/400 flex items-center justify-center gap-3 py-3 normal-case font-semibold text-base-content"
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
          Log In with Google
        </button>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-base-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-base-content/50">Or Log In with Email</span>
          <div className="flex-grow border-t border-base-200"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-2xl font-bold py-3 shadow-lg shadow-primary/25 hover:shadow-xl transition-all mt-4"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Log In"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-base-content/70 pt-2">
          Don't have an account?{" "}
          <Link to="/register" state={{ from: location.state?.from }} className="text-primary font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
