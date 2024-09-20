import React from "react";

// Import API
import { API } from "src/api";

// Import other hooks
import { useStateManager } from "./useStateManager";

// Import types
import type { UserModel, AuthenticationData } from "src/objects/user/type";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export function useAuth() {
  const [state, stateFns] = useStateManager(
    {
      isAuthenticate: false,
    },
    function (changeState) {
      return {
        updateIsAuthenticate(status?: boolean) {
          changeState("isAuthenticate", function () {
            return Boolean(status);
          });
        },
      };
    }
  );

  const signin = async function (data: AuthenticationData) {
    try {
      stateFns.updateIsAuthenticate(false);

      const response = await api.post<AuthenticationData, { token: string }>(
        "/auth/sign-in",
        data
      );

      stateFns.updateIsAuthenticate(true);

      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  const signup = async function (data: UserModel) {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async function () {};

  return {
    state,
    signin,
    signup,
    logout,
  };
}
