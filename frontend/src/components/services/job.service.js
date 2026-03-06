import axiosInstance from "./url.service";

export const postJob = async (jobData) => {
  try {
    console.log("=== POST JOB SERVICE CALLED ===");
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "logo" && key !== "skills" && jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
        console.log(`Appended ${key}:`, jobData[key]);
      }
    });

    if (jobData.skills) {
      const skillsArray = jobData.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
      console.log("Skills array:", skillsArray);
      skillsArray.forEach(skill => {
        formData.append("skills", skill);
      });
    }

    if (jobData.logo) {
      console.log("Appending logo to FormData:", {
        name: jobData.logo.name,
        size: jobData.logo.size,
        type: jobData.logo.type,
        isFile: jobData.logo instanceof File
      });
      formData.append("companyLogo", jobData.logo);
    } else {
      console.error("No logo found in jobData!");
      return { status: "error", message: "No logo file provided" };
    }

    // Log FormData contents
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
    }

    console.log("Sending POST request to /api/v1/post-job");
    const response = await axiosInstance.post("/api/v1/post-job", formData);

    console.log("Response received:", response?.data);
    return response?.data;
  } catch (error) {
    console.error("=== POST JOB SERVICE ERROR ===");
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return { 
      status: "error", 
      message: error.response?.data?.message || error.message || "Failed to post job"
    };
  }
};

export const editJob = async (jobData) => {
  try {
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "companyLogo" && key !== "logo" && key !== "skills" && jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
      }
    });

    if (jobData.skills && typeof jobData.skills === "string") {
      const skillsArray = jobData.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
      skillsArray.forEach(skill => {
        formData.append("skills", skill);
      });
    } else if (Array.isArray(jobData.skills)) {
      jobData.skills.forEach(skill => {
        formData.append("skills", skill);
      });
    }

    if (jobData.logo) {
      formData.append("companyLogo", jobData.logo);
    }

    const response = await axiosInstance.post("/api/v1/edit-job", formData);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

export const editProfile = async (jobData) => {
  try {
    console.log("=== EDIT PROFILE SERVICE CALLED ===");
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "resumeUrl" && key !== "profilePicture" && jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
        console.log(`Appended ${key}:`, jobData[key]);
      }
    });

    if (jobData.resumeUrl) {
      const resumeFile = jobData.resumeUrl instanceof FileList
        ? jobData.resumeUrl[0]
        : jobData.resumeUrl;
      if (resumeFile && resumeFile instanceof File) {
        console.log("Appending resume to FormData:", {
          name: resumeFile.name,
          size: resumeFile.size,
          type: resumeFile.type,
          isFile: resumeFile instanceof File
        });
        formData.append("resumeUrl", resumeFile);
      } else {
        console.log("No valid resume file to upload");
      }
    }

    if (jobData.profilePicture) {
      const pictureFile = jobData.profilePicture instanceof FileList
        ? jobData.profilePicture[0]
        : jobData.profilePicture;
      if (pictureFile && pictureFile instanceof File) {
        console.log("Appending profile picture to FormData:", {
          name: pictureFile.name,
          size: pictureFile.size,
          type: pictureFile.type,
          isFile: pictureFile instanceof File
        });
        formData.append("profilePicture", pictureFile);
      } else {
        console.log("No valid profile picture file to upload");
      }
    }

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
    }

    console.log("Sending POST request to /api/v1/edit-profile");
    const response = await axiosInstance.post("/api/v1/edit-profile", formData);
    
    console.log("Response received:", response?.data);
    return response?.data;
  } catch (error) {
    console.error("=== EDIT PROFILE SERVICE ERROR ===");
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return {
      status: "error",
      message: error.response?.data?.message || error.message || "Failed to update profile"
    };
  }
};

