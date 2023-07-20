import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Paper,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import Tab from "../../components/resume/tab";
import useColorMode from "../../hooks/useColorMode";
import template_one from "../../assets/template_one.png";
import template_two from "../../assets/template_two.png";
import YearSelect from "../../components/resume/yearSelect";
import {
  Degree,
  Employment,
  Project,
  Achievement,
  User,
  Skills,
  Languages,
  Reference,
} from "../../interfaces";
import CustomSnackbar from "../../components/resume/customSnackbar";
import ResumeTemplateOne from "./template-one";
import ResumeTemplateTwo from "./template-two";
import { FileUploadButton } from "../../components/buttons";
import { database } from "../../utility";
import {
  useGetIdentity,
  useCreate,
  useDelete,
  useUpdate,
} from "@refinedev/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Tabs = {
  [key: string]: string[];
};

type Forms = {
  [key: string]: any;
};

const tabs: Tabs = {
  template_one: [
    "TEMPLATE",
    "CONTACT",
    "EDUCATION",
    "EXPERIENCE",
    "PROJECTS",
    "SUMMARY",
    "SKILLS",
    "LANGUAGE",
    "ACHIEVEMENTS",
    "REFERENCE",
    "PREVIEW",
  ],
  template_two: [
    "TEMPLATE",
    "CONTACT",
    "EDUCATION",
    "EXPERIENCE",
    "PROJECTS",
    "SUMMARY",
    "SKILLS",
    "PREVIEW",
  ],
};

type Checkable = {
  [key: string]: any;
};

