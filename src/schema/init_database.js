import sdk from "node-appwrite";
import { Permission, Role } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const client = new sdk.Client();

const databases = new sdk.Databases(client);

const appwriteEndpoint = process.env.VITE_APPWRITE_API_ENDPOINT;
const projectID = process.env.VITE_APPWRITE_PROJECT_ID;
const apiKey = process.env.VITE_APPWRITE_API_KEY;

client
  .setEndpoint(appwriteEndpoint) // Your API Endpoint
  .setProject(projectID) // Your project ID
  .setKey(apiKey); // Your secret API key

const promise = databases.create(uuidv4(), "rapply-demo");

const permissions = [
  Permission.read(Role.users("verified")),
  Permission.write(Role.users("verified")),
  Permission.update(Role.users("verified")),
  Permission.delete(Role.users("verified")),
];

const createPersonalInformationCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "personal_information",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "first_name",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "last_name",
      64,
      true
    );

    await databases.createEmailAttribute(
      databaseId,
      collectionId,
      "email",
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "job_title",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "location",
      64,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "phone_number",
      32,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "tokens",
      6,
      false,
      "50000"
    );

    console.log("Personal Info collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createSocialsCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "socials",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "portfolio",
      128,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "linkedin",
      128,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "twitter",
      128,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "github",
      128,
      false
    );

    console.log("Socials collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createEducationCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "education",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "school",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "degree",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      "from",
      true
    );

    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      "to",
      true
    );

    console.log("Education collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createExperiencesAndProjectsCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "experiences_and_projects",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "organization",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "name",
      64,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "position",
      64,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "description",
      500,
      true
    );

    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      "from",
      true
    );

    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      "to",
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "tag",
      16,
      true
    );

    console.log("Experiences and Projects collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createSkillsCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "skills",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "skill",
      64,
      true
    );

    console.log("Skills collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createLanguagesCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "languages",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "language",
      64,
      true
    );

    console.log("Languages collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createAchievementsCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "achievements",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "name",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "organization",
      64,
      true
    );

    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      "year",
      true
    );

    console.log("Achievements collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createReferencesCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "references",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "name",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "organization",
      64,
      true
    );

    await databases.createEmailAttribute(
      databaseId,
      collectionId,
      "email",
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "job_title",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "phone_number",
      32,
      false
    );

    console.log("References collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createSummaryCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "summary",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "description",
      375,
      true
    );

    console.log("Summary collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

const createApplicationTrackerCollection = async (databaseId) => {
  try {
    const createCollection = await databases.createCollection(
      databaseId,
      uuidv4(),
      "application_tracker",
      permissions
    );

    const collectionId = createCollection.$id;

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "userId",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "job_title",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "organization",
      64,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "status",
      24,
      true
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "resumeId",
      64,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "coverId",
      64,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "resume_url",
      256,
      false
    );

    await databases.createStringAttribute(
      databaseId,
      collectionId,
      "cover_url",
      256,
      false
    );

    console.log("Application Tracker collection successfully created");
  } catch (error) {
    console.log(error);
  }
};

promise.then(
  function (response) {
    const databaseId = response.$id;

    createPersonalInformationCollection(databaseId);
    createSocialsCollection(databaseId);
    createEducationCollection(databaseId);
    createExperiencesAndProjectsCollection(databaseId);
    createSkillsCollection(databaseId);
    createLanguagesCollection(databaseId);
    createAchievementsCollection(databaseId);
    createReferencesCollection(databaseId);
    createSummaryCollection(databaseId);
    createApplicationTrackerCollection(databaseId);

    console.log("Database initialized succesfully!");
  },
  function (error) {
    console.log(error);
  }
);
