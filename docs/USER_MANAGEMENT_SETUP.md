# User Management Setup - CPLab

## Overview
This Payload CMS implementation has two types of users with role-based access control:

### User Roles

#### 1. Professor (Admin)
- **Access Level**: Full admin access
- **Permissions**:
  - ✅ Create new accounts (professors and students)
  - ✅ View all users
  - ✅ Edit all users
  - ✅ Delete any user
  - ✅ Upload and manage media files
  - ✅ Change user roles
  - ✅ Access all collections

#### 2. Student (Member)
- **Access Level**: Limited to own account
- **Permissions**:
  - ❌ Cannot create new accounts
  - ✅ View only their own profile
  - ✅ Edit only their own profile (except role)
  - ❌ Cannot delete accounts
  - ❌ Cannot upload media
  - ❌ Cannot change roles
  - ✅ View media (read-only)

## Creating a New User (Admin Only)

1. Log in as a Professor (admin)
2. Navigate to **Users** in the admin panel
3. Click **Create New**
4. Fill in the required fields:
   - **Email**: User's email address
   - **Password**: Initial password for the user
   - **Role**: Select either:
     - **Professor (Admin)**: Full access
     - **Student (Member)**: Limited access
   - **First Name**: User's first name
   - **Last Name**: User's last name
   - **Department**: (Optional) User's department
   - **Bio**: (Optional) Short biography

### Additional Fields

**For Professors:**
- Research Interests: Areas of expertise and research focus

**For Students:**
- Student ID: Student identification number
- Enrollment Year: Year the student enrolled

## First-Time Setup

### Creating the First Admin Account

1. Start the development server:
   ```bash
   pnpm run dev
   ```

2. Navigate to: `http://localhost:3000/admin`

3. On first run, you'll be prompted to create the first user

4. **Important**: Make sure to select **Professor (Admin)** as the role for your first account

5. Fill in the required information:
   - Email
   - Password (min 8 characters)
   - First Name
   - Last Name
   - Role: **Professor (Admin)**

6. Click **Create**

## Security Features

### Access Control Rules

1. **User List**:
   - Professors see all users
   - Students see only themselves

2. **User Creation**:
   - Only professors can create new accounts
   - Role selection is only available to professors

3. **User Editing**:
   - Professors can edit anyone
   - Students can edit only their own profile
   - Students cannot change their role

4. **User Deletion**:
   - Only professors can delete accounts
   - Students cannot delete any accounts

5. **Media Management**:
   - Only professors can upload files
   - Everyone can view media files
   - Only professors can delete media

### Field-Level Security

- **Role Field**: Only professors can modify user roles
- **Research Interests**: Only visible for professors
- **Student ID & Enrollment Year**: Only visible for students

## User Profile Fields

### Common Fields (All Users)
- Email (required, unique)
- Password (required, min 8 characters)
- Role (required)
- First Name (required)
- Last Name (required)
- Full Name (auto-generated)
- Profile Image (upload)
- Department (optional)
- Bio (optional)

### Professor-Specific Fields
- Research Interests

### Student-Specific Fields
- Student ID
- Enrollment Year

## API Access

### For Professors
```javascript
// Get all users
GET /api/users

// Create a new user
POST /api/users
{
  "email": "student@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe"
}

// Update any user
PATCH /api/users/:id

// Delete any user
DELETE /api/users/:id
```

### For Students
```javascript
// Get only their own profile
GET /api/users/me

// Update only their own profile
PATCH /api/users/me
{
  "firstName": "Jane",
  "bio": "Updated bio"
}
```

## Testing the Setup

### Test Professor Account
1. Create a professor account
2. Log in
3. Verify you can:
   - See the Users collection
   - Create new users
   - Select role for new users
   - Edit any user
   - Delete users
   - Upload media

### Test Student Account
1. As a professor, create a student account
2. Log out and log in as the student
3. Verify the student can:
   - See only their own account
   - Edit their own profile
   - NOT see other users
   - NOT create new users
   - NOT change their role
   - NOT upload media

## Troubleshooting

### Issue: Cannot see Users collection
**Solution**: Make sure you're logged in as a Professor

### Issue: Cannot create new users
**Solution**: Only professors can create users. Check your role.

### Issue: Student can see other users
**Solution**: Check the access control rules in `/collections/Users.ts`

### Issue: First user has no admin access
**Solution**: The first user created must have role set to "professor". You may need to update the database directly:

```javascript
// In MongoDB or via payload
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "professor" } }
)
```

## Database Structure

Users are stored in the `users` collection with the following schema:

```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  role: 'professor' | 'student',
  firstName: string,
  lastName: string,
  fullName: string,
  profileImage: ObjectId (relation to media),
  department?: string,
  bio?: string,
  researchInterests?: string, // professors only
  studentId?: string, // students only
  enrollmentYear?: number, // students only
  createdAt: Date,
  updatedAt: Date
}
```

## Next Steps

1. ✅ Create your first professor account
2. ✅ Create additional professor accounts if needed
3. ✅ Create student accounts for lab members
4. 📧 Consider setting up email notifications for new accounts
5. 🔐 Set up password reset functionality (already included with Payload auth)
6. 📝 Add additional collections as needed (publications, news, etc.)

## Additional Collections

You can create more collections with similar role-based access. For example:

- **Publications**: Professors can create/edit, students can only view
- **News**: Professors can create/edit, students can only view
- **Projects**: Professors can create/edit, students assigned to projects can view/edit their own

Just use the same access control pattern from the Users collection.
