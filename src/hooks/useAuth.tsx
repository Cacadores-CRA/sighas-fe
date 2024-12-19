interface AuthData {
  token: string;
  expiresIn: string;
  user: {
    username: string;
    // add other user fields as needed
  };
}

export const useAuth = (): {
  isValid: boolean;
  userData: AuthData | null;
} => {
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) {
      return { isValid: false, userData: null };
    }

    const parsed = JSON.parse(authData) as AuthData;
    const expirationDate = new Date(parsed.expiresIn);
    const now = new Date();

    if (now > expirationDate) {
      // Token has expired, clear storage
      localStorage.removeItem('auth');
      return { isValid: false, userData: null };
    }

    return { isValid: true, userData: parsed };
  } catch (err) {
    console.error(err);
    localStorage.removeItem('auth');
    return { isValid: false, userData: null };
  }
};

export const logout = () => {
  localStorage.removeItem('auth');
};
