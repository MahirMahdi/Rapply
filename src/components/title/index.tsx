import { TitleLogo, CollapsedTitleLogo } from "../logo";
import React from "react";
import { TitleProps } from "@refinedev/core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return <>{collapsed ? <CollapsedTitleLogo /> : <TitleLogo />}</>;
};
