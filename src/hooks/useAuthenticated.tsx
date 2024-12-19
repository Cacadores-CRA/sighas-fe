interface AuthData {
  token: string;
  expiresIn: string;
  userEmail: string;
  userName: string;
  userSurname: string;
}

export const useAuthenticated = (): {
  isValid: boolean;
  data: AuthData | null;
} => {
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) {
      return { isValid: false, data: null };
    }

    const parsed = JSON.parse(authData) as AuthData;
    const expirationDate = new Date(parsed.expiresIn);
    const now = new Date();

    if (now > expirationDate) {
      // Token has expired, clear storage
      localStorage.removeItem('auth');
      return { isValid: false, data: null };
    }

    return { isValid: true, data: parsed };
  } catch (err) {
    console.error(err);
    localStorage.removeItem('auth');
    return { isValid: false, data: null };
  }
};

export const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('token');
  window.location.href = '/login';
};
