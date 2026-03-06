# Admin Job Isolation Documentation

## Overview
This document explains how the CareerView platform ensures that one admin cannot see or manage another admin's jobs and applications. This security feature is critical for maintaining data privacy and preventing unauthorized access.

## Core Principle
Each job has a `postedBy` field that stores the `userId` of the admin who created it. All admin-related queries filter jobs and applications based on this field, ensuring admins can only access their own data.

---

## How Jobs are Retrieved

### 1. **getAllJobs Endpoint** (`GET /api/v1/get-all-jobs`)

**Purpose**: Fetch all jobs based on user role

**Implementation**:
```javascript
- For ADMIN users: Returns only jobs where postedBy === adminId
- For REGULAR users: Returns all active jobs (JobStatus: "active")
```

**Security Check**:
1. Extracts userId from authenticated token
2. Fetches user from database
3. If role === "admin": Filters by `Job.find({ postedBy: userId })`
4. If role === "user": Shows all active jobs

**Result**: Admin A cannot see jobs posted by Admin B

---

### 2. **adminStats Endpoint** (`GET /api/v1/get-admin-stats`)

**Purpose**: Display dashboard statistics for admin

**Implementation**:
```javascript
- Total Jobs: Counts only jobs where postedBy === adminId
- Active Jobs: Counts active jobs where postedBy === adminId
- Total Applicants: Counts applications for admin's jobs only
- Pending Review: Counts pending applications for admin's jobs only
```

**Security Check**:
1. Verifies user role === "admin"
2. Fetches only jobs posted by logged-in admin
3. Counts applications only for those jobs

**Result**: Admin sees statistics only for their own jobs

---

### 3. **getAllApplications Endpoint** (`GET /api/v1/applications`)

**Purpose**: View all job applications

**Implementation**:
```javascript
1. Get all jobs posted by adminId
2. Extract jobIds from those jobs
3. Fetch applications where jobId is in adminJobIds
```

**Security Check**:
1. Verifies user role === "admin"
2. Filters applications by admin's job IDs only

**Result**: Admin only sees applications to their posted jobs

---

### 4. **getApplicationOfJobByJobId Endpoint** (`GET /api/v1/get-applications-by-jobId/:jobId`)

**Purpose**: View applications for a specific job

**Implementation**:
```javascript
1. Fetch the job by jobId
2. Verify job.postedBy === adminId
3. If match: Return applications
4. If no match: Return 403 Forbidden
```

**Security Check**:
1. Verifies job ownership before showing applications
2. Returns error if admin doesn't own the job

**Result**: Admin can only view applications for jobs they posted

---

### 5. **changeApplicationStatus Endpoint** (`PUT /api/v1/change-application-status/:jobId`)

**Purpose**: Update application status (accept/reject/interview)

**Implementation**:
```javascript
1. Fetch the job by jobId
2. Verify job.postedBy === adminId
3. If match: Update application status
4. If no match: Return 403 Forbidden
```

**Security Check**:
1. Validates job ownership
2. Prevents admin from changing status of other admin's job applications

**Result**: Admin can only manage applications for their own jobs

---

### 6. **getTopPerformingJobs Endpoint** (`GET /api/v1/get-top-performing-jobs`)

**Purpose**: View top performing jobs by views and applications

**Implementation**:
```javascript
1. Fetch only jobs where postedBy === adminId
2. Calculate application counts for each job
3. Sort by views and applications
4. Return top 5 jobs
```

**Security Check**:
1. Requires authentication
2. Verifies admin role
3. Filters jobs by admin ownership

**Result**: Shows performance metrics only for admin's own jobs

---

### 7. **editJob Endpoint** (`POST /api/v1/edit-job`)

**Purpose**: Update job details

**Implementation**:
```javascript
1. Verify user role === "admin"
2. Fetch job by jobId
3. Check if job.postedBy === userId
4. If match: Allow edit
5. If no match: Return 403 error
```

**Security Check**:
- Validates ownership with: `job.postedBy.toString() !== userId`

**Result**: Admin can only edit their own jobs

---

## Database Schema

### Job Schema
```javascript
{
  jobTitle: String,
  companyName: String,
  postedBy: { type: ObjectId, ref: "User" },  // Critical field for isolation
  JobStatus: String,
  // ... other fields
}
```

### JobApplication Schema
```javascript
{
  jobId: { type: ObjectId, ref: "Job" },      // Links to specific job
  applicantId: { type: ObjectId, ref: "User" },
  status: String,
  // ... other fields
}
```

**Key Point**: Applications are linked to jobs via `jobId`, which in turn has a `postedBy` field linking to the admin.

---

## Security Flow Diagram

```
Request → Authentication Middleware → Extract userId
                                           ↓
                                    Get User from DB
                                           ↓
                                    Check Role (Admin/User)
                                           ↓
                            ┌──────────────┴──────────────┐
                         Admin                          User
                            ↓                              ↓
                Filter by postedBy: userId    Show all active jobs
                            ↓
                Return filtered results
```

---

## Testing Admin Isolation

### Test Case 1: Different Admins Cannot See Each Other's Jobs
```
1. Admin A posts Job X
2. Admin B posts Job Y
3. Admin A calls getAllJobs → Should only see Job X
4. Admin B calls getAllJobs → Should only see Job Y
```

### Test Case 2: Application Access Control
```
1. Admin A posts Job X
2. Student applies to Job X
3. Admin B tries to view applications for Job X → Should get 403 Forbidden
4. Admin A views applications for Job X → Should succeed
```

### Test Case 3: Statistics Isolation
```
1. Admin A has 5 jobs, 20 applications
2. Admin B has 3 jobs, 10 applications
3. Admin A calls adminStats → Should see: totalJobs: 5, totalApplicants: 20
4. Admin B calls adminStats → Should see: totalJobs: 3, totalApplicants: 10
```

---

## Regular Users (Students) Behavior

Regular users (role: "user") have different access:
- Can see ALL active jobs from ALL admins
- Can apply to any active job
- Can view their own applications
- Cannot see other users' applications
- Cannot see admin dashboard or statistics

---

## Error Responses

### 403 Forbidden
Returned when admin tries to access another admin's data:
```json
{
  "status": "error",
  "message": "Access denied. You can only view applications for jobs you posted."
}
```

### 404 Not Found
Returned when job or user doesn't exist:
```json
{
  "status": "error",
  "message": "Job not found"
}
```

---

## Summary

The admin isolation mechanism ensures:
✅ Admins only see jobs they posted
✅ Admins only see applications to their jobs
✅ Admins cannot modify other admins' jobs or applications
✅ Dashboard statistics are personalized per admin
✅ Regular users can see all active jobs across all admins

This creates a secure multi-tenant environment where multiple recruiters can use the platform without interfering with each other's data.
