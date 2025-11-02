import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { toast } from "react-toastify";
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
      toast.error("Login failed: " + msg,{position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-64px)] flex flex-col items-center justify-center bg-transparent text-gray-100 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-[90%] max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-blue-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to access your code reviews</p>
        </div>

        {/* Login Card */}
        <div className="relative bg-linear-to-br from-gray-800/80 via-slate-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-50 blur-sm animate-pulse"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400 text-center mb-8">
              Choose Your Login Method
            </h2>
            
            <div className="space-y-4">
              {/* Google Login Button */}
              <button
                onClick={() => handleLogin(googleProvider)}
                className="group relative w-full py-4 px-6 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-200"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>

              {/* GitHub Login Button (commented out but styled for future use) */}
              {/* <button
                onClick={() => handleLogin(githubProvider)}
                className="group relative w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-600"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button> */}
            </div>

            {/* Security note */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>🔒</span>
                <span>Secure authentication powered by Firebase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            New to CodeInsight?{" "}
            <span className="text-indigo-400">Sign up automatically on first login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
