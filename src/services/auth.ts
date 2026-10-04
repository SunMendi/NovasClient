import { API_BASE_URL } from "./api";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

const TOKEN_KEY = "novas_auth_token";
const USER_KEY = "novas_auth_user";

export const authService = {
  async login(username: string, password: string): Promise<AuthUser> {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg =
        data.errors?.non_field_errors?.[0] ||
        data.errors?.username?.[0] ||
        data.errors?.password?.[0] ||
        data.message ||
        "Invalid username or password";
      throw new Error(errorMsg);
    }

    const { token, user } = data.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout(): void {
    const token = this.getToken();
    if (token) {
      fetch(`${API_BASE_URL}/auth/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async uploadImage(file: File, folder: string = "novas/uploads"): Promise<string> {
    const token = this.getToken();
    if (!token) throw new Error("Authentication required to upload media.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const res = await fetch(`${API_BASE_URL}/auth/upload/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to upload the image. Please try again.");
    }

    return data.data.url;
  },
};
