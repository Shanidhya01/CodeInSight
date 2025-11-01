import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-700">
      <Link to="/" className="text-lg font-semibold text-indigo-400">
        🧠 CodeInsight
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-indigo-400">Home</Link>
        <Link to="/history" className="hover:text-indigo-400">History</Link>
        <Link to="/about" className="hover:text-indigo-400">About</Link>
        {user ? (
          <>
            <span className="text-sm text-gray-400">{user.displayName}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded-md text-sm">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-indigo-500 px-3 py-1 rounded-md text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
