"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { User } from 'firebase/auth';



interface AuthContextType {

  user: User | null;

}



export const AuthContext = createContext<AuthContextType>({ user: null });



export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);



  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {

      setUser(user);

    });

    return () => unsubscribe();

  }, []);



  return (

    <AuthContext.Provider value={{ user }}>

      {children}

    </AuthContext.Provider>

  );

}



export const useAuth = () => useContext(AuthContext);