export const editAdminProfile = async (jobData) => {
  try {
    console.log("=== EDIT ADMIN PROFILE SERVICE CALLED ===");
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "profilePicture" && jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
        console.log(`Appended ${key}:`, jobData[key]);
      }
    });

    if (jobData.profilePicture) {
      const pictureFile = jobData.profilePicture instanceof FileList
        ? jobData.profilePicture[0]
        : jobData.profilePicture;
      if (pictureFile && pictureFile instanceof File) {
        console.log("Appending profile picture to FormData:", {
          name: pictureFile.name,
          size: pictureFile.size,
          type: pictureFile.type,
          isFile: pictureFile instanceof File
        });
        formData.append("profilePicture", pictureFile);
      } else {
        console.log("No valid profile picture file to upload");
      }
    }

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
    }

    console.log("Sending POST request to /api/v1/edit-admin-profile");
    const response = await axiosInstance.post("/api/v1/edit-admin-profile", formData);
    
    console.log("Response received:", response?.data);
    return response?.data;
  } catch (error) {
    console.error("=== EDIT ADMIN PROFILE SERVICE ERROR ===");
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return {
      status: "error",
      message: error.response?.data?.message || error.message || "Failed to update admin profile"
    };
  }
};

export const applyJob = async (jobId, applicationData) => {
  try {
    console.log("=== APPLY JOB SERVICE CALLED ===");
    console.log("Job ID:", jobId);
    console.log("Application Data:", applicationData);
    
    if (!applicationData) {
      throw new Error("Application data is missing");
    }

    const formData = new FormData();

    Object.keys(applicationData).forEach((key) => {
      if (key !== "resume" && applicationData[key] !== null && applicationData[key] !== undefined) {
        formData.append(key, applicationData[key]);
        console.log(`Appended ${key}:`, applicationData[key]);
      }
    });

    // Handle resume file - it comes as 'resume' from the form
    if (applicationData.resume) {
      const resumeFile = applicationData.resume instanceof FileList
        ? applicationData.resume[0]
        : applicationData.resume;
      
      if (resumeFile && resumeFile instanceof File) {
        console.log("Appending resume to FormData:", {
          name: resumeFile.name,
          size: resumeFile.size,
          type: resumeFile.type,
          isFile: resumeFile instanceof File
        });
        formData.append("resumeUrl", resumeFile);
      } else {
        console.error("No valid resume file found!");
        return { status: "error", message: "Resume file is required" };
      }
    } else if (applicationData.resumeUrl) {
      const resumeFile = applicationData.resumeUrl instanceof FileList
        ? applicationData.resumeUrl[0]
        : applicationData.resumeUrl;
      
      if (resumeFile && resumeFile instanceof File) {
        console.log("Appending resume (from resumeUrl) to FormData:", {
          name: resumeFile.name,
          size: resumeFile.size,
          type: resumeFile.type
        });
        formData.append("resumeUrl", resumeFile);
      }
    } else {
      console.error("No resume provided in application data!");
      return { status: "error", message: "Resume file is required" };
    }

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
    }

    console.log("Sending POST request to /api/v1/apply-job/" + jobId);
    const response = await axiosInstance.post(
      `/api/v1/apply-job/${jobId}`,
      formData
    );

    console.log("Response received:", response?.data);
    return response.data;
  } catch (error) {
    console.error("=== APPLY JOB SERVICE ERROR ===");
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return {
      status: "error",
      message: error.response?.data?.message || error.message || "Failed to apply for job"
    };
  }
};


export const getAllJobs = async () => {
  try {

    const response = await axiosInstance.get(`/api/v1/get-all-jobs`);
    return response?.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getLatestJobs = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/latest-jobs`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getRecommendedJobs = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/get-recomendation`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};


export const getJobDetails = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/get-job-details/${jobId}`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUnsaveJob = async (jobId) => {
  try {
    const response = await axiosInstance.post(`/api/v1/save-unsave-job/${jobId}`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllSavedJobs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getall-savedjobs");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// export const applyJob = async (jobId) => {
//   try {
//     const response = await axiosInstance.post(`/api/v1/apply-job/${jobId}`);
//     return response.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const getAllAppliedJobs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/get-all-applied-jobs");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudentApplicationStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/get-user-stats");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdminStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/get-admin-stats");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};





export const updateApplicationStatus = async (jobId, { status, applicantId }) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/change-application-status/${jobId}`,
      {
        status,
        applicantId,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error updating application status:", error);
  }
};



export const getApplicationsByJobId = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/get-applications-by-jobId/${jobId}`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getTopPerformingJobs = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/get-top-performing-jobs`);
    return response?.data;
  } catch (error) {
    console.log(error)
  }
}


export const getAllApplications = async () => {
  try {
    const response = await axiosInstance.get("api/v1/applications")
    return response?.data
  } catch (error) {
    console.log(error)
  }
}