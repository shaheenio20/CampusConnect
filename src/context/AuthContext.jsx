import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load user-specific booked events from localStorage
        try {
          const userStorageKey = `campus_events_${currentUser.uid}`;
          const saved = localStorage.getItem(userStorageKey);
          if (saved) {
            setRegisteredEvents(JSON.parse(saved));
          } else {
            // Check legacy key for migration if exists
            const legacySaved = localStorage.getItem("campus_registered_events");
            if (legacySaved) {
              const legacyEvents = JSON.parse(legacySaved);
              setRegisteredEvents(legacyEvents);
              localStorage.setItem(userStorageKey, JSON.stringify(legacyEvents));
              localStorage.removeItem("campus_registered_events");
            } else {
              setRegisteredEvents([]);
            }
          }
        } catch (e) {
          console.error("Failed to load user events", e);
          setRegisteredEvents([]);
        }
      } else {
        setRegisteredEvents([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync registered events to localStorage per user
  useEffect(() => {
    if (user?.uid) {
      try {
        const userStorageKey = `campus_events_${user.uid}`;
        localStorage.setItem(userStorageKey, JSON.stringify(registeredEvents));
      } catch (e) {
        console.error("Failed to save user events", e);
      }
    }
  }, [registeredEvents, user?.uid]);

  // Auth Functions
  const createUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name & photo
      if (displayName || photoURL) {
        await updateProfile(userCredential.user, {
          displayName: displayName || email.split("@")[0],
          photoURL: photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        });
      }
      // Force refresh user state to update profile details immediately
      setUser({ ...auth.currentUser });
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setRegisteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // User Event Booking Functions
  const registerEvent = (event) => {
    if (!user) {
      return { success: false, requireLogin: true };
    }
    let added = false;
    setRegisteredEvents((prev) => {
      if (prev.some((e) => e.id === event.id)) return prev;
      added = true;
      return [...prev, { ...event, bookedAt: new Date().toISOString() }];
    });
    return { success: true };
  };

  const unregisterEvent = (eventId) => {
    if (!user) return false;
    setRegisteredEvents((prev) => prev.filter((e) => e.id !== eventId));
    return true;
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((e) => e.id === eventId);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    registeredEvents,
    registerEvent,
    unregisterEvent,
    isRegistered,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Also export useEvents for backwards compatibility
export const useEvents = useAuth;
