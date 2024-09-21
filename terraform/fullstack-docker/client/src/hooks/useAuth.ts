// import React from "react";
import { toast } from "react-toastify";

// Import API
import { API } from "src/api";

// Import state
import { useAuthState } from "src/states/auth";

// Import utils
import { CookieUtils } from "src/utils/cookies";

// Import types
import type {
  UserModel,
  AuthenticationData,
  User,
} from "src/objects/user/type";

type TokenPayload = {
  role: string;
  expire: number;
  provider: string;
  iat: number;
  exp: number;
};

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export function useAuth() {
  const {
    isAuthenticated,
    isPending,
    user,
    updateIsAuthenticated,
    updateUser,
    updateIsPending,
  } = useAuthState();

  const signin = async function (data: AuthenticationData) {
    try {
      updateIsPending(true);

      const response = await api.post<
        AuthenticationData,
        { token: string; user: User }
      >("/auth/sign-in", data);

      const message = response?.data.message;
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
      });

      updateIsAuthenticated(true);
      updateIsPending(false);
      if (response.data.data.token) {
        updateUser(response?.data.data.user);

        // Add token to cookie
        CookieUtils.writePersistentCookie(
          CookieUtils.TOKEN_NAME + "tkn",
          response.data.data.token
        );
      }

      return response?.data;
    } catch (error: any) {
      updateIsPending(false);
      const message = error.response.data.error.message;
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  const signup = async function (data: UserModel) {
    try {
      updateIsPending(true);

      const response = await api.post<
        AuthenticationData,
        { token: string; user: User }
      >("/auth/sign-up", data);

      const message = response?.data.message;
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
      });

      updateIsAuthenticated(true);
      updateIsPending(false);
      updateUser(response?.data.data.user);

      // Add token to cookie
      CookieUtils.writePersistentCookie(
        CookieUtils.TOKEN_NAME + "tkn",
        response.data.data.token
      );

      return response?.data;
    } catch (error: any) {
      updateIsPending(false);
      const message = error.response.data.error.message;
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  const logout = function () {
    CookieUtils.removeCookie(CookieUtils.TOKEN_NAME + "tkn");
    updateIsAuthenticated(false);
    updateUser(null);
  };

  return {
    isAuthenticated,
    isPending,
    user,
    signin,
    signup,
    logout,
  };
}
