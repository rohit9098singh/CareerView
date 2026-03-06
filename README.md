# CareerView - Job Portal Platform

A full-stack job portal application built with Next.js (frontend) and Node.js/Express (backend) that connects job seekers with recruiters.

## 🚀 Features

### For Students/Job Seekers
- Browse and search active job listings
- Save jobs for later viewing
- Apply to jobs with resume and cover letter
- Track application status (pending, accepted, rejected, interview)
- View personalized job recommendations
- Update profile with skills and experience

### For Admins/Recruiters
- Post and manage job listings
- View applications for your posted jobs only
- Update application status
- Dashboard with statistics (jobs, applications, pending reviews)
- View top performing jobs (by views and applications)
- Manage company profiles

## 🔒 Security Features

### Admin Job Isolation
**Critical Feature**: Each admin can only see and manage their own posted jobs and applications.

- Jobs are filtered by `postedBy` field (admin's user ID)
- All admin endpoints verify job ownership before allowing access
- Dashboard statistics are personalized per admin
- No cross-admin data visibility

See [ADMIN_JOB_ISOLATION.md](Backend/ADMIN_JOB_ISOLATION.md) for detailed documentation.

## 📁 Project Structure

```
CareearView/
├── Backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   ├── dbConnect.js           # MongoDB connection
│   │   └── emailConfiguration.js  # Email service setup
│   ├── controllers/
│   │   ├── authControllers.js     # Authentication logic
│   │   ├── jobControllers.js      # Job CRUD operations
│   │   └── jobApplicationController.js # Application management
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication
│   ├── models/
│   │   ├── userModel.js           # User schema
│   │   ├── jobModel.js            # Job schema
│   │   └── jobApplicationModel.js # Application schema
│   ├── routes/
│   │   ├── authRouter.js          # Auth routes
│   │   └── jobRouter.js           # Job routes
│   ├── utils/
│   │   └── responseHandler.js     # Standardized API responses
│   ├── uploads/                   # Temporary file uploads
│   ├── index.js                   # Server entry point
│   ├── package.json
│   ├── ADMIN_JOB_ISOLATION.md     # Security documentation
│   └── BUG_FIXES_SUMMARY.md       # Recent fixes
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── screen/
    │   │   │   ├── Admin/         # Admin dashboard screens
    │   │   │   ├── student/       # Student/user screens
    │   │   │   └── Auth/          # Authentication screens
    │   │   ├── services/          # API service layer
    │   │   └── custom/            # Reusable components
    │   ├── context/               # React context providers
    │   └── types/                 # TypeScript definitions
    ├── public/
    ├── next.config.ts
    ├── package.json
    └── tsconfig.json

```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Security**: bcryptjs, CORS

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **HTTP Client**: Axios
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)
- Email service credentials (for password reset)

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - Login user
- `POST /api/v1/logout` - Logout user
- `POST /api/v1/forgot-password` - Request password reset
- `POST /api/v1/reset-password/:token` - Reset password
- `POST /api/v1/change-password` - Change password (authenticated)
- `GET /api/v1/verify-auth` - Verify authentication status
- `DELETE /api/v1/delete-account` - Delete account (authenticated)

### Jobs (Student/User)
- `GET /api/v1/latest-jobs` - Get 10 latest active jobs
- `GET /api/v1/get-recomendation` - Get personalized job suggestions
- `GET /api/v1/get-job-details/:jobId` - Get job details
- `POST /api/v1/save-unsave-job/:jobId` - Save/unsave job
- `GET /api/v1/getall-savedjobs` - Get all saved jobs
- `GET /api/v1/get-all-applied-jobs` - Get user's applied jobs
- `GET /api/v1/get-user-stats` - Get application statistics
- `POST /api/v1/apply-job/:jobId` - Apply to job
- `POST /api/v1/edit-profile` - Update user profile

### Jobs (Admin)
- `POST /api/v1/post-job` - Post new job (admin only)
- `POST /api/v1/edit-job` - Edit job (admin only, own jobs)
- `GET /api/v1/get-all-jobs` - Get admin's posted jobs
- `GET /api/v1/get-admin-stats` - Get admin dashboard stats
- `GET /api/v1/get-top-performing-jobs` - Get top 5 performing jobs
- `GET /api/v1/get-applications-by-jobId/:jobId` - Get applications for specific job
- `PUT /api/v1/change-application-status/:jobId` - Update application status
- `GET /api/v1/applications` - Get all applications for admin's jobs
- `POST /api/v1/edit-admin-profile` - Update admin profile

## 🐛 Recent Bug Fixes

