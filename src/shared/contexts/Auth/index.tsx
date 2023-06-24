import api from "@/shared/services";
import { AxiosResponse } from "axios";
import React, { createContext } from "react";
import { setCookie, destroyCookie } from "nookies";
import { RegisterUser } from "@/shared/services/User/create.service";
import Router from "next/router";

interface AuthContextData {
  login: (data: IAuthData) => Promise<AxiosResponse>;
  register: (data: IRegisterData) => Promise<AxiosResponse>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async ({ email, password }: IAuthData) => {
    const requestLogin = await api.post("login", {
      email,
      password,
    });

    if (requestLogin.status === 200) {
      const token = requestLogin.data.access_token;

      setCookie(undefined, "BearerToken", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }

    return requestLogin;
  };

  const register = async ({ email, password, name }: IRegisterData) => {
    const requestRegister = await RegisterUser({ email, password, name });

    if (requestRegister.status === 201) {
      await Router.push("/login");
    }

    return requestRegister;
  };

  const logout = async () => {
    destroyCookie(null, "BearerToken", {
      path: "/",
    });

    await Router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
