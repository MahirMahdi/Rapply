import { useState, useEffect } from "react";
import { account } from "../utility";

const useAuth = () => {
  const [user, setUser] = useState({});

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