### Critical Security Fixes (March 2026)
1. ✅ Fixed admin job visibility - admins now only see their own jobs
2. ✅ Fixed dashboard stats - now personalized per admin
3. ✅ Fixed application access - admins can only view their job applications
4. ✅ Added authorization checks for application management
5. ✅ Fixed top performing jobs endpoint security
6. ✅ Fixed latest jobs showing inactive listings
7. ✅ Added proper role-based access control (RBAC)

### Email & Upload Fixes (March 6, 2026)
8. ✅ Fixed reset password email not sending - added proper error handling
9. ✅ Fixed email branding (changed from "BookKart" to "CareerView")
10. ✅ Fixed Cloudinary configuration - supports both CLOUDINARY_CLOUD_NAME and CLOUDINARY_NAME
11. ✅ Fixed duplicate studyingAt field in User model
12. ✅ Added skills parsing in editProfile - supports JSON, comma-separated, and single values
13. ✅ Improved email templates with professional styling
14. ✅ Added environment variable validation on startup
15. ✅ Enhanced file upload error messages and logging

See [BUG_FIXES_SUMMARY.md](Backend/BUG_FIXES_SUMMARY.md) for security fixes details.  
See [EMAIL_AND_UPLOAD_FIXES.md](Backend/EMAIL_AND_UPLOAD_FIXES.md) for email/upload fixes details.

## 🧪 Testing

### Test Admin Isolation
```bash
# Create two admin accounts
# Admin A posts Job X
# Admin B posts Job Y
# Verify Admin A only sees Job X
# Verify Admin B only sees Job Y
```

### Test Application Access
```bash
# Admin A posts Job X
# Student applies to Job X
# Verify Admin B cannot see/manage this application
# Verify Admin A can see and manage the application
```

## 🚀 Deployment

### Backend (Vercel/Heroku/Railway)
1. Set environment variables
2. Deploy backend
3. Update CORS allowed origins

### Frontend (Vercel/Netlify)
1. Set `NEXT_PUBLIC_API_URL` to production backend URL
2. Build and deploy

## 📝 Environment Variables

### Backend Required Variables
- `PORT` - Server port (default: 8000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (also accepts CLOUDINARY_NAME)
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `EMAIL_USER` - Gmail email address for sending emails
- `EMAIL_PASSWORD` - Gmail App Password (NOT regular password - see setup below)
- `FRONTEND_URL` - Frontend URL for CORS and email links

### Frontend Required Variables
- `NEXT_PUBLIC_API_URL` - Backend API base URL

### 📧 Gmail App Password Setup

**Important**: You must use a Gmail App Password, not your regular Gmail password.

1. Go to your Google Account settings (myaccount.google.com)
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords** (search for it in settings)
5. Select **Mail** and generate a password
6. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
7. Use this password in `EMAIL_PASSWORD` (remove spaces)

Example `.env`:
```env
EMAIL_USER=yourname@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # 16 chars, no spaces
```

### 🖼️ Cloudinary Setup

1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard and copy credentials:
   - **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

For detailed email and upload configuration, see [EMAIL_AND_UPLOAD_FIXES.md](Backend/EMAIL_AND_UPLOAD_FIXES.md)

## 👥 User Roles

### Admin/Recruiter
- Can post and manage jobs
- View and manage applications
- Access admin dashboard
- Cannot see other admins' jobs

### User/Student
- Can browse all active jobs
- Apply to jobs
- Save jobs
- Track application status

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed with bcryptjs
3. Login generates JWT token
4. Token is sent in Authorization header: `Bearer <token>`
5. Protected routes verify token via `authenticateUser` middleware
6. User ID is extracted from token for authorization checks

## 📊 Database Schema

### User
- name, email, password (hashed)
- role: "user" | "admin"
- profile info: phoneNumber, location, bio, skills
- savedJobs[], appliedJobs[]
- profilePicture, resumeUrl

### Job
- jobTitle, companyName, companyLogo
- location, jobType, workPlace
- salaryRange, experienceRequired, skills[]
- JobStatus: "active" | "inActive"
- **postedBy** (User ObjectId) - Critical for admin isolation
- views, timestamps

### JobApplication
- jobId (Job ObjectId)
- applicantId (User ObjectId)
- resumeUrl, coverLetter
- status: "pending" | "applied" | "accepted" | "rejected" | "interview-schedule"
- timestamps

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For issues or questions, please:
1. Check existing documentation
2. Review [ADMIN_JOB_ISOLATION.md](Backend/ADMIN_JOB_ISOLATION.md)
3. Check [BUG_FIXES_SUMMARY.md](Backend/BUG_FIXES_SUMMARY.md)
4. Create an issue in the repository

---

**Last Updated**: March 6, 2026
**Status**: Production Ready ✅
**Security**: Admin Isolation Implemented ✅
