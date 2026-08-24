import Swal from "sweetalert2";

// Custom SweetAlert2 configuration matching the CampusConnect theme
const customSwal = Swal.mixin({
  customClass: {
    popup: "rounded-3xl shadow-2xl bg-base-100 border border-base-200 p-6 font-sans",
    title: "text-2xl font-black text-base-content tracking-tight",
    htmlContainer: "text-sm text-base-content/80 mt-2",
    confirmButton: "btn btn-primary rounded-2xl px-6 py-2 font-bold shadow-md shadow-primary/20 mx-1 text-white",
    cancelButton: "btn btn-ghost border border-base-300 rounded-2xl px-6 py-2 font-semibold mx-1 text-base-content/70 hover:bg-base-200",
    denyButton: "btn btn-error text-white rounded-2xl px-6 py-2 font-bold mx-1",
  },
  buttonsStyling: false,
});

// Toast notification for non-intrusive feedback
export const showToast = ({ icon = "success", title = "" }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: "rounded-2xl bg-base-100 shadow-xl border border-base-200 py-3 px-4",
      title: "text-sm font-bold text-base-content",
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({ icon, title });
};

// 1. CREATE ACCOUNT ALERTS (SweetAlert2)
export const showRegisterSuccessAlert = async (userName) => {
  return customSwal.fire({
    icon: "success",
    title: "Account Created! 🎉",
    text: `Welcome to CampusConnect${userName ? `, ${userName}` : ""}! Your account has been registered successfully.`,
    confirmButtonText: "Explore Events 🚀",
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showRegisterErrorAlert = (message) => {
  return customSwal.fire({
    icon: "error",
    title: "Registration Failed ❌",
    text: message || "Could not create account. Please check your details and try again.",
    confirmButtonText: "Try Again",
  });
};

// 2. LOGIN ACCOUNT ALERTS (SweetAlert2)
export const showLoginSuccessAlert = async (userName) => {
  return customSwal.fire({
    icon: "success",
    title: "Welcome Back! 👋",
    text: `Logged in successfully${userName ? `, ${userName}` : ""}.`,
    confirmButtonText: "Continue 🚀",
    timer: 2500,
    timerProgressBar: true,
  });
};

export const showLoginErrorAlert = (message) => {
  return customSwal.fire({
    icon: "error",
    title: "Login Failed 🔒",
    text: message || "Invalid email or password. Please check your credentials.",
    confirmButtonText: "Try Again",
  });
};

// 3. LOG OUT ALERTS (SweetAlert2)
export const showLogoutConfirmDialog = async () => {
  const result = await customSwal.fire({
    icon: "warning",
    title: "Log Out?",
    text: "Are you sure you want to log out of CampusConnect?",
    showCancelButton: true,
    confirmButtonText: "Yes, Log Out",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "rounded-3xl shadow-2xl bg-base-100 border border-base-200 p-6 font-sans",
      title: "text-2xl font-black text-base-content tracking-tight",
      htmlContainer: "text-sm text-base-content/80 mt-2",
      confirmButton: "btn btn-error text-white rounded-2xl px-6 py-2 font-bold shadow-md mx-1",
      cancelButton: "btn btn-ghost border border-base-300 rounded-2xl px-6 py-2 font-semibold mx-1 text-base-content/70 hover:bg-base-200",
    },
    buttonsStyling: false,
  });
  return result.isConfirmed;
};

export const showLogoutSuccessAlert = () => {
  return showToast({
    icon: "info",
    title: "Logged out successfully",
  });
};

// 4. SAVE AND BOOKING ALERTS (SweetAlert2)
export const showBookingSuccessAlert = async (eventTitle) => {
  const result = await customSwal.fire({
    icon: "success",
    title: "Event Booked & Saved! 🎉",
    text: `You have successfully registered for "${eventTitle}". It is saved to your My Events schedule.`,
    showCancelButton: true,
    confirmButtonText: "View My Events 📅",
    cancelButtonText: "Keep Browsing",
  });
  return result.isConfirmed;
};

export const showAlreadyBookedAlert = async (eventTitle) => {
  const result = await customSwal.fire({
    icon: "info",
    title: "Already Saved in My Events! 📅",
    text: `"${eventTitle}" is already booked and saved in your personal event schedule.`,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "View My Events 📅",
    denyButtonText: "Cancel Booking",
    cancelButtonText: "Close",
    customClass: {
      popup: "rounded-3xl shadow-2xl bg-base-100 border border-base-200 p-6 font-sans",
      title: "text-2xl font-black text-base-content tracking-tight",
      htmlContainer: "text-sm text-base-content/80 mt-2",
      confirmButton: "btn btn-primary rounded-2xl px-5 py-2 font-bold text-white shadow-md mx-1",
      denyButton: "btn btn-error text-white rounded-2xl px-5 py-2 font-bold shadow-md mx-1",
      cancelButton: "btn btn-ghost border border-base-300 rounded-2xl px-5 py-2 font-semibold mx-1 text-base-content/70 hover:bg-base-200",
    },
    buttonsStyling: false,
  });
  return result;
};

// 5. CANCEL OR DELETE BOOKING ALERTS (SweetAlert2)
export const showCancelBookingConfirmDialog = async (eventTitle) => {
  const result = await customSwal.fire({
    icon: "warning",
    title: "Cancel Booking?",
    text: `Are you sure you want to cancel your registration for "${eventTitle}"?`,
    showCancelButton: true,
    confirmButtonText: "Yes, Cancel Booking",
    cancelButtonText: "Keep My Booking",
    customClass: {
      popup: "rounded-3xl shadow-2xl bg-base-100 border border-base-200 p-6 font-sans",
      title: "text-2xl font-black text-base-content tracking-tight",
      htmlContainer: "text-sm text-base-content/80 mt-2",
      confirmButton: "btn btn-error text-white rounded-2xl px-6 py-2 font-bold shadow-md mx-1",
      cancelButton: "btn btn-ghost border border-base-300 rounded-2xl px-6 py-2 font-semibold mx-1 text-base-content/70 hover:bg-base-200",
    },
    buttonsStyling: false,
  });
  return result.isConfirmed;
};

export const showBookingCancelledAlert = (eventTitle) => {
  return customSwal.fire({
    icon: "success",
    title: "Booking Cancelled 🗑️",
    text: `Your registration for "${eventTitle}" has been removed from your schedule.`,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// 6. AUTH REQUIRED DIALOG (SweetAlert2)
export const showAuthRequiredAlert = async () => {
  const result = await customSwal.fire({
    icon: "info",
    title: "Account Required 🔑",
    text: "Please log in or register an account to book events and save them to your schedule.",
    showCancelButton: true,
    confirmButtonText: "Log In Now",
    cancelButtonText: "Cancel",
  });
  return result.isConfirmed;
};

// 7. SCHEDULE CONFLICT WARNING ALERT (SweetAlert2)
export const showConflictWarningAlert = async (newEventTitle, existingEventTitle, date) => {
  const result = await customSwal.fire({
    icon: "warning",
    title: "Schedule Conflict Warning! ⚠️",
    html: `You are already registered for <strong>"${existingEventTitle}"</strong> on <strong>${date}</strong>.<br/><br/>Do you still want to register for <strong>"${newEventTitle}"</strong>?`,
    showCancelButton: true,
    confirmButtonText: "Yes, Book Anyway",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "rounded-3xl shadow-2xl bg-base-100 border border-base-200 p-6 font-sans",
      title: "text-2xl font-black text-amber-600 tracking-tight",
      htmlContainer: "text-sm text-base-content/80 mt-2",
      confirmButton: "btn btn-warning text-slate-900 rounded-2xl px-6 py-2 font-bold shadow-md mx-1",
      cancelButton: "btn btn-ghost border border-base-300 rounded-2xl px-6 py-2 font-semibold mx-1 text-base-content/70 hover:bg-base-200",
    },
    buttonsStyling: false,
  });
  return result.isConfirmed;
};

