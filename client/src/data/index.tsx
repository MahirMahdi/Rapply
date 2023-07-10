import React from "react";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";
import f3 from "../assets/f3.jpg";
import fd1 from "../assets/fd1.jpg";
import fd2 from "../assets/fd2.jpg";
import fd3 from "../assets/fd3.jpg";
import arthur from "../assets/arthur.webp";
import lena from "../assets/lena.webp";
import olivia from "../assets/olivia.webp";
import ethan from "../assets/ethan.webp";

class Features {
  name: string;
  description: string;
  logo: React.ReactElement;
  lightImage: string;
  darkImage: string;

  constructor(
    name: string,
    description: string,
    logo: React.ReactElement,
    lightImage: string,
    darkImage: string
  ) {
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.lightImage = lightImage;
    this.darkImage = darkImage;
  }
}

class Testimonial {
  username: string;
  review: string;
  image: string;

  constructor(username: string, review: string, image: string) {
    this.username = username;
    this.review = review;
    this.image = image;
  }
}

class FAQ {
  question: string;
  answer: string;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }
}

class FooterInfo {
  header: string;
  data: string[];

  constructor(header: string, data: string[]) {
    this.header = header;
    this.data = data;
  }
}

export const featuresDetails = [
  new Features(
    "Quick Fill",
    "Automatically populate your information into online application forms with just one click using our chrome extension.",
    <EditNoteIcon />,
    f1,
    fd1
  ),
  new Features(
    "Tailored Cover Letter",
    "Generate personalized cover letters that highlight your skills and experience, tailored specifically for each job application, giving you a competitive edge.",
    <FilePresentIcon />,
    f2,
    fd2
  ),
  new Features(
    "Application Progress Tracker",
    "Efficiently manage your job hunt by tracking application milestones and evaluating your application progress.",
    <StackedLineChartIcon />,
    f3,
    fd3
  ),
];

export const testimonials = [
  new Testimonial(
    "Arthur Wade",
    "Rapply has been a game-changer in my job search! It helps me track my application progress effortlessly and saves me so much time by filling out application forms with just one click using the Chrome extension. The tailored cover letters generated based on my resume and job description are incredibly helpful. Highly recommend!",
    arthur
  ),
  new Testimonial(
    "Lena Caldwell",
    "I've been using Rapply for a while now, and it has made my job hunting process so much smoother. The application progress tracking feature keeps me organized, and the Chrome extension is a lifesaver when it comes to filling out application forms quickly. The generated tailored cover letters have definitely helped me stand out. Great app!",
    lena
  ),
  new Testimonial(
    "Olivia Parker",
    "Rapply is a fantastic tool for job seekers! The ability to track my application progress and have all the necessary information in one place is incredibly convenient. The Chrome extension is a game-changer, automating the application form filling process. The tailored cover letters generated by rapply have saved me so much time and effort. I highly recommend it!",
    olivia
  ),
  new Testimonial(
    " Ethan Mitchell",
    "I can't imagine job hunting without Rapply anymore. It has simplified my job search significantly. The application progress tracking feature helps me stay organized, and the one-click form filling with the Chrome extension is a huge time-saver. The tailored cover letters generated by rapply are impressive and have increased my chances of getting noticed by recruiters. Kudos to the developers!",
    ethan
  ),
];

export const faqs = [
  new FAQ(
    "1. How can Rapply help me track my job application progress?",
    "Rapply allows you to create and manage a personalized dashboard where you can track the progress of your job applications. You can easily log in to your account, add details about the applications you've submitted, and update their status as you progress through the hiring process."
  ),
  new FAQ(
    "2. Can I customize the cover letters generated by Rapply?",
    "Absolutely! While Rapply generates tailored cover letters for you, you have the flexibility to customize them according to your preferences. You can edit the generated cover letters, add specific details, or make any necessary adjustments before submitting them along with your job applications."
  ),
  new FAQ(
    "3. How does Rapply's chrome extension help with filling application forms?",
    "Rapply's chrome extension simplifies the process of filling out application forms by automating it with just one click. When you encounter an application form on a job portal or company website, the Rapply extension intelligently populates the form fields with your pre-saved information, saving you time and effort."
  ),
  new FAQ(
    "4. Can I use Rapply for job applications in any industry?",
    "Yes, Rapply is designed to assist job seekers across all industries. Whether you're looking for a job in technology, healthcare, finance, or any other field, Rapply's features can be utilized to streamline your job search and application process."
  ),
  new FAQ(
    "5. Does Rapply offer resume-building assistance?",
    "Rapply is now focusing on application progress tracking, tailored cover letter generation, and application form filling. However, we recognize the value of resumes and are constantly working to improve our platform. Keep an eye out for future updates, which will include resume-building assistance."
  ),
];

export const footerInfo = [
  new FooterInfo("Product", ["Overview", "Features", "Releases"]),
  new FooterInfo("Company", ["About us", "Careers", "Contact"]),
  new FooterInfo("Resources", ["Blog", "Newsletter", "Support"]),
];