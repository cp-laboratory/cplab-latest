# 🚀 Quick Setup Guide - Email & Storage

## ✅ What's Been Configured

### 📦 Packages Installed
- `@payloadcms/email-nodemailer` - SMTP email adapter
- `nodemailer` - Email transport library
- `@payloadcms/storage-s3` - S3-compatible storage
- `@aws-sdk/client-s3` - AWS SDK for Cloudflare R2

### 📝 Files Updated
- ✓ `payload.config.ts` - Email & R2 storage configuration
- ✓ `.env` - Environment variables template
- ✓ `.env.example` - Example for version control

---

## 🔧 What You Need To Do

### 1️⃣ Get Resend SMTP Credentials (5 minutes)

1. **Sign up**: Go to [resend.com](https://resend.com)
2. **Get API Key**: Dashboard → API Keys → Create API Token
3. **Verify Domain**: 
   - Dashboard → Domains → Add Domain
   - Add DNS records (SPF, DKIM, DMARC)
   - Wait for verification ✓

4. **Update `.env`**:
   ```env
   SMTP_PASS=re_YOUR_ACTUAL_API_KEY_HERE
   SMTP_FROM_EMAIL=noreply@your-verified-domain.com
   ```

### 2️⃣ Setup Cloudflare R2 (10 minutes)

1. **Create Bucket**:
   - Login: [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate: R2 → Create Bucket
   - Name: `cplab-media` (or your choice)

2. **Generate API Token**:
   - R2 → Manage R2 API Tokens → Create API Token
   - Name: `Payload CMS`
   - Permissions: Object Read & Write
   - **Copy immediately**: Access Key ID & Secret Access Key

3. **Get Account ID**:
   - Found in URL: `dash.cloudflare.com/YOUR_ACCOUNT_ID/r2`
   - Or: Account Home → Account ID (sidebar)

4. **Update `.env`**:
   ```env
   R2_ACCOUNT_ID=your_account_id_here
   R2_ACCESS_KEY_ID=your_access_key_here
   R2_SECRET_ACCESS_KEY=your_secret_key_here
   R2_BUCKET_NAME=cplab-media
   ```

5. **Setup Public Access** (Optional):
   - Bucket Settings → Public Access → Allow
   - Connect custom domain: `media.yourdomain.com`
   - Update: `R2_PUBLIC_URL=https://media.yourdomain.com`

### 3️⃣ Test Locally

```bash
# Start dev server
pnpm dev

# Test Email
# 1. Go to http://localhost:3000/admin
# 2. Create admin user
# 3. Try "Forgot Password" - check logs for email

# Test Upload
# 1. Go to http://localhost:3000/admin/collections/media
# 2. Create New → Upload image
# 3. Check Cloudflare R2 bucket for file
```

### 4️⃣ Deploy to Production (Vercel)

Go to: Vercel → Your Project → Settings → Environment Variables

Add ALL these:

```
PAYLOAD_SECRET=your-secret
DATABASE_URI=mongodb+srv://...
NEXT_PUBLIC_SERVER_URL=https://your-site.vercel.app

SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_api_key
SMTP_FROM_NAME=CPLab
SMTP_FROM_EMAIL=noreply@yourdomain.com

R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=cplab-media
R2_PUBLIC_URL=https://media.yourdomain.com
```

Then redeploy!

---

## 🎯 How It Works

### Email Flow
```
User Action (Password Reset)
    ↓
Payload CMS
    ↓
Nodemailer (SMTP Client)
    ↓
Resend SMTP Server (smtp.resend.com:587)
    ↓
User's Email Inbox ✉️
```

### File Upload Flow
```
User Uploads File
    ↓
Payload CMS
    ↓
S3 Storage Plugin
    ↓
Cloudflare R2 (S3-compatible)
    ↓
File stored globally 🌍
    ↓
Public URL: https://media.yourdomain.com/filename.jpg
```

---

## 💡 Switching SMTP Providers

Just change these 4 variables in `.env`:

**Gmail**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**SendGrid**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=SG.your-api-key
```

**Mailgun**:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
```

---

## 🆘 Common Issues

### Email Not Sending?
- ❌ Check: SMTP credentials correct?
- ❌ Domain verified in Resend?
- ❌ Check logs: `pnpm dev` terminal output

### R2 Upload Fails?
- ❌ Bucket name matches exactly?
- ❌ API token has read/write permissions?
- ❌ Account ID is correct?

### Files Upload But Can't View?
- ❌ Configure public access or custom domain
- ❌ Update `R2_PUBLIC_URL`
- ❌ Add CORS policy for client uploads

---

## 📚 Full Documentation

See `PAYLOAD_EMAIL_STORAGE_SETUP.md` for:
- Detailed step-by-step guides
- CORS configuration
- Custom domain setup
- Production deployment checklist
- Cost estimates
- Troubleshooting guide

---

## ✨ Features You Get

### Email Features
✅ User signup verification
✅ Password reset emails
✅ Admin invitation emails
✅ Custom transactional emails
✅ Easy provider switching (just change SMTP)

### Storage Features
✅ Upload images, videos, PDFs
✅ Automatic file management
✅ Global CDN distribution
✅ Zero egress fees (R2)
✅ S3-compatible (easy migration)
✅ Public URL access
✅ Access control

---

## 🎉 You're Ready!

Once you've:
1. ✓ Added Resend API key
2. ✓ Created R2 bucket & tokens
3. ✓ Updated `.env` file
4. ✓ Tested locally

Your Payload CMS has:
- ✨ Professional email system
- ✨ Scalable file storage
- ✨ Production-ready infrastructure

Happy building! 🚀
