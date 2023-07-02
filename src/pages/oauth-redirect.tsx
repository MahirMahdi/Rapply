import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const OAuthRedirect = () => {
  return <Navigate to="/complete/user-info" />;
};

export default OAuthRedirect;
