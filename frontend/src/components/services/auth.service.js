import axiosInstance from "./url.service";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Register Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/login", userData);
    if (response.data?.data?.token) {
      // Store in localStorage for client-side use
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify({
        role: response.data.data.role,
        email: response.data.data.email,
        name: response.data.data.name
      }));

      // Set cookies for middleware
      document.cookie = `token=${response.data.data.token}; path=/`;
      document.cookie = `role=${response.data.data.role}; path=/`;
      
      // Update axios instance default headers
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error(
      "Login Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/logout");
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    // Remove Authorization header
    delete axiosInstance.defaults.headers.common['Authorization'];
    return response.data;
  } catch (error) {
    console.error(
      "Logout Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/api/v1/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const resetPassword = async (token, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/reset-password/${token}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// export const verifyEmail = async (token) => {
//   try {
//     const response = await axiosInstance.get(`/api/v1/user/verify-email/${token}`);
//     return response.data;
//   } catch (error) {
//     console.error("Verify Email Error:", error.response?.data?.message || error.message);
//     throw error;
//   }
// };

export const verifyAuth = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/verify-auth");
    return response?.data;
  } catch (error) {
    console.error(
      "Verify Auth Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete("/api/v1/delete-account");
    return response?.data;
  } catch (error) {
    console.error(
      "Delete Account Error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};


export const  changePassword=async(data)=>{
  try {
      const response=await axiosInstance.post("api/v1/change-password",data);
      return response?.data;
  } catch (error) {
    console.error("Change Password Error:", error.response?.data?.message || error.message);
    throw error;
  }
}