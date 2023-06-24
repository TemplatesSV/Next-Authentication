import api from "@/shared/services";
import { AxiosResponse } from "axios";
import React, { createContext } from "react";

interface AuthContextData {
  login: (data: IAuthData) => Promise<AxiosResponse>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = ({ email, password }: IAuthData) => {
    const requestLogin = api.post("login", {
      email,
      password,
    });

    return requestLogin;
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
