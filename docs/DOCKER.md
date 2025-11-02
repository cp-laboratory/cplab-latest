# Docker Deployment Guide

## Security Notice

**This Docker image is safe to share publicly!** 

The build process uses placeholder values to satisfy Payload CMS during compilation. All actual secrets are provided at **runtime only** via environment variables, so they are never baked into the image layers.

## Quick Start

### 1. Build the image (no secrets needed!)

```bash
# Build with Docker Compose
docker-compose build

# Or build with Docker directly
docker build -t cplab .
```

**No environment variables are needed during build!** The image uses placeholder values internally.

### 2. Set up runtime environment variables

Create a `.env` file with your actual credentials:

```bash
cp .env.docker.example .env
```

Then edit `.env` with your actual values:

```bash
# REQUIRED: Generate a secure secret key (minimum 32 characters)
PAYLOAD_SECRET=$(openssl rand -base64 32)

# REQUIRED: Your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# REQUIRED: Your server URL
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# REQUIRED: Cloudflare R2 / S3 credentials
S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=auto

# REQUIRED: SMTP configuration
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Run the container with your secrets

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`.

### 3. Run the container with your secrets

```bash
# Start with Docker Compose (reads from .env automatically)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`.

### 4. Alternative: Run with Docker directly

```bash
# Run the container with environment variables from .env file
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name cplab \
  cplab

# Or specify environment variables manually
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e PAYLOAD_SECRET="your_secret_key_32_chars_minimum" \
  -e NEXT_PUBLIC_SERVER_URL="http://localhost:3000" \
  -e S3_ENDPOINT="your_s3_endpoint" \
  -e S3_BUCKET="your_bucket" \
  -e S3_ACCESS_KEY_ID="your_access_key" \
  -e S3_SECRET_ACCESS_KEY="your_secret_key" \
  -e S3_REGION="auto" \
  -e EMAIL_FROM="noreply@example.com" \
  -e SMTP_HOST="smtp.gmail.com" \
  -e SMTP_PORT="587" \
  -e SMTP_USER="your@email.com" \
  -e SMTP_PASS="your_password" \
  --name cplab \
  cplab
```

## Sharing the Image Publicly

Since the Docker image contains **no secrets** (only placeholder values used during build), you can safely:

1. **Push to Docker Hub:**
   ```bash
   docker tag cplab your-username/cplab:latest
   docker push your-username/cplab:latest
   ```

2. **Push to GitHub Container Registry:**
   ```bash
   docker tag cplab ghcr.io/your-username/cplab:latest
   docker push ghcr.io/your-username/cplab:latest
   ```

3. **Share on any public registry** - The image is secure!

Anyone who pulls your image will need to provide their own environment variables at runtime.

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PAYLOAD_SECRET` | Yes | Secret key for Payload CMS (min 32 chars) | Generated with `openssl rand -base64 32` |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public URL of your application | `https://yourdomain.com` |
| `S3_ENDPOINT` | Yes | S3-compatible storage endpoint | `https://account.r2.cloudflarestorage.com` |
| `S3_BUCKET` | Yes | S3 bucket name | `my-bucket` |
| `S3_ACCESS_KEY_ID` | Yes | S3 access key | Your access key |
| `S3_SECRET_ACCESS_KEY` | Yes | S3 secret key | Your secret key |
| `S3_REGION` | Yes | S3 region (use `auto` for R2) | `auto` or `us-east-1` |
| `EMAIL_FROM` | Yes | Email sender address | `noreply@yourdomain.com` |
| `SMTP_HOST` | Yes | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | SMTP server port | `587` |
| `SMTP_USER` | Yes | SMTP username | `your@email.com` |
| `SMTP_PASS` | Yes | SMTP password | Your password/app password |

## Production Deployment

On your production server:

```bash
# Pull the image from your registry
docker pull your-username/cplab:latest

# Create .env file with production secrets
nano .env

# Run the container
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  --name cplab \
  your-username/cplab:latest
```

## Troubleshooting

### Build fails with "missing secret key"

**Problem**: This error should no longer occur with the new Dockerfile.

**Solution**: The Dockerfile now uses placeholder values during build. If you still see this error, ensure you're using the latest Dockerfile that has placeholder ENV values (not ARG values).

### SMTP connection errors during build

**Problem**: You see `Error: connect ECONNREFUSED` during build.

**Solution**: These are warnings from placeholder SMTP values and can be safely ignored. The build will complete successfully.

### Image size is too large

**Problem**: Docker image is several GB.

**Solution**: The Dockerfile uses multi-stage builds and Next.js standalone mode to minimize size. Make sure you're using the production image, not the builder stage.

### Container exits immediately

**Problem**: Container starts but exits right away.

**Solution**: Check logs to see the error:

```bash
docker-compose logs cplab

# Or for docker run
docker logs cplab
```

Common causes:

- Missing required environment variables
- Invalid MongoDB connection string
- Port 3000 already in use

### Cannot connect to MongoDB

**Problem**: Application can't connect to MongoDB.

**Solution**:

- Ensure MongoDB URI is correct and accessible from the container
- For MongoDB Atlas, whitelist the Docker host IP
- For local MongoDB, use `host.docker.internal` instead of `localhost`

## Notes

- **Security**: Secrets are ONLY provided at runtime, never baked into the image. This makes the image safe to share publicly.

- **SMTP Warnings**: During build, you may see SMTP connection errors with placeholder values. These are harmless warnings and won't affect the build.
