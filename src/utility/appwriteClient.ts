import { Account, Appwrite, Storage, Databases } from "@refinedev/appwrite";

const APPWRITE_URL = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
const APPWRITE_PROJECT = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const database = new Databases(appwriteClient);

export { account, appwriteClient, storage, database };
