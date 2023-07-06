import React from "react";

export interface FeatureCardProps {
  name: string;
  description: string;
  logo: React.ReactElement;
  selectCard: React.MouseEventHandler;
  selected: boolean;
}

export interface LinkButtonProps {
  href: string;
  name: string;
  placement: string | null;
  size: string;
}

export interface OutlinedButtonProps {
  logo: React.ReactElement;
  href: string;
  name: string;
  placement: string | null;
}

export interface TestimonialCardProps {
  username: string;
  review: string;
  image: string;
}

export interface FAQCardProps {
  question: string;
  answer: string;
}

export interface LogoProps {
  footer: boolean;
  login: boolean;
}

export interface FooterInfoProps {
  header: string;
  data: string[];
}

export interface User {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
}
