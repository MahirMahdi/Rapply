import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, database } from "../../utility";
import { CircularProgress } from "@mui/material";

const VerifyUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const response = await account.get();
      if (response.emailVerification) {
        navigate("/profile");
      } else {
        navigate("/verify-email");
      }
    };
    verify();
  }, []);

  return <CircularProgress />;
};

export default VerifyUser;
