# Quick Start Guide - Role-Based User Management

## What Changed?

✅ **Custom Users Collection** with two roles:
- **Professor (Admin)**: Full access to everything
- **Student (Member)**: Can only view/edit their own profile

✅ **Access Control Rules**:
- Professors can create, view, edit, and delete all users
- Students can only view and edit their own account
- Only professors can upload media files

## First-Time Setup

### Step 1: Start the Development Server
```bash
pnpm run dev
```

### Step 2: Create First Admin Account
1. Go to: http://localhost:3000/admin
2. You'll see the "Create First User" screen
3. **IMPORTANT**: Fill in the form with these fields:
   - **Email**: your-email@example.com
   - **Password**: YourSecurePassword123
   - **Role**: Select **"Professor (Admin)"** ← THIS IS CRITICAL!
   - **First Name**: Your first name
   - **Last Name**: Your last name
4. Click **Create**

### Step 3: Test Admin Access
After logging in as a professor, you should see:
- ✅ Users menu in the sidebar
- ✅ "Create New" button in Users collection
- ✅ All users listed
- ✅ Media upload capabilities

### Step 4: Create a Test Student Account
1. Click **Users** → **Create New**
2. Fill in:
   - Email: student@example.com
   - Password: student123
   - **Role**: Select **"Student (Member)"**
   - First Name: Test
   - Last Name: Student
   - Student ID: S12345
   - Enrollment Year: 2024
3. Click **Create**

### Step 5: Test Student Access
1. Log out (click your email in top right → Logout)
2. Log in as the student (student@example.com / student123)
3. Verify the student can:
   - ✅ See only their own account
   - ✅ Edit their own profile
   - ❌ NOT see other users
   - ❌ NOT create new users
   - ❌ NOT upload media

## User Fields Explained

### All Users Have:
- Email (required, unique) - Used for login
- Password (required, min 8 chars)
- Role (Professor or Student)
- First Name (required)
- Last Name (required)
- Full Name (auto-generated from first + last)
- Profile Image (optional upload)
- Department (optional)
- Bio (optional)

### Professors Also Have:
- Research Interests (textarea)

### Students Also Have:
- Student ID (text)
- Enrollment Year (number)

## Access Control Matrix

| Action | Professor | Student |
|--------|-----------|---------|
| Create users | ✅ Yes | ❌ No |
| View all users | ✅ Yes | ❌ No |
| View own profile | ✅ Yes | ✅ Yes |
| Edit any user | ✅ Yes | ❌ No |
| Edit own profile | ✅ Yes | ✅ Yes |
| Change user roles | ✅ Yes | ❌ No |
| Delete users | ✅ Yes | ❌ No |
| Upload media | ✅ Yes | ❌ No |
| View media | ✅ Yes | ✅ Yes |

## Common Tasks

### As a Professor - Creating a New User

1. Login to /admin
2. Click **Users** in the sidebar
3. Click **Create New**
4. Choose the role:
   - **Professor**: For faculty/admin staff
   - **Student**: For lab members/students
5. Fill in required fields (email, password, first name, last name)
6. Add optional fields (department, bio, etc.)
7. Click **Create**

### As a Student - Updating Your Profile

1. Login to /admin
2. You'll be redirected to your account page
3. Edit your information:
   - Update bio
   - Add profile picture
   - Update department
   - Change password
4. Click **Save**

## API Endpoints

### Authentication
```bash
# Login
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Logout
POST /api/users/logout

# Get current user
GET /api/users/me
```

### User Management (Professor Only)
```bash
# List all users
GET /api/users

# Create user
POST /api/users
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe"
}

# Update user
PATCH /api/users/:id
{
  "firstName": "Jane"
}

# Delete user
DELETE /api/users/:id
```

### Student Self-Management
```bash
# Get own profile
GET /api/users/me

# Update own profile
PATCH /api/users/me
{
  "bio": "Updated biography",
  "department": "Computer Science"
}
```

## Troubleshooting

### Problem: First user doesn't have admin access
**Solution**: Make sure you selected "Professor (Admin)" when creating the first account.

If you accidentally created a student account first, you can fix it:
1. Stop the server
2. Access your MongoDB database
3. Update the user:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "professor" } }
)
```

### Problem: Student can see all users
**Solution**: Check that the access control is working. Clear your browser cache and try again.

### Problem: Cannot upload media as professor
**Solution**: Check that:
1. Your role is set to "professor"
2. You're logged in
3. The media collection has the correct access rules

## Next Steps

1. ✅ Create your first professor account
2. ✅ Create test student accounts
3. 📧 Configure email settings for password resets
4. 🎨 Customize the admin panel branding
5. 📝 Add more collections (publications, research, news)
6. 🔐 Set up production database and deploy

## Files Modified

- `/collections/Users.ts` - Custom users collection with RBAC
- `/payload.config.ts` - Updated to use custom users and add media access control
- `/USER_MANAGEMENT_SETUP.md` - Full documentation
- `/QUICK_START.md` - This guide

## Need Help?

See the detailed documentation in `USER_MANAGEMENT_SETUP.md` for more information about:
- Access control rules
- Field-level security
- Database structure
- Additional collections
- Testing procedures
