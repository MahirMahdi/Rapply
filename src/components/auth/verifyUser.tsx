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
        const data = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
          response.$id
        );

        if (data) {
          navigate("/profile");
        } else {
          navigate("/complete/profile");
        }
      } else {
        navigate("/verify-email");
      }
    };

    verify();
  }, []);

  return <CircularProgress />;
};

export default VerifyUser;
