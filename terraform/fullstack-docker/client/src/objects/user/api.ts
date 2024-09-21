import { API } from "src/api";

// Import types
import type { User } from "./type";

const api = new API({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export class UserAPI {
  constructor() {}

  static async getUser(userId: number | string) {
    try {
      const response = await api.get<User>(`/users/${userId}`, {
        headers: {
          Authorization: API.generateBearerToken(API.getToken()) as string,
        },
      });
      return response.data;
    } catch (error) {
      return;
    }
  }
}
