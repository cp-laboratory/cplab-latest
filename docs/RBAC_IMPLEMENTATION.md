# Role-Based Access Control (RBAC) Implementation Summary

## System Architecture

```
CPLab User Management
├── Professors (Admins)
│   ├── Full admin access
│   ├── Can manage all users
│   ├── Can upload media
│   └── Can manage all collections
│
└── Students (Members)
    ├── View own profile only
    ├── Edit own profile only
    ├── Cannot create users
    └── Cannot upload media (view only)
```

## Implementation Files

### 1. `/collections/Users.ts`
Custom users collection with:
- Role-based field visibility
- Access control rules
- Auto-generated full name
- Conditional fields (professor vs student)

### 2. `/payload.config.ts`
Updated configuration with:
- Custom Users collection import
- Media access control (professors only)
- Admin panel configuration

## Key Features Implemented

### ✅ Role Selection
When creating a new user (admin only), admins can choose:
- **Professor (Admin)** - Full access
- **Student (Member)** - Limited access

### ✅ Access Control

#### Create Users
```typescript
create: ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'professor' // Only professors
}
```

#### Read Users
```typescript
read: ({ req: { user } }) => {
  if (!user) return false
  
  // Professors see all
  if (user.role === 'professor') return true
  
  // Students see only themselves
  if (user.role === 'student') {
    return { id: { equals: user.id } }
  }
  
  return false
}
```

#### Update Users
```typescript
update: ({ req: { user } }) => {
  if (!user) return false
  
  // Professors update anyone
  if (user.role === 'professor') return true
  
  // Students update only themselves
  if (user.role === 'student') {
    return { id: { equals: user.id } }
  }
  
  return false
}
```

#### Delete Users
```typescript
delete: ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'professor' // Only professors
}
```

### ✅ Field-Level Security

#### Role Field
```typescript
{
  name: 'role',
  access: {
    // Only professors can change roles
    update: ({ req: { user } }) => user?.role === 'professor'
  }
}
```

#### Conditional Fields
```typescript
// Professor-only field
{
  name: 'researchInterests',
  admin: {
    condition: (data) => data.role === 'professor'
  }
}

// Student-only field
{
  name: 'studentId',
  admin: {
    condition: (data) => data.role === 'student'
  }
}
```

### ✅ Media Access Control
```typescript
{
  slug: 'media',
  access: {
    create: ({ req: { user } }) => user?.role === 'professor',
    read: () => true, // Anyone can view
    update: ({ req: { user } }) => user?.role === 'professor',
    delete: ({ req: { user } }) => user?.role === 'professor',
  }
}
```

## User Schema

```typescript
interface User {
  // Authentication
  email: string              // required, unique
  password: string           // required, hashed
  
  // Role & Identity
  role: 'professor' | 'student'  // required, default: 'student'
  firstName: string          // required
  lastName: string           // required
  fullName: string           // auto-generated
  
  // Profile
  profileImage?: Media       // optional upload
  department?: string        // optional
  bio?: string              // optional
  
  // Professor-specific
  researchInterests?: string // textarea, professors only
  
  // Student-specific
  studentId?: string         // text, students only
  enrollmentYear?: number    // number, students only
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}
```

## Admin Panel Behavior

### For Professors
- **Sidebar shows**: All collections (Users, Media, etc.)
- **Users list**: Shows all users with role badges
- **Create button**: Available to create new users
- **User form**: Shows role selection dropdown
- **Media**: Full upload and management access

### For Students
- **Sidebar shows**: Limited collections (no Users collection menu)
- **Account page**: Shows only their own profile
- **Edit**: Can edit their own information
- **Role field**: Disabled/hidden
- **Media**: View only (no upload button)

## Testing Checklist

### Professor Account Test
- [ ] Can see Users menu
- [ ] Can view all users in list
- [ ] Can create new users
- [ ] Can select role for new users
- [ ] Can edit any user
- [ ] Can delete users
- [ ] Can upload media files
- [ ] Can edit/delete media files

### Student Account Test
- [ ] Cannot see Users menu in sidebar
- [ ] Redirected to own account page
- [ ] Can edit own profile
- [ ] Cannot change own role
- [ ] Cannot see other users
- [ ] Cannot create new users
- [ ] Can view media files
- [ ] Cannot upload media files
- [ ] Cannot delete media files

## Security Notes

1. **Password Security**: All passwords are automatically hashed by Payload
2. **Session Management**: Built-in JWT authentication
3. **API Protection**: All API endpoints respect access control rules
4. **Field-Level Protection**: Role field can only be modified by professors
5. **Query Filtering**: Students' queries are automatically filtered to their own data

## Future Enhancements

Consider adding:
- Email verification on account creation
- Password complexity requirements
- Two-factor authentication
- Activity logging
- Bulk user import
- Custom student groups/cohorts
- Project assignments with permissions
- Publications collection with co-author access
- Research notes/lab notebook collection

## Database Indexes

Recommended indexes for performance:
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ department: 1 })
db.users.createIndex({ enrollmentYear: 1 })
```

## Migration Notes

If you have existing users in the database:
1. All existing users will need a `role` field
2. Run a migration to set roles:
```javascript
// Set all existing users to 'student'
db.users.updateMany(
  { role: { $exists: false } },
  { $set: { role: 'student' } }
)

// Manually promote specific users to professor
db.users.updateMany(
  { email: { $in: ['admin@example.com', 'prof@example.com'] } },
  { $set: { role: 'professor' } }
)
```

## API Response Examples

### GET /api/users (as Professor)
```json
{
  "docs": [
    {
      "id": "123",
      "email": "prof@example.com",
      "role": "professor",
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe"
    },
    {
      "id": "456",
      "email": "student@example.com",
      "role": "student",
      "firstName": "Jane",
      "lastName": "Smith",
      "fullName": "Jane Smith"
    }
  ],
  "totalDocs": 2
}
```

### GET /api/users (as Student)
```json
{
  "docs": [
    {
      "id": "456",
      "email": "student@example.com",
      "role": "student",
      "firstName": "Jane",
      "lastName": "Smith",
      "fullName": "Jane Smith"
    }
  ],
  "totalDocs": 1
}
```

## Support

For issues or questions:
1. Check the QUICK_START.md guide
2. Review USER_MANAGEMENT_SETUP.md documentation
3. Check Payload CMS docs: https://payloadcms.com/docs
4. Review access control: https://payloadcms.com/docs/access-control