const ResumeBuilder = () => {
  const { mode } = useColorMode();
  const { data: user } = useGetIdentity<User>({});
  const { mutate: create } = useCreate();
  const { mutate: deleteOne } = useDelete();
  const { mutate: update } = useUpdate();
  const [template, setTemplate] = useState("");
  const [selectedTab, setSelectedTab] = useState("CONTACT");
  const [contact, setContact] = useState({
    name: "",
    job_title: "",
    phone_number: "",
    email: "",
    location: "",
    linkedin: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const [education, setEducation] = useState<Degree[]>([]);
  const [updateEducationId, setUpdateEducationId] = useState("");
  const [loadEducationList, setLoadEducationList] = useState(false);
  const [degree, setDegree] = useState({
    userId: "",
    school: "",
    from: null,
    to: null,
    degree: "",
  });
  const [educationAlert, setEducationAlert] = useState(false);

  const [experience, setExperience] = useState<Employment[]>([]);
  const [updateExperienceId, setUpdateExperienceId] = useState("");
  const [loadExperienceList, setLoadExperienceList] = useState(false);
  const [employment, setEmployment] = useState({
    userId: "",
    organization: "",
    position: "",
    from: null,
    to: null,
    description: "",
    tag: "experience",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [updateProjectsId, setUpdateProjectsId] = useState("");
  const [loadProjectsList, setLoadProjectsList] = useState(false);
  const [project, setProject] = useState({
    userId: "",
    name: "",
    from: null,
    to: null,
    organization: "",
    description: "",
    tag: "project",
  });

  const [allExperienceAndProjects, setAllExperienceAndProjects] = useState({
    projects: projects,
    experience: experience,
  });

  const [experienceAndProjectsAlert, setExperienceAndProjectsAlert] =
    useState(false);

  const [summary, setSummary] = useState({ userId: "", description: "" });
  const [savedSummary, setSavedSummary] = useState({
    id: "",
    userId: "",
    description: "",
  });

  const [skills, setSkills] = useState<Skills[]>([]);
  const [updateSkillsId, setUpdateSkillsId] = useState("");
  const [loadSkillsList, setLoadSkillsList] = useState(false);
  const [skill, setSkill] = useState({ userId: "", skill: "" });
  const [skillsAlert, setSkillsAlert] = useState(false);

  const [languages, setLanguages] = useState<Languages[]>([]);
  const [updateLanguagesId, setUpdateLanguagesId] = useState("");
  const [loadLanguagesList, setLoadLanguagesList] = useState(false);
  const [language, setLanguage] = useState({ userId: "", language: "" });
  const [languagesAlert, setLanguagesAlert] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [updateAchievementsId, setUpdateAchievementsId] = useState("");
  const [loadAchievementsList, setLoadAchievementsList] = useState(false);
  const [achievement, setAchievement] = useState({
    userId: "",
    name: "",
    year: null,
    organization: "",
  });
  const [achievementsAlert, setAchievementsAlert] = useState(false);

  const [references, setReferences] = useState<Reference[]>([]);
  const [updateReferencesId, setUpdateReferencesId] = useState("");
  const [loadReferencesList, setLoadReferencesList] = useState(false);
  const [reference, setReference] = useState({
    userId: "",
    name: "",
    job_title: "",
    phone_number: "",
    email: "",
    organization: "",
  });
  const [referencesAlert, setReferencesAlert] = useState(false);

  const areObjectsEqual = (obj1: any, obj2: any): boolean => {
    const keys1 = Object.keys(obj1);

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const isObjectValid = (obj: Checkable): boolean => {
    delete obj.userId;

    const requiredKeys = Object.keys(obj);

    for (const key of requiredKeys) {
      const value = obj[key];

      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return true;
      }
    }

    return false;
  };

  const updateDegree = education.filter(
    (degree) => degree.id === updateEducationId
  )[0];

  const disableAddEducation = isObjectValid(degree);

  const disableUpdateEducation =
    updateDegree && areObjectsEqual(degree, updateDegree);

  const updateEmployment = experience.filter(
    (employment) => employment.id === updateExperienceId
  )[0];

  const disableAddExperience = isObjectValid(employment);

  const disableUpdateExperience =
    updateEmployment && areObjectsEqual(employment, updateEmployment);

  const updateProject = projects.filter(
    (project) => project.id === updateProjectsId
  )[0];

  const disableAddProject = isObjectValid(project);

  const disableUpdateProject =
    updateProject && areObjectsEqual(project, updateProject);

  const updateSkill = skills.filter((skill) => skill.id === updateSkillsId)[0];

  const disableAddSkill = isObjectValid(skill);

  const disableUpdateSkill = updateSkill && areObjectsEqual(skill, updateSkill);

  const updateLanguage = languages.filter(
    (language) => language.id === updateLanguagesId
  )[0];

  const disableAddLanguage = isObjectValid(language);

  const disableUpdateLanguage =
    updateLanguage && areObjectsEqual(language, updateLanguage);

  const updateAchievement = achievements.filter(
    (achievement) => achievement.id === updateAchievementsId
  )[0];

  const disableAddAchievement = isObjectValid(achievement);

  const disableUpdateAchievement =
    updateAchievement && areObjectsEqual(achievement, updateAchievement);

  const updateReference = references.filter(
    (reference) => reference.id === updateReferencesId
  )[0];

  const disableAddReference = isObjectValid(reference);

  const disableUpdateReference =
    updateReference && areObjectsEqual(reference, updateReference);

  const selectTab = (name: string) => {
    setSelectedTab(name);
  };

  const getContact = async () => {
    if (user) {
      try {
        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
          user?.$id ?? ""
        );
        const {
          first_name,
          last_name,
          email,
          location,
          phone_number,
          job_title,
        } = response;

        setContact({
          name: first_name + " " + last_name,
          job_title: job_title,
          phone_number: phone_number,
          email: email,
          location: location,
          linkedin: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result as string;
        setSelectedImageUrl(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
    setPhoto(selectedFile || null);
  };

  const getEducation = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID
      );

      const filtered_documents = response.documents.filter(
        (doc) => doc.userId === user?.$id
      );

      const education_docs = filtered_documents.map((doc) => {
        const { userId, from, to, school, degree, $id } = doc;

        return {
          id: $id,
          userId: userId,
          from: from,
          to: to,
          school: school,
          degree: degree,
        };
      });

      setEducation(education_docs);
    } catch (error) {
      console.log(error);
    }
  };

  const degreeYearFromChange = (year: any) => {
    setDegree({ ...degree, from: year });
  };

  const degreeYearToChange = (year: any) => {
    setDegree({ ...degree, to: year });
  };

  const addToEducationList = async () => {
    if (education?.length === 2) {
      setEducationAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID,
          values: degree,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Education list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setDegree({
          userId: user?.$id ?? "",
          school: "",
          from: null,
          to: null,
          degree: "",
        });

        setLoadEducationList(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromEducationList = async (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed from Education list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadEducationList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEducationList = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID,
        values: degree,
        id: updateEducationId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Education list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setDegree({
        userId: user?.$id ?? "",
        school: "",
        from: null,
        to: null,
        degree: "",
      });

      setUpdateEducationId("");

      setLoadEducationList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeEducationAlert = () => {
    setEducationAlert(false);
  };

  const getExperienceAndProjects = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID
      );

      const filtered_documents = response.documents.filter(
        (doc) => doc.userId === user?.$id
      );

      const filtered_experience = filtered_documents
        .filter((doc) => doc.tag === "experience")
        .map((doc) => {
          const {
            $id,
            userId,
            organization,
            position,
            from,
            to,
            description,
            tag,
          } = doc;

          return {
            id: $id,
            userId: userId,
            organization: organization,
            position: position,
            from: from,
            to: to,
            description: description,
            tag: tag,
          };
        });

      const filtered_projects = filtered_documents
        .filter((doc) => doc.tag === "project")
        .map((doc) => {
          const {
            userId,
            $id,
            organization,
            name,
            from,
            to,
            description,
            tag,
          } = doc;

          return {
            id: $id,
            userId: userId,
            organization: organization,
            name: name,
            from: from,
            to: to,
            description: description,
            tag: tag,
          };
        });

      setExperience(filtered_experience);

      setProjects(filtered_projects);
    } catch (error) {
      console.log(error);
    }
  };

  const employmentYearFromChange = (year: any) => {
    setEmployment({ ...employment, from: year });
  };

  const employmentYearToChange = (year: any) => {
    setEmployment({ ...employment, to: year });
  };

  const addToExperienceList = () => {
    const total =
      allExperienceAndProjects.projects.length +
      allExperienceAndProjects.experience?.length;
    if (total === 5) {
      setExperienceAndProjectsAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env
            .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
          values: employment,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Experience list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setEmployment({
          userId: user?.$id ?? "",
          organization: "",
          position: "",
          from: null,
          to: null,
          description: "",
          tag: "experience",
        });

        setLoadExperienceList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromExperienceList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env
          .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed from Experience list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadExperienceList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateExperienceList = () => {
    try {
      update({
        resource: import.meta.env
          .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
        values: employment,
        id: updateExperienceId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Experience list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setEmployment({
        userId: user?.$id ?? "",
        organization: "",
        position: "",
        from: null,
        to: null,
        description: "",
        tag: "experience",
      });

      setUpdateExperienceId("");

      setLoadExperienceList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const projectYearFromChange = (year: any) => {
    setProject({ ...project, from: year });
  };

  const projectYearToChange = (year: any) => {
    setProject({ ...project, to: year });
  };

  const addToProjectsList = () => {
    const total =
      allExperienceAndProjects.projects.length +
      allExperienceAndProjects.experience?.length;
    if (total === 5) {
      setExperienceAndProjectsAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env
            .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
          values: project,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Projects list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setProject({
          userId: user?.$id ?? "",
          organization: "",
          name: "",
          from: null,
          to: null,
          description: "",
          tag: "project",
        });

        setLoadProjectsList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromProjectsList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env
          .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed from Projects list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadProjectsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjectsList = () => {
    try {
      update({
        resource: import.meta.env
          .VITE_APPWRITE_EXPERIENCE_AND_PROJECTS_COLLECTION_ID,
        values: project,
        id: updateProjectsId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Projects list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setProject({
        userId: user?.$id ?? "",
        organization: "",
        name: "",
        from: null,
        to: null,
        description: "",
        tag: "project",
      });

      setUpdateProjectsId("");

      setLoadProjectsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeExperienceAndProjectsAlert = () => {
    setExperienceAndProjectsAlert(false);
  };

  const getSummary = async () => {
    if (user) {
      try {
        const response = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SUMMARY_COLLECTION_ID
        );

        const filtered_doc = response.documents
          .filter((doc) => doc.userId === user.$id)
          .map((doc) => {
            const { $id, userId, description } = doc;

            return {
              id: $id,
              userId: userId,
              description: description,
            };
          })[0];

        setSavedSummary(filtered_doc);
        setSummary(filtered_doc);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveSummary = () => {
    try {
      create({
        resource: import.meta.env.VITE_APPWRITE_SUMMARY_COLLECTION_ID,
        values: summary,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully saved summary.",
            description: "Saved successfully!",
            type: "success",
          };
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSummary = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_SUMMARY_COLLECTION_ID,
        values: { userId: summary.userId, description: summary.description },
        id: savedSummary?.id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated summary.",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSkills = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID
      );

      const filtered_documents = response.documents
        .filter((doc) => doc.userId === user?.$id)
        .map((doc) => {
          const { $id, userId, skill } = doc;

          return {
            id: $id,
            userId: userId,
            skill: skill,
          };
        });

      setSkills(filtered_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const addToSkillsList = () => {
    if (skills?.length === 10) {
      setSkillsAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID,
          values: skill,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Skills list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setSkill({ userId: user?.$id ?? "", skill: "" });

        setLoadSkillsList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromSkillsList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed Skills list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadSkillsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSkillsList = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID,
        values: skill,
        id: updateSkillsId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Skills list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setSkill({ userId: user?.$id ?? "", skill: "" });

      setUpdateSkillsId("");

      setLoadSkillsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSkillsAlert = () => {
    setSkillsAlert(false);
  };

  const getLanguages = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_LANGUAGES_COLLECTION_ID
      );

      const filtered_documents = response.documents
        .filter((doc) => doc.userId === user?.$id)
        .map((doc) => {
          const { $id, userId, language } = doc;

          return {
            id: $id,
            userId: userId,
            language: language,
          };
        });

      setLanguages(filtered_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const addToLanguagesList = () => {
    if (languages?.length === 5) {
      setLanguagesAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env.VITE_APPWRITE_LANGUAGES_COLLECTION_ID,
          values: language,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Languages list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setLanguage({ userId: user?.$id ?? "", language: "" });

        setLoadLanguagesList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromLanguagesList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env.VITE_APPWRITE_LANGUAGES_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed Languages list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadLanguagesList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLanguagesList = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_LANGUAGES_COLLECTION_ID,
        values: language,
        id: updateLanguagesId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Languages list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setLanguage({ userId: user?.$id ?? "", language: "" });

      setUpdateLanguagesId("");

      setLoadLanguagesList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeLanguagesAlert = () => {
    setLanguagesAlert(false);
  };

  const getAchievements = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID
      );

      const filtered_documents = response.documents
        .filter((doc) => doc.userId === user?.$id)
        .map((doc) => {
          const { $id, userId, name, organization, year } = doc;

          return {
            id: $id,
            userId: userId,
            name: name,
            organization: organization,
            year: year,
          };
        });

      setAchievements(filtered_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const achievementYearFromChange = (year: any) => {
    setAchievement({ ...achievement, year: year });
  };

  const addToAchievementsList = () => {
    if (achievements?.length === 2) {
      setAchievementsAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID,
          values: achievement,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to Achievements list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setAchievement({
          userId: user?.$id ?? "",
          name: "",
          year: null,
          organization: "",
        });

        setLoadAchievementsList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromAchievementsList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed from Achievements list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadAchievementsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAchievementsList = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID,
        values: achievement,
        id: updateAchievementsId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated Achievements list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setAchievement({
        userId: user?.$id ?? "",
        name: "",
        year: null,
        organization: "",
      });

      setUpdateAchievementsId("");

      setLoadAchievementsList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeAchievementsAlert = () => {
    setAchievementsAlert(false);
  };

  const getReferences = async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_REFERENCES_COLLECTION_ID
      );

      const filtered_documents = response.documents
        .filter((doc) => doc.userId === user?.$id)
        .map((doc) => {
          const {
            $id,
            userId,
            name,
            organization,
            job_title,
            email,
            phone_number,
          } = doc;

          return {
            id: $id,
            userId: userId,
            name: name,
            organization: organization,
            job_title: job_title,
            email: email,
            phone_number: phone_number,
          };
        });

      setReferences(filtered_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const addToReferencesList = () => {
    if (references?.length === 2) {
      setReferencesAlert(true);
    } else {
      try {
        create({
          resource: import.meta.env.VITE_APPWRITE_REFERENCES_COLLECTION_ID,
          values: reference,
          successNotification: (data, values, resource) => {
            return {
              message: "Successfully added to References list",
              description: "Added successfully!",
              type: "success",
            };
          },
        });

        setReference({
          userId: user?.$id ?? "",
          name: "",
          job_title: "",
          phone_number: "",
          email: "",
          organization: "",
        });

        setLoadReferencesList(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromReferencesList = (id: string) => {
    try {
      deleteOne({
        resource: import.meta.env.VITE_APPWRITE_REFERENCES_COLLECTION_ID,
        id: id,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully removed from References list",
            description: "Removed successfully!",
            type: "success",
          };
        },
      });

      setLoadReferencesList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateReferencesList = () => {
    try {
      update({
        resource: import.meta.env.VITE_APPWRITE_REFERENCES_COLLECTION_ID,
        values: reference,
        id: updateReferencesId,
        successNotification: (data, values, resource) => {
          return {
            message: "Successfully updated References list",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setReference({
        userId: user?.$id ?? "",
        name: "",
        job_title: "",
        phone_number: "",
        email: "",
        organization: "",
      });

      setUpdateReferencesId("");

      setLoadReferencesList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeReferencesAlert = () => {
    setReferencesAlert(false);
  };

  const formComponents: Forms = {
    TEMPLATE: (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          rowGap: "2.5rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif;",
            fontWeight: "500",
            color: mode === "light" ? "#323130" : "inherit",
            fontSize: "1.5rem",
          }}
        >
          Please select a template
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={template_one}
            alt="template-one"
            width={"45%"}
            height={"inherit"}
            className="select-template"
            onClick={() => setTemplate("template_one")}
          />
          <img
            src={template_two}
            alt="template-two"
            width={"45%"}
            height={"inherit"}
            className="select-template"
            onClick={() => setTemplate("template_two")}
          />
        </Box>
      </Box>
    ),
    CONTACT: (
      <Box
        sx={{
          width: { md: "60%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        {template === "template_one" && (
          <>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Upload a photo
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "1.5rem",
              }}
            >
              <Avatar
                sx={{ width: "5.5rem", height: "5.5rem" }}
                src={selectedImageUrl ?? ""}
                alt="uploaded-photo"
              />
              <FileUploadButton
                name="Photo"
                handleFileChange={uploadPhoto}
                file={photo}
              />
            </Box>
          </>
        )}
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            columnGap: "1rem",
            rowGap: "1rem",
            justifyContent: { sm: "center" },
          }}
        >
          <Box sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              FULL NAME
            </InputLabel>
            <TextField
              color="secondary"
              type="text"
              required
              fullWidth
              placeholder="James Martinez"
              value={contact.name}
              onChange={(e) =>
                setContact({
                  ...contact,
                  name: e.target.value,
                })
              }
            />
          </Box>
          <Box
            sx={{
              width: { sm: "50%" },
              display: "grid",
              rowGap: ".5rem",
            }}
          >
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              EMAIL
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              placeholder="dummyuser@email.com"
              type="email"
              value={contact.email}
              onChange={(e) =>
                setContact({
                  ...contact,
                  email: e.target.value,
                })
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            columnGap: "1rem",
            rowGap: "1rem",
            justifyContent: { sm: "center" },
          }}
        >
          <Box sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              JOB TITLE
            </InputLabel>
            <TextField
              color="secondary"
              type="text"
              required
              fullWidth
              placeholder="Software Engineer"
              value={contact.job_title}
              onChange={(e) =>
                setContact({
                  ...contact,
                  job_title: e.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              PHONE NUMBER
            </InputLabel>
            <TextField
              color="secondary"
              type="number"
              fullWidth
              placeholder="+12345678"
              value={contact.phone_number}
              onChange={(e) =>
                setContact({
                  ...contact,
                  phone_number: e.target.value,
                })
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            columnGap: "1rem",
            rowGap: "1rem",
            justifyContent: { sm: "center" },
          }}
        >
          {template === "template_two" && (
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                LINKEDIN
              </InputLabel>
              <TextField
                color="secondary"
                type="text"
                fullWidth
                placeholder="in/dummyuser"
                value={contact.linkedin}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    linkedin: e.target.value,
                  })
                }
              />
            </Box>
          )}
          <Box
            sx={{
              width: { sm: template === "template_two" ? "50%" : "100%" },
              display: "grid",
              rowGap: ".5rem",
            }}
          >
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              ADDRESS
            </InputLabel>
            <TextField
              color="secondary"
              type="text"
              fullWidth
              placeholder="Tokyo, Japan"
              value={contact.location}
              onChange={(e) =>
                setContact({
                  ...contact,
                  location: e.target.value,
                })
              }
            />
          </Box>
        </Box>
      </Box>
    ),
    EDUCATION: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              SCHOOL
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="XYZ University"
              value={degree.school}
              onChange={(e) => setDegree({ ...degree, school: e.target.value })}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                FROM
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={null}
                placeholder="From"
                selectedYear={degree.from}
                onYearChange={degreeYearFromChange}
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                TO
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={degree.from}
                placeholder="To"
                selectedYear={degree.to}
                onYearChange={degreeYearToChange}
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              DEGREE
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="Bachelor of Business Administration (BBA)"
              value={degree.degree}
              onChange={(e) => setDegree({ ...degree, degree: e.target.value })}
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateEducationId.length > 0
                ? disableUpdateEducation
                : disableAddEducation
            }
            onClick={() =>
              updateEducationId.length > 0
                ? updateEducationList()
                : addToEducationList()
            }
          >
            {updateEducationId.length > 0
              ? "UPDATE EDUCATION"
              : "ADD TO EDUCATION LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Education List
          </Typography>
          {education?.map((degree, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {degree.degree}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontSize: ".85rem",
                  }}
                >
                  {degree.school}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromEducationList(degree.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = degree;
                    setUpdateEducationId(id);
                    setDegree(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    EXPERIENCE: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              POSITION
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="Software Engineer"
              value={employment.position}
              onChange={(e) =>
                setEmployment({ ...employment, position: e.target.value })
              }
            />
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                FROM
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={null}
                placeholder="From"
                selectedYear={employment.from}
                onYearChange={employmentYearFromChange}
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                TO
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={employment.from}
                placeholder="To"
                selectedYear={employment.to}
                onYearChange={employmentYearToChange}
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              COMPANY / ORGANIZATION
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="ABC Company Ltd"
              value={employment.organization}
              onChange={(e) =>
                setEmployment({ ...employment, organization: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                DESCRIPTION
              </InputLabel>
              <InputLabel
                sx={{
                  fontFamily: "'Poppins', sans-serif;",
                }}
              >
                {`${employment.description.length}/ 500`}
              </InputLabel>
            </Box>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              minRows={4}
              multiline={true}
              inputProps={{ maxLength: 500 }}
              placeholder="Efficiently managed a team of 8, resulting in a notable 45% increase in the sales rate."
              value={employment.description}
              onChange={(e) =>
                setEmployment({ ...employment, description: e.target.value })
              }
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateExperienceId.length > 0
                ? disableUpdateExperience
                : disableAddExperience
            }
            onClick={() =>
              updateExperienceId.length > 0
                ? updateExperienceList()
                : addToExperienceList()
            }
          >
            {updateExperienceId.length > 0
              ? "UPDATE EXPERIENCE"
              : "ADD TO EXPERIENCES LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { xs: "100%", lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Experiences List
          </Typography>
          {experience?.map((employment, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {employment.position}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontSize: ".85rem",
                  }}
                >
                  {employment.organization}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromExperienceList(employment.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = employment;
                    setUpdateExperienceId(id);
                    setEmployment(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    PROJECTS: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              PROJECT NAME
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="Rapply - Job Hunting Assistant"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                FROM
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={null}
                placeholder="From"
                selectedYear={project.from}
                onYearChange={projectYearFromChange}
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                TO
              </InputLabel>
              <YearSelect
                required={true}
                yearStart={project.from}
                placeholder="To"
                selectedYear={project.to}
                onYearChange={projectYearToChange}
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              ORGANIZATION / POSITION
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="Software Engineer"
              value={project.organization}
              onChange={(e) =>
                setProject({ ...project, organization: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                DESCRIPTION
              </InputLabel>
              <InputLabel
                sx={{
                  fontFamily: "'Poppins', sans-serif;",
                }}
              >
                {`${project.description.length}/ 500`}
              </InputLabel>
            </Box>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              minRows={4}
              multiline={true}
              inputProps={{ maxLength: 500 }}
              placeholder="Streamlined inventory management by implementing strategic measures that led to an impressive 27.47% increase in the desired outcome."
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateProjectsId.length > 0
                ? disableUpdateProject
                : disableAddProject
            }
            onClick={() =>
              updateProjectsId.length > 0
                ? updateProjectsList()
                : addToProjectsList()
            }
          >
            {updateProjectsId.length > 0
              ? "UPDATE PROJECT"
              : "ADD TO PROJECTS LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Projects List
          </Typography>
          {projects?.map((project, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {project.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontSize: ".85rem",
                  }}
                >
                  {project.organization}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromProjectsList(project.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = project;
                    setUpdateProjectsId(id);
                    setProject(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    SUMMARY: (
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          rowGap: ".5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
            SUMMARY
          </InputLabel>
          <InputLabel
            sx={{
              fontFamily: "'Poppins', sans-serif;",
            }}
          >
            {`${summary?.description.length ?? 0}/ 375`}
          </InputLabel>
        </Box>
        <TextField
          color="secondary"
          fullWidth
          type="text"
          minRows={6}
          multiline={true}
          inputProps={{ maxLength: 375 }}
          placeholder="Results-driven financial analyst with expertise in financial modeling, data analysis, and forecasting. Skilled in utilizing advanced Excel functions and statistical software to analyze complex financial data, identify trends, and provide actionable insights. Strong understanding of financial statements, risk assessment, and investment analysis. "
          value={summary?.description}
          onChange={(e) =>
            setSummary({ userId: user?.$id ?? "", description: e.target.value })
          }
        />
        {summary?.description.length > 0 &&
          summary?.description !== savedSummary?.description && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                savedSummary?.description.length > 0 &&
                savedSummary?.description !== summary?.description
                  ? updateSummary()
                  : saveSummary()
              }
            >
              {savedSummary?.description.length > 0 &&
              savedSummary?.description !== summary?.description
                ? "UPDATE SUMMARY"
                : "SAVE SUMMARY"}
            </Button>
          )}
      </Box>
    ),
    SKILLS: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              SKILL
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="Data Analysis, Email Marketing, Javascript etc. "
              value={skill.skill}
              onChange={(e) => setSkill({ ...skill, skill: e.target.value })}
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateSkillsId.length > 0 ? disableUpdateSkill : disableAddSkill
            }
            onClick={() =>
              updateSkillsId.length > 0 ? updateSkillsList() : addToSkillsList()
            }
          >
            {updateSkillsId.length > 0 ? "UPDATE SKILL" : "ADD TO SKILLS LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: ".5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Skills List
          </Typography>
          {skills?.map((skill, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {skill.skill}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromSkillsList(skill.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = skill;
                    setUpdateSkillsId(id);
                    setSkill(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    LANGUAGE: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              LANGUAGE
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="Bangla, French, Spanish, etc. "
              value={language.language}
              onChange={(e) =>
                setLanguage({ ...language, language: e.target.value })
              }
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateLanguagesId.length > 0
                ? disableUpdateLanguage
                : disableAddLanguage
            }
            onClick={() =>
              updateLanguagesId.length > 0
                ? updateLanguagesList()
                : addToLanguagesList()
            }
          >
            {updateLanguagesId.length > 0
              ? "UPDATE LANGUAGE"
              : "ADD TO LANGUAGES LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: ".5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Languages List
          </Typography>
          {languages?.map((language, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {language.language}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromLanguagesList(language.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = language;
                    setUpdateLanguagesId(id);
                    setLanguage(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    ACHIEVEMENTS: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              ACHIEVEMENT NAME
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              required
              type="text"
              placeholder="Rapply - Job Hunting Assistant"
              value={achievement.name}
              onChange={(e) =>
                setAchievement({ ...achievement, name: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              YEAR
            </InputLabel>
            <YearSelect
              required={true}
              yearStart={null}
              placeholder="From"
              selectedYear={achievement.year}
              onYearChange={achievementYearFromChange}
            />
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              ORGANIZATION / COMPANY
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="ABC Company"
              value={achievement.organization}
              onChange={(e) =>
                setAchievement({ ...achievement, organization: e.target.value })
              }
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateAchievementsId.length > 0
                ? disableUpdateAchievement
                : disableAddAchievement
            }
            onClick={() =>
              updateAchievementsId.length > 0
                ? updateAchievementsList()
                : addToAchievementsList()
            }
          >
            {updateAchievementsId.length > 0
              ? "UPDATE ACHIEVEMENT"
              : "ADD TO ACHIEVEMENTS LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            Achievements List
          </Typography>
          {achievements?.map((achievement, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {achievement.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontSize: ".85rem",
                  }}
                >
                  {achievement.organization}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromAchievementsList(achievement.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = achievement;
                    setUpdateAchievementsId(id);
                    setAchievement(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    REFERENCE: (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "60%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              FULL NAME
            </InputLabel>
            <TextField
              color="secondary"
              type="text"
              required
              fullWidth
              placeholder="James Martinez"
              value={reference.name}
              onChange={(e) =>
                setReference({
                  ...reference,
                  name: e.target.value,
                })
              }
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              rowGap: ".5rem",
            }}
          >
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              EMAIL
            </InputLabel>
            <TextField
              color="secondary"
              fullWidth
              placeholder="dummyuser@email.com"
              type="email"
              value={reference.email}
              onChange={(e) =>
                setReference({
                  ...reference,
                  email: e.target.value,
                })
              }
            />
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                JOB TITLE
              </InputLabel>
              <TextField
                color="secondary"
                type="text"
                required
                fullWidth
                placeholder="Software Engineer"
                value={reference.job_title}
                onChange={(e) =>
                  setReference({
                    ...reference,
                    job_title: e.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
                PHONE NUMBER
              </InputLabel>
              <TextField
                color="secondary"
                type="number"
                fullWidth
                placeholder="+12345678"
                value={reference.phone_number}
                onChange={(e) =>
                  setReference({
                    ...reference,
                    phone_number: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              rowGap: ".5rem",
            }}
          >
            <InputLabel sx={{ fontFamily: "'Poppins', sans-serif;" }}>
              COMPANY / ORGANIZATION
            </InputLabel>
            <TextField
              color="secondary"
              type="text"
              fullWidth
              placeholder="ABC Company"
              value={reference.organization}
              onChange={(e) =>
                setReference({
                  ...reference,
                  organization: e.target.value,
                })
              }
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              updateReferencesId.length > 0
                ? disableUpdateReference
                : disableAddReference
            }
            onClick={() =>
              updateReferencesId.length > 0
                ? updateReferencesList()
                : addToReferencesList()
            }
          >
            {updateReferencesId.length > 0
              ? "UPDATE REFERENCE"
              : "ADD TO REFERENCES LIST"}
          </Button>
        </Box>
        <Paper
          sx={{
            width: { lg: "35%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif;",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.15rem",
              fontWeight: "600",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            References List
          </Typography>
          {references?.map((reference, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowWrap: "anywhere",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#6505B0",
                  borderRadius: "2px",
                  color: "white",
                },
                padding: "1rem",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {reference.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontSize: ".85rem",
                  }}
                >
                  {reference.job_title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => removeFromReferencesList(reference.id)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: mode === "light" ? "#121212" : "#fff",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    const { id, ...rest } = reference;
                    setUpdateReferencesId(id);
                    setReference(rest);
                  }}
                >
                  <EditIcon color="primary" sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    ),
    PREVIEW:
      template === "template_one" ? (
        <ResumeTemplateOne
          contact={contact}
          education={education}
          experience={experience}
          projects={projects}
          summary={summary}
          skills={skills}
          languages={languages}
          achievements={achievements}
          references={references}
          image={selectedImageUrl}
        />
      ) : (
        <ResumeTemplateTwo
          contact={contact}
          education={education}
          experience={experience}
          projects={projects}
          summary={summary}
          skills={skills}
        />
      ),
  };

  useEffect(() => {
    setAllExperienceAndProjects({ projects: projects, experience: experience });
  }, [experience, projects]);

  useEffect(() => {
    getContact();
    getEducation();
    setDegree({
      userId: user?.$id ?? "",
      school: "",
      from: null,
      to: null,
      degree: "",
    });
    getExperienceAndProjects();

    setEmployment({
      userId: user?.$id ?? "",
      organization: "",
      position: "",
      from: null,
      to: null,
      description: "",
      tag: "experience",
    });

    setProject({
      userId: user?.$id ?? "",
      name: "",
      from: null,
      to: null,
      organization: "",
      description: "",
      tag: "project",
    });

    getSummary();

    setSummary({
      userId: user?.$id ?? "",
      description: "",
    });

    getSkills();

    setSkill({ userId: user?.$id ?? "", skill: "" });

    getLanguages();

    setLanguage({ userId: user?.$id ?? "", language: "" });

    getAchievements();

    setAchievement({
      userId: user?.$id ?? "",
      name: "",
      year: null,
      organization: "",
    });

    getReferences();

    setReference({
      userId: user?.$id ?? "",
      name: "",
      job_title: "",
      phone_number: "",
      email: "",
      organization: "",
    });
  }, [user]);

  useEffect(() => {
    updateDegree && console.log(areObjectsEqual(degree, updateDegree));
  }, [updateDegree, degree]);

  useEffect(() => {
    getEducation();

    return () => {
      setLoadEducationList(false);
    };
  }, [loadEducationList]);

  useEffect(() => {
    getExperienceAndProjects();

    return () => {
      setLoadProjectsList(false);
    };
  }, [loadProjectsList]);

  useEffect(() => {
    getExperienceAndProjects();

    return () => {
      setLoadExperienceList(false);
    };
  }, [loadExperienceList]);

  useEffect(() => {
    getSkills();

    return () => {
      setLoadSkillsList(false);
    };
  }, [loadSkillsList]);

  useEffect(() => {
    getLanguages();

    return () => {
      setLoadLanguagesList(false);
    };
  }, [loadLanguagesList]);

  useEffect(() => {
    getAchievements();

    return () => {
      setLoadAchievementsList(false);
    };
  }, [loadAchievementsList]);

  useEffect(() => {
    getReferences();

    return () => {
      setLoadReferencesList(false);
    };
  }, [loadReferencesList]);

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
      }}
    >
      {template !== "" && (
        <>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {tabs[template].map((tabName) => (
              <Tab
                name={tabName}
                selected={selectedTab === tabName}
                key={tabName}
                handleClick={() => selectTab(tabName)}
              />
            ))}
          </Box>
          <Select
            color="secondary"
            sx={{
              display: { lg: "none" },
              borderRadius: "15px",
              backgroundColor: "#6505b0",
              color: "#fff",
              outlineColor: "#6505b0",
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
              width: { xs: "fit-content" },
              height: { xs: "2rem" },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            {tabs[template].map((tabName, i) => (
              <MenuItem key={i} value={tabName}>
                {tabName}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              maxWidth: "100%",
              mt: "3.5rem",
              padding: selectedTab === "PREVIEW" ? "0" : "2rem",
              display: "grid",
              placeItems: "center",
            }}
          >
            {formComponents[selectedTab]}
          </Box>
        </>
      )}
      {template.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "2.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif;",
              fontWeight: "500",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.5rem",
            }}
          >
            Please select a template
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src={template_one}
              alt="template-one"
              width={"45%"}
              height={"inherit"}
              className="select-template"
              onClick={() => setTemplate("template_one")}
            />
            <img
              src={template_two}
              alt="template-two"
              width={"45%"}
              height={"inherit"}
              className="select-template"
              onClick={() => setTemplate("template_two")}
            />
          </Box>
        </Box>
      )}
      <CustomSnackbar
        type="alert"
        open={educationAlert}
        close={closeEducationAlert}
        message={"Sorry. You cannot add more than two degrees in this format."}
      />
      <CustomSnackbar
        type="alert"
        open={experienceAndProjectsAlert}
        close={closeExperienceAndProjectsAlert}
        message={
          "Sorry. You cannot add more than five experience/projects in this format."
        }
      />
      <CustomSnackbar
        type="alert"
        open={achievementsAlert}
        close={closeAchievementsAlert}
        message={
          "Sorry. You cannot add more than two achievements in this format."
        }
      />
      <CustomSnackbar
        type="alert"
        open={referencesAlert}
        close={closeReferencesAlert}
        message={
          "Sorry. You cannot add more than two references in this format."
        }
      />
      <CustomSnackbar
        type="alert"
        open={skillsAlert}
        close={closeSkillsAlert}
        message={"Sorry. You cannot add more than ten skills in this format."}
      />
      <CustomSnackbar
        type="alert"
        open={languagesAlert}
        close={closeLanguagesAlert}
        message={
          "Sorry. You cannot add more than five languages in this format."
        }
      />
    </Box>
  );
};

export default ResumeBuilder;
