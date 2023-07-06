import { TitleLogo, CollapsedTitleLogo } from "../logo";
import logo from "../../assets/logo.webp";
import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return <>{collapsed ? <CollapsedTitleLogo /> : <TitleLogo />}</>;
};
