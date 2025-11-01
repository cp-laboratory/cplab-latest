# Payload CMS Email & Storage Setup Guide

## Overview

This guide explains how to configure:
1. **Email** - SMTP server using Resend (easily changeable to any SMTP provider)
2. **File Storage** - Cloudflare R2 (S3-compatible object storage)

---

## 1. Email Configuration (SMTP with Resend)

### Why SMTP instead of Resend API?
- **Flexibility**: Easy to switch between email providers (Resend, SendGrid, Mailgun, etc.)
- **Compatibility**: Standard SMTP works everywhere
- **No vendor lock-in**: Change SMTP credentials to switch providers instantly

### Resend SMTP Setup

#### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up/login
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy the API key (starts with `re_...`)

#### Step 2: Configure Environment Variables

Update your `.env` file:

```env
# SMTP Email Configuration (Resend)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_actual_api_key_here
SMTP_FROM_NAME=CPLab
SMTP_FROM_EMAIL=noreply@yourdomain.com
```

**Important Notes:**
- `SMTP_USER` is always `resend` (not your email)
- `SMTP_PASS` is your Resend API key
- `SMTP_FROM_EMAIL` must be a verified domain in Resend
- Port `587` uses STARTTLS (recommended)

#### Step 3: Verify Domain in Resend

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `cplab.com`)
4. Add the DNS records provided by Resend:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually takes a few minutes)

#### Step 4: Test Email

Once configured, Payload will send emails for:
- Password resets
- User verification
- Admin invitations

### Switching to Other SMTP Providers

To use a different SMTP provider, just update the credentials:

**Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your-mailgun-password
```

---

## 2. Cloudflare R2 Storage Configuration

### Why Cloudflare R2?
- **S3-compatible**: Works with existing S3 tools/SDKs
- **Zero egress fees**: No charges for bandwidth
- **Cost-effective**: $0.015/GB storage (10x cheaper than S3)
- **Global CDN**: Automatic worldwide distribution

### R2 Setup

#### Step 1: Create R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in the sidebar
3. Click **Create Bucket**
4. Enter bucket name: `cplab-media` (or your preferred name)
5. Click **Create Bucket**

#### Step 2: Generate R2 API Tokens

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API Token**
3. Give it a name: `Payload CMS Access`
4. Permissions: Select **Object Read & Write**
5. Optional: Restrict to specific bucket (`cplab-media`)
6. Click **Create API Token**
7. **IMPORTANT**: Copy these values immediately (shown only once):
   - Access Key ID
   - Secret Access Key

#### Step 3: Get Your Account ID

1. In Cloudflare Dashboard, click on any R2 bucket
2. Your Account ID is in the URL: `https://dash.cloudflare.com/YOUR_ACCOUNT_ID/r2`
3. Or find it in: Account Home → Account ID (right sidebar)

#### Step 4: Configure Environment Variables

Update your `.env` file:

```env
# Cloudflare R2 Storage Configuration
R2_ACCOUNT_ID=your_32_character_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=cplab-media
R2_PUBLIC_URL=https://your-r2-bucket.domain.com
```

#### Step 5: Configure Public Access (Optional)

If you want files to be publicly accessible:

1. In R2 bucket settings, click **Settings**
2. Under **Public Access**, click **Allow Access**
3. Choose **Connect Custom Domain** or use R2.dev subdomain
4. Update `R2_PUBLIC_URL` in `.env` with your public URL

**For Custom Domain:**
1. Click **Connect Domain**
2. Enter your domain: `media.cplab.com`
3. Add CNAME record in Cloudflare DNS:
   - Type: `CNAME`
   - Name: `media`
   - Target: `cplab-media.YOUR_ACCOUNT_ID.r2.cloudflarestorage.com`

---

## 3. Production Deployment (Vercel)

### Environment Variables for Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add ALL these variables:

```
PAYLOAD_SECRET=your-super-secret-key-here
DATABASE_URI=mongodb+srv://...
NEXT_PUBLIC_SERVER_URL=https://cplab.vercel.app

# Email (SMTP)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_resend_api_key
SMTP_FROM_NAME=CPLab
SMTP_FROM_EMAIL=noreply@cplab.com

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=cplab-media
R2_PUBLIC_URL=https://media.cplab.com
```

### CORS Configuration for R2 (Required for Client Uploads)

