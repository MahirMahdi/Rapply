import { useState, ChangeEvent, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";
import AddIcon from "@mui/icons-material/Add";
import ApplicationForm, {
  ConfirmationDialogue,
} from "../../components/application/form";
import {
  useGetIdentity,
  useCreate,
  useDelete,
  useUpdate,
} from "@refinedev/core";
import { User } from "../../interfaces/index";
import { storage, database } from "../../utility";
import { v4 as uuidv4 } from "uuid";
import ApplicationCard from "../../components/application/card";

const ApplicationTracker = () => {
  const { mode } = useColorMode();
  const { data: user } = useGetIdentity<User>();
  const { mutate: create } = useCreate();
  const { mutate: deleteOne } = useDelete();
  const { mutate: update } = useUpdate();
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openConfirmationDialogue, setConfirmationDialogue] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [applications, setApplications] = useState<any>([]);
  const [loadApplications, setLoadApplications] = useState(false);
  const [deleteApplicationId, setDeleteApplicationId] = useState("");

  const [applicationForm, setApplicationForm] = useState<any>({
    userId: "",
    job_title: "",
    organization: "",
    status: "",
    coverId: "",
    cover_url: null,
    resumeId: "",
    resume_url: null,
  });

  const createOrganizationName = (e: ChangeEvent<HTMLInputElement>) => {
    setApplicationForm({ ...applicationForm, organization: e.target.value });
  };

  const uploadResume = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setResume(selectedFile || null);
  };

  const uploadCover = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setCover(selectedFile || null);
  };

  const createStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setApplicationForm({ ...applicationForm, status: e.target.value });
  };

  const createJobTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setApplicationForm({ ...applicationForm, job_title: e.target.value });
  };

  const closeCreateForm = () => {
    setOpenCreateForm(false);
  };

  const closeUpdateForm = () => {
    setOpenUpdateForm(false);
  };

  const closeConfirmationDialogue = () => {
    setConfirmationDialogue(false);
  };

  const getApplications = async () => {
    if (user) {
      try {
        const response = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_APPLICATION_TRACKER_COLLECTION_ID
        );

        const filtered_applications = response.documents.filter(
          (doc) => doc.userId === user?.$id
        );

        setApplications(filtered_applications);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUrl = (id: string) => {
    const response = storage.getFileView(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      id
    );

    return response.href;
  };

  const createApplication = async () => {
    try {
      const resume_data =
        resume &&
        (await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          uuidv4(),
          resume
        ));

      const resumeId = resume_data?.$id;

      const resume_url = resume && getUrl(resumeId ?? "");

      const cover_data =
        cover &&
        (await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          uuidv4(),
          cover
        ));

      const coverId = cover_data?.$id;

      const cover_url = cover && getUrl(coverId ?? "");

      create({
        resource: import.meta.env
          .VITE_APPWRITE_APPLICATION_TRACKER_COLLECTION_ID,
        values: {
          ...applicationForm,
          resumeId: resumeId,
          coverId: coverId,
          resume_url: resume_url,
          cover_url: cover_url,
        },
        successNotification: (data, values, resource) => {
          return {
            message: "You can now track your application.",
            description: "Successfully created new application!",
            type: "success",
          };
        },
      });

      setResume(null);
      setCover(null);

      setApplicationForm({
        userId: user?.$id ?? "",
        job_title: "",
        organization: "",
        status: "",
        coverId: "",
        cover_url: null,
        resumeId: "",
        resume_url: null,
      });

      setOpenCreateForm(false);

      setLoadApplications(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateApplication = async () => {
    try {
      let resume_url;
      let cover_url;
      let resumeId;
      let coverId;
      if (applicationForm.resumeId) {
        const resume_data =
          resume &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            uuidv4(),
            resume
          ));

        resumeId = resume_data?.$id;

        resume_url = resume && getUrl(resumeId ?? "");

        resume_url &&
          (await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            applicationForm.resumeId
          ));
      } else {
        const resume_data =
          resume &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            uuidv4(),
            resume
          ));

        resumeId = resume_data?.$id;

        resume_url = resume && getUrl(resumeId ?? "");
      }

      if (applicationForm.coverId) {
        const cover_data =
          cover &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            uuidv4(),
            cover
          ));

        coverId = cover_data?.$id;

        cover_url = cover && getUrl(coverId ?? "");

        cover_url &&
          (await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            applicationForm.coverId
          ));
      } else {
        const cover_data =
          cover &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            uuidv4(),
            cover
          ));

        coverId = cover_data?.$id;

        cover_url = cover && getUrl(coverId ?? "");
      }

      const { $id, ...rest } = applicationForm;

      update({
        resource: import.meta.env
          .VITE_APPWRITE_APPLICATION_TRACKER_COLLECTION_ID,
        values: {
          ...rest,
          resumeId: resumeId ?? applicationForm.resumeId,
          coverId: coverId ?? applicationForm.coverId,
          resume_url: resume_url ?? applicationForm.resume_url,
          cover_url: cover_url ?? applicationForm.cover_url,
        },
        id: $id,
        successNotification: (data, values, resource) => {
          return {
            message: "You application has been updated successfully.",
            description: "Updated successfully!",
            type: "success",
          };
        },
      });

      setResume(null);
      setCover(null);

      setApplicationForm({
        userId: user?.$id ?? "",
        job_title: "",
        organization: "",
        status: "",
        coverId: "",
        cover_url: null,
        resumeId: "",
        resume_url: null,
      });

      setOpenUpdateForm(false);
      setLoadApplications(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApplication = () => {
    try {
      deleteOne({
        resource: import.meta.env
          .VITE_APPWRITE_APPLICATION_TRACKER_COLLECTION_ID,
        id: deleteApplicationId,
        successNotification: (data, values, resource) => {
          return {
            message: "Your application has been deleted successfully.",
            description: "Application deleted!",
            type: "success",
          };
        },
      });

      setConfirmationDialogue(false);

      setLoadApplications(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setApplicationForm({ ...applicationForm, userId: user?.$id ?? "" });
    getApplications();
  }, [user]);

  useEffect(() => {
    getApplications();

    return () => {
      setLoadApplications(false);
    };
  }, [loadApplications]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "1.5rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          Track your applications
        </Typography>
        <Button
          sx={{ display: { xs: "none", sm: "flex" } }}
          startIcon={<AddIcon />}
          color="secondary"
          variant="contained"
          onClick={() => setOpenCreateForm(true)}
        >
          Create
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{ display: { xs: "flex", sm: "none" }, width: "2rem" }}
          onClick={() => setOpenCreateForm(true)}
        >
          <AddIcon />
        </Button>
      </Box>
      {applications.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: "2.5rem",
            flexDirection: { xs: "column", sm: "row" },
            columnGap: { sm: "10%", lg: "5%" },
          }}
        >
          {applications.map((app: any, i: number) => (
            <ApplicationCard
              key={i}
              data={app}
              handleDelete={() => {
                setDeleteApplicationId(app.$id);
                setConfirmationDialogue(true);
              }}
              handleEdit={() => {
                const {
                  $permission,
                  $createdAt,
                  $updatedAt,
                  $databaseId,
                  $collectionId,
                  ...rest
                } = app;
                setOpenUpdateForm(true);
                setApplicationForm(rest);
              }}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "grid", height: "100%", placeItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif;",
              fontWeight: "500",
              color: mode === "light" ? "#323130" : "inherit",
              fontSize: "1.25rem",
            }}
          >
            You have no applications
          </Typography>
        </Box>
      )}
      <ApplicationForm
        handleCover={uploadCover}
        cover={cover}
        handleResume={uploadResume}
        resume={resume}
        handleOrganization={createOrganizationName}
        data={applicationForm}
        handleJobTitle={createJobTitle}
        handleStatus={createStatus}
        handleClose={closeCreateForm}
        open={openCreateForm}
        handleSubmit={createApplication}
        buttonName="Create"
        title="Track your application"
      />
      <ApplicationForm
        handleCover={uploadCover}
        cover={cover}
        handleResume={uploadResume}
        resume={resume}
        handleOrganization={createOrganizationName}
        data={applicationForm}
        handleJobTitle={createJobTitle}
        handleStatus={createStatus}
        handleSubmit={updateApplication}
        open={openUpdateForm}
        handleClose={closeUpdateForm}
        title="Update your application"
        buttonName="Update"
      />
      <ConfirmationDialogue
        open={openConfirmationDialogue}
        handleClose={closeConfirmationDialogue}
        handleDelete={deleteApplication}
      />
    </Box>
  );
};

export default ApplicationTracker;
