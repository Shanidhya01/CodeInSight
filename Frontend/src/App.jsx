import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-950">
          <Navbar />
          <div className="flex-grow bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-gray-950 to-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer position="top-center" autoClose={3500} theme="dark" newestOnTop closeOnClick pauseOnHover={false} />
        </div>
      </Router>
    </AuthProvider>
  );
}
