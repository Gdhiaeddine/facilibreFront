
import { createContext, useContext, useState, ReactNode } from "react";

type AuthUser = {
  id: number;
  name: string;
  role: string;
} |null;

interface AuthContextType {
  user: AuthUser;
  login: (user:AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // const [loading, setLoading] = useState(true);
  const adminInfo = localStorage.getItem('adminInfo')
  const [user, setUser] = useState<AuthUser>(adminInfo? JSON.parse(adminInfo) : null);

  // Check if user is already logged in on component mount
  /*
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  */
  const login = (user:AuthUser) => {
    /*const userData = { name, role };
    localStorage.setItem("authUser", JSON.stringify(userData));
    */
    localStorage.setItem('adminInfo', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setUser(null);
  };
/*
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
*/
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const adminToken = ()=>{
  const data= JSON.parse(localStorage.getItem('adminInfo'))
  return data.token
}
