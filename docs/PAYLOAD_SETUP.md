# Payload CMS Setup Guide

## ✅ Installation Complete!

Your Next.js project has been successfully configured with **Payload CMS 3.62.0** (latest version).

## 📦 Installed Packages

- **Next.js**: 15.5.6 (upgraded from 14.2.25)
- **React**: 19.0.0
- **Payload CMS**: 3.62.0
- **Database Adapter**: @payloadcms/db-mongodb 3.62.0
- **Rich Text Editor**: @payloadcms/richtext-lexical 3.62.0

## 🔧 Configuration Files

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `PAYLOAD_SECRET`: A secure random string (use a password generator)
- `DATABASE_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/cplab`)
- `NEXT_PUBLIC_SERVER_URL`: Your application URL (default: `http://localhost:3000`)

### 2. Payload Config

Location: `/payload.config.ts`

This file contains your Payload CMS configuration including:
- Database adapter (MongoDB)
- Rich text editor (Lexical)
- Collections (add your content types here)
- Admin panel settings

### 3. Next.js Config

Location: `/next.config.mjs`

Updated to use the Payload plugin with `withPayload()` wrapper.

### 4. TypeScript Config

Location: `/tsconfig.json`

Added path alias: `@payload-config` → `./payload.config.ts`

## 📁 Project Structure

```
app/
├── (frontend)/          # Your existing Next.js app
│   ├── certificate/
│   ├── contact/
│   ├── login/
│   ├── news/
│   ├── publications/
│   ├── signup/
│   ├── team/
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── (payload)/          # Payload CMS routes
│   ├── admin/          # Admin panel UI
│   │   └── [[...segments]]/
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   ├── api/            # REST API endpoints
│   │   └── [...slug]/
│   │       └── route.ts
│   ├── graphql/        # GraphQL endpoint
│   │   └── route.ts
│   ├── graphql-playground/
│   │   └── route.ts
│   ├── custom.scss     # Custom admin panel styles
│   └── layout.tsx
└── globals.css         # Global styles
```

## 🚀 Getting Started

1. **Set up MongoDB**:
   - Install MongoDB locally or use MongoDB Atlas
   - Update `DATABASE_URI` in your `.env` file

2. **Generate a secret**:
   ```bash
   openssl rand -base64 32
   ```
   Add this to `PAYLOAD_SECRET` in your `.env` file

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Access the admin panel**:
   - Navigate to `http://localhost:3000/admin`
   - Create your first admin user
   - Start managing content!

## 🎯 Next Steps

### 1. Create Collections

Edit `/payload.config.ts` and add your collections:

```typescript
collections: [
  {
    slug: 'posts',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'content',
        type: 'richText',
        required: true,
      },
    ],
  },
],
```

### 2. Access REST API

Once you've created collections, they're available via REST API:

- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create post
- PATCH `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post

### 3. Access GraphQL API

GraphQL endpoint: `http://localhost:3000/api/graphql`
GraphQL Playground: `http://localhost:3000/api/graphql-playground`

### 4. Customize Admin Panel

Edit `/app/(payload)/custom.scss` to customize the admin panel appearance:

```scss
:root {
  --theme-elevation-900: #1a1a1a;
  --theme-elevation-800: #242424;
}
```

## 📚 Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [MongoDB Setup Guide](https://www.mongodb.com/docs/manual/installation/)

## 🔍 API Endpoints

- **Admin Panel**: `/admin`
- **REST API**: `/api/*`
- **GraphQL**: `/api/graphql`
- **GraphQL Playground**: `/api/graphql-playground`

## 💡 Tips

1. **Type Safety**: Payload automatically generates TypeScript types in `payload-types.ts`
2. **Local API**: Use Payload's Local API for server-side data fetching
3. **Access Control**: Configure authentication and permissions per collection
4. **Hooks**: Use Payload hooks for custom business logic
5. **Custom Components**: Replace any part of the admin UI with your own React components

## 🐛 Troubleshooting

- If you see module errors, run `pnpm install` to ensure all dependencies are installed
- Make sure MongoDB is running before starting the dev server
- Check that your `.env` file has all required variables

Enjoy building with Payload CMS! 🎉
