import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      // Fallback to redirect flow for COOP / popup-blocked contexts
      const msg = String(error?.message || "");
      const code = error?.code || "";
      if (code.includes("popup") || msg.includes("Cross-Origin-Opener-Policy")) {
        await signInWithRedirect(auth, provider);
        return;
      }
      alert("Login failed: " + msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-400">Login</h2>
      <div className="flex flex-col gap-4 w-64">
        <button
          onClick={() => handleLogin(googleProvider)}
          className="bg-white text-black py-2 rounded-md font-medium"
        >
          Sign in with Google
        </button>
        {/* <button
          onClick={() => handleLogin(githubProvider)}
          className="bg-gray-800 text-white py-2 rounded-md font-medium border border-gray-600"
        >
          Sign in with GitHub
        </button> */}
      </div>
    </div>
  );
}
