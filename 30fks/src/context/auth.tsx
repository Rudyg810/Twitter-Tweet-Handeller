
// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
type UserData = any

interface ContextProps {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    userData: UserData | null;
    setUserData: Dispatch<SetStateAction<UserData | null>>;
}

const AuthContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    userData: null,
    setUserData: (): UserData | null => null
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if(data){
      const decoded_data = jwtDecode(data) as any
      if (decoded_data) {
        setUserId(decoded_data?.data?.userId)
        setUserData({ 
          ...userData,
          name: decoded_data?.data?.name,
          email: decoded_data?.data?.email,
          accessToken_g: decoded_data?.data?.token
        });
      }
    }

  }, []);

    return (
        <AuthContext.Provider value={{ userId, setUserId, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
