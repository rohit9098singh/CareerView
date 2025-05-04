import axiosInstance from "./url.service";

export const postJob = async (jobData) => {
  try {
    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      if (key !== "logo" &&  jobData[key] !== null) {
        formData.append(key, jobData[key]);
      }
    });

    if (jobData.logo) {
      formData.append("companyLogo", jobData.logo);
    }
    const response = await axiosInstance.post("/api/v1/post-job", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const editJob=async(jobData)=>{
  try {
    console.log("got allded ")
      const formData=new FormData();

      Object.keys(jobData).forEach((key)=>{
        if(key !=="companyLogo" && jobData[key] !==null){
             formData.append(key,jobData[key]);
        }
      })
      if(jobData.logo){
        formData.append("companyLogo",jobData.companyLogo)
      }

      const response=await axiosInstance.post("/api/v1/edit-job",formData)
      return response?.data
  } catch (error) {
    
  }
}

export const editProfile=async(jobData)=>{
  try {
      const formData= new FormData();

      Object.keys(jobData).forEach((key)=>{
        if(key !=="resumeUrl" && key !=="profilePicture"){
          formData.append(key,jobData[key]);
        }
      })
      if(jobData.resumeUrl){
        formData.append("resumeUrl",jobData.resumeUrl)
      }
      if(jobData.profilePicture){
        formData.append("profilePicture",jobData.profilePicture)
      }
      const response=await axiosInstance.post("api/v1/edit-profile",formData,
      //   {
      //   headers:{
      //     "Content-Type":"multipart/form-data",
      //   }
      // }
    )
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


export const  getAllJobs=async()=>{
  try {
    
    const response=await axiosInstance.get(`/api/v1/get-all-jobs`);
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





export const updateApplicationStatus = async (applicantId, status) => {
  try {
    const response = await axiosInstance.put(`/api/v1/change-application-status/${applicantId}`, {
      status,
      applicantId
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
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

export const getTopPerformingJobs=async()=>{
  try {
     const response=await axiosInstance.get(`/api/v1/get-top-performing-jobs`);
     return response?.data;
  } catch (error) {
      console.log(error)
  }
}
