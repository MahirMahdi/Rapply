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

export interface Prefs {
  resumeId: string;
  photoId: string;
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
  prefs: Prefs;
  registration: string;
  status: boolean;
}

export interface RegisterVariables {
  email: string;
  password: string;
  name: string;
}

export interface ResetPasswordVariables {
  userId: string;
  secret: string;
  password: string;
  confirmPassword: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface ForgotPasswordVariables {
  email: string;
  redirect_path: string;
}

export interface PersonalInformation {
  first_name: string;
  last_name: string;
  job_title: string;
  phone_number: string;
  email: string;
  location: string;
}

export interface SocialLinks {
  portfolio: string;
  linkedin: string;
  twitter: string;
  github: string;
}

export interface Degree {
  id: string;
  userId: string;
  school: string;
  from: any;
  to: any;
  degree: string;
}

export interface Employment {
  id: string;
  userId: string;
  organization: string;
  from: any;
  to: any;
  position: string;
  description: string;
  tag: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  from: any;
  to: any;
  description: string;
  organization: string;
  tag: string;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  year: any;
  organization: string;
}

export interface Reference {
  userId: string;
  id: string;
  name: string;
  email: string;
  job_title: string;
  phone_number: string;
  organization: string;
}

export interface Skills {
  id: string;
  userId: string;
  skill: string;
}

export interface Languages {
  id: string;
  userId: string;
  language: string;
}

export interface Summary {
  id: string;
  userId: string;
  description: string;
}