If using client-side uploads, configure CORS in R2:

1. Go to R2 bucket → **Settings** → **CORS Policy**
2. Add this policy:

```json
[
  {
    "AllowedOrigins": [
      "https://cplab.vercel.app",
      "http://localhost:3000"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 4. Testing Your Configuration

### Test Email

1. Start dev server: `pnpm dev`
2. Go to `http://localhost:3000/admin`
3. Create first admin user
4. Try "Forgot Password" feature
5. Check terminal logs for email output (or check your email)

### Test File Upload

1. Go to `http://localhost:3000/admin/collections/media`
2. Click **Create New**
3. Upload an image
4. Check that file appears in Cloudflare R2 bucket

---

## 5. Configuration Details

### Media Collection Setup

The `media` collection in `payload.config.ts`:

```typescript
{
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, 'media'), // Fallback (not used with R2)
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

### Email Adapter

```typescript
email: nodemailerAdapter({
  defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@cplab.com',
  defaultFromName: process.env.SMTP_FROM_NAME || 'CPLab',
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: false, // TLS via STARTTLS
  },
}),
```

### R2 Storage Plugin

```typescript
s3Storage({
  collections: {
    media: true, // Enable for media collection
  },
  bucket: process.env.R2_BUCKET_NAME || '',
  config: {
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
    region: 'auto', // R2 uses 'auto'
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  },
}),
```

---

## 6. Troubleshooting

### Email Issues

**Problem**: Email not sending
- Check SMTP credentials are correct
- Verify domain is verified in Resend
- Check terminal logs for error messages
- Test SMTP with a tool like [SMTP Tester](https://www.smtper.net/)

**Problem**: "Invalid login" error
- Ensure `SMTP_USER` is exactly `resend`
- Verify API key is copied correctly (starts with `re_`)

### R2 Storage Issues

**Problem**: Upload fails with 403 error
- Verify R2 API token has read/write permissions
- Check `R2_ACCOUNT_ID` is correct
- Ensure bucket name matches exactly

**Problem**: Files upload but can't be viewed
- Configure public access or custom domain
- Update `R2_PUBLIC_URL` to match your setup
- Add CORS policy if using client uploads

**Problem**: "Bucket not found"
- Verify `R2_BUCKET_NAME` matches exact bucket name
- Check endpoint URL format
- Ensure API token has access to this bucket

---

## 7. Cost Estimates

### Resend Email
- **Free tier**: 3,000 emails/month, 100 emails/day
- **Paid**: $20/month for 50,000 emails

### Cloudflare R2
- **Storage**: $0.015 per GB/month
- **Class A Operations** (writes): $4.50 per million
- **Class B Operations** (reads): $0.36 per million
- **Egress**: FREE (no bandwidth charges)

**Example**: 100GB storage + 1M uploads + 10M downloads = ~$6/month

---

## 8. Additional Resources

- [Payload Email Docs](https://payloadcms.com/docs/email/overview)
- [Payload Storage Docs](https://payloadcms.com/docs/upload/storage-adapters)
- [Resend SMTP Guide](https://resend.com/docs/send-with-smtp)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [AWS S3 SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

---

## Quick Reference

### Environment Variables Checklist

```bash
# Required
✓ PAYLOAD_SECRET
✓ DATABASE_URI
✓ NEXT_PUBLIC_SERVER_URL

# Email (all required for SMTP)
✓ SMTP_HOST
✓ SMTP_PORT
✓ SMTP_USER
✓ SMTP_PASS
✓ SMTP_FROM_NAME
✓ SMTP_FROM_EMAIL

# R2 Storage (all required)
✓ R2_ACCOUNT_ID
✓ R2_ACCESS_KEY_ID
✓ R2_SECRET_ACCESS_KEY
✓ R2_BUCKET_NAME
✓ R2_PUBLIC_URL (if using public access)
```

### Next Steps

1. ✅ Install packages (`@payloadcms/email-nodemailer`, `@payloadcms/storage-s3`)
2. ✅ Update `payload.config.ts`
3. ⬜ Get Resend API key
4. ⬜ Create Cloudflare R2 bucket
5. ⬜ Generate R2 API tokens
6. ⬜ Update `.env` file with real credentials
7. ⬜ Test locally
8. ⬜ Deploy to Vercel with environment variables
9. ⬜ Test in production
