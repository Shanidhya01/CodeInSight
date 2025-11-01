import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // Persist token for API interceptor if available
      if (currentUser) {
        try {
          const accessToken = await getIdToken(currentUser, /* forceRefresh */ true);
          localStorage.setItem(
            "user",
            JSON.stringify({ uid: currentUser.uid, email: currentUser.email, accessToken })
          );
        } catch (_) {
          // noop
        }
      } else {
        localStorage.removeItem("user");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
