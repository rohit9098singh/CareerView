// Type for the user profile data payload
export type userProfilePayloadType = {
  _id: string;
    name: string;
    role:string;
    email:string;
    phoneNumber: string;
    location: string;
    bio: string;
    skills: string[]; // array of strings
    studyingAt: string;
    profilePicture: string; // URL of the profile picture
    resumeUrl: string; // URL of the resume
  };
  
  // Type for the API response containing the user profile
  export type UserProfileApiResponse = {
    status: "success" | "error"; // status of the request
    message: string; // message about the request
    data: userProfilePayloadType; // user profile data
  };
  