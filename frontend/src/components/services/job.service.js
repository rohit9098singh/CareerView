import axiosInstance from "./url.service";

export const postJob = async (jobData) => {
  try {
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "logo" && key !== "skills" && jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
      }
    });

    if (jobData.skills) {
      const skillsArray = jobData.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
      skillsArray.forEach(skill => {
        formData.append("skills", skill);
      });
    }

    if (jobData.logo) {
      console.log("Appending logo to FormData:", jobData.logo);
      console.log("Logo is File:", jobData.logo instanceof File);
      console.log("Logo name:", jobData.logo.name);
      console.log("Logo size:", jobData.logo.size);
      formData.append("companyLogo", jobData.logo);
    } else {
      console.error("No logo found in jobData!");
    }

    // Log FormData contents
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }

    const response = await axiosInstance.post("/api/v1/post-job", formData);

    return response?.data;
  } catch (error) {
    console.log(error.message);
    return { status: "error", message: error.response?.data?.message || error.message };
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
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "resumeUrl" && key !== "profilePicture") {
        formData.append(key, jobData[key]);
      }
    })
    if (jobData.resumeUrl) {
      // Handle FileList from file input
      const resumeFile = jobData.resumeUrl instanceof FileList
        ? jobData.resumeUrl[0]
        : jobData.resumeUrl;
      if (resumeFile) {
        formData.append("resumeUrl", resumeFile);
      }
    }
    if (jobData.profilePicture) {
      // Handle FileList from file input
      const pictureFile = jobData.profilePicture instanceof FileList
        ? jobData.profilePicture[0]
        : jobData.profilePicture;
      if (pictureFile) {
        formData.append("profilePicture", pictureFile);
      }
    }
    const response = await axiosInstance.post("api/v1/edit-profile", formData)
    return response?.data
  } catch (error) {
    console.log(error.message);
  }
}

export const editAdminProfile = async (jobData) => {
  try {
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "profilePicture") {
        formData.append(key, jobData[key]);
      }
    });

    if (jobData.profilePicture) {
      formData.append("profilePicture", jobData.profilePicture);
    }

    const response = await axiosInstance.post(
      "api/v1/edit-admin-profile",
      formData,
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );

    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const applyJob = async (jobId, applicationData) => {
  try {
    if (!applicationData) {
      throw new Error("Application data is missing");
    }

    const formData = new FormData();

    Object.keys(applicationData).forEach((key) => {
      if (key !== "resume" && applicationData[key] !== null) {
        formData.append(key, applicationData[key]);
      }
    });

    if (applicationData.resume && applicationData.resume.length > 0) {
      formData.append("resumeUrl", applicationData.resume[0]);
    } else if (applicationData.resumeUrl) {
      formData.append("resumeUrl", applicationData.resumeUrl);
    }

    const response = await axiosInstance.post(
      `/api/v1/apply-job/${jobId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Apply Job Error:", error.message);
    throw error;
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