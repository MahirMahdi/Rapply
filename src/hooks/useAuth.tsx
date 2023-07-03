import { useState, useEffect } from "react";
import { account } from "../utility";

interface User {
  $id: string;
  email: string;
  emailVerification: boolean;
  name: string;
  status: boolean;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await account.get();
      setUser(response);
    };

    fetchUser();
  }, []);

  return user;
};

export default useAuth;
