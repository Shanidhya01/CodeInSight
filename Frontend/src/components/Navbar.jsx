import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => setShowConfirm(true);
  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
  };
  const cancelLogout = () => setShowConfirm(false);

  return (
    <>
      <nav className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-slate-800/80 to-gray-900/80
        text-gray-100 flex justify-between items-center
        px-8 py-4 border-b border-gray-700/50 shadow-2xl
        rounded-b-3xl
        before:absolute before:inset-0 before:bg-linear-to-r before:from-indigo-500/10 before:to-purple-500/10 before:rounded-b-3xl before:pointer-events-none
      ">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent rounded-b-3xl pointer-events-none"></div>
        
        {/* Logo */}
        <Link to="/" className="relative z-10 text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400 flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">🧠</span> 
          <span className="tracking-tight">CodeInsight</span>
        </Link>

        {/* Navigation Links */}
        <div className="relative z-10 flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="relative group px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              <span className="relative z-10 hover:text-indigo-300 transition-colors">Home</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link to="/history" className="relative group px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              <span className="relative z-10 hover:text-indigo-300 transition-colors">History</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link to="/about" className="relative group px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              <span className="relative z-10 hover:text-indigo-300 transition-colors">About</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-600/50 backdrop-blur-sm">
                <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <span className="text-sm text-gray-300 font-medium">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="group relative px-4 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="group relative px-6 py-2 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            </Link>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <div className="relative bg-linear-to-br from-gray-800 via-slate-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-600/50 text-center backdrop-blur-sm max-w-md mx-4">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-linear-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚠️</span>
              </div>
              
              <h2 className="text-xl font-bold mb-2 text-gray-100">
                Confirm Logout
              </h2>
              <p className="text-gray-300 mb-8 text-sm">
                Are you sure you want to log out of your account?
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="group relative px-6 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Yes, Logout</span>
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={cancelLogout}
                  className="group relative px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-gray-200 rounded-xl font-medium transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
