# seminar-hall-BE

## setup

1. need node js
1. using express generator, create the project.
1. command `express --view=ejs seminar-hall-BE`
1. add `.gitignore` file.
1. copy below code and paste in `.gitignore` file.

### 📃 `.gitignore`

```makefile
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

---

## PROJECT PLAN

## Requirement Gathering and Planning

### Features

- User authentication (master and admin and normal users)
- Seminar hall listing
- Availability checking
- Booking functionality
- Admin panel for managing halls and bookings
- Email notifications for confirmations

### Roles

- `master`: Add/update/delete create admin, update, delete admins
- `Admin`: Add/update/delete seminar halls, view  manage bookings
- `User`: View available halls, make bookings

### Tech Stack

- `Frontend`: React.js, Redux (for state management), Axios (for API requests)
- `Backend`: Node.js, Express.js, MongoDB (with Mongoose for schema handling)
- `Authentication`: JWT (JSON Web Tokens) for session management
- `Styling`: Material-UI for styling the frontend
- `Deployment`: Vercel/Netlify for frontend, Heroku/Vercel/Render for backend
- `Database`: MongoDB (cloud service like MongoDB Atlas)

---

## Database design ( mongod db )

### `Users Collection`

```json
{
  "_id": "ObjectId",
  "college_id": "ObjectId", 
  "name": "string",
  "email": "string",
  "reg_id":"string",  // roll no
  "contacts":["string"], // phone no
  "password": "hashed string", 
  "role": "user",
  "bookings": ["bookingId"]
}
```

### `College Collection`

```json
{
  "_id": "ObjectId",
  "name": "string",
    location: { type: String, required: true },
  "admins": ["adminId"], // List of admin user IDs managing the college
  "seminarHalls": ["hallId"]  // Seminar halls within the college
}
```

### `Seminar hall`

```json
{
  "_id": "ObjectId",
  "name": "string",
  "collegeId": "ObjectId",  // College to which the seminar hall belongs
  "capacity": "number",
  "amenities": ["projector", "AC", "Wi-Fi", "chairs"],
  "slotDetail": {
    "sun":[],
    "mon":[
        { 
          "id":"ObjectId",
          "time": "9 AM to 10 PM",
          "booked": false
        }
    ], 
    "tue":[], 
    "wed":[], 
    "thur":[], 
    "fri":[], 
    "sat":[],  
  }
}

```

### `Booking collection`

```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId",
  "seminarHallId": "ObjectId",
  "collegeId": "ObjectId",  // For easier query and management
  "slots":["slot_id"],
  "status": "confirmed/pending/cancelled"
}
```

---

## Backend API

### Auth Routes

- Signup/Login for both admins and students.
- Differentiate between admin and student roles during signup.

### College Management (Admin only)

- Add/Edit/Delete Colleges (/colleges): Admins can manage colleges they are assigned to.
- Add/Edit/Delete Seminar Halls (/colleges/:collegeId/seminar-halls): Admins can manage seminar halls within their college.

### Seminar Hall Booking (Students)

- View Available Seminar Halls (/seminar-halls?collegeId=:collegeId): Students can filter seminar halls by college.
- Book Seminar Hall (/bookings): Students can book available seminar halls.
- Cancel Booking (/bookings/:bookingId/cancel).

### Admin Dashboard

- View/manage bookings and halls for the college they are associated with.
- Approve/reject/cancel student bookings.


---

![image](https://github.com/user-attachments/assets/e1f39c3e-f254-4562-9ac7-eac3cbb5b83e)
