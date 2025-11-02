# Docker Deployment Guide for CPLAB

This guide explains how to deploy the CPLAB Next.js + Payload CMS application using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+ (optional, for docker-compose.yml)
- Environment variables configured

## Quick Start

### 1. Configure Environment Variables

Create a `.env` file in the project root with all required variables:

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 2. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### 3. Build and Run with Docker CLI

```bash
# Build the image
docker build -t cplab:latest \
  --build-arg MONGODB_URI="${MONGODB_URI}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg S3_ENDPOINT="${S3_ENDPOINT}" \
  --build-arg S3_BUCKET="${S3_BUCKET}" \
  --build-arg S3_ACCESS_KEY_ID="${S3_ACCESS_KEY_ID}" \
  --build-arg S3_SECRET_ACCESS_KEY="${S3_SECRET_ACCESS_KEY}" \
  --build-arg S3_REGION="${S3_REGION}" \
  --build-arg EMAIL_FROM="${EMAIL_FROM}" \
  --build-arg SMTP_HOST="${SMTP_HOST}" \
  --build-arg SMTP_PORT="${SMTP_PORT}" \
  --build-arg SMTP_USER="${SMTP_USER}" \
  --build-arg SMTP_PASS="${SMTP_PASS}" \
  .

# Run the container
docker run -d \
  -p 3000:3000 \
  --name cplab \
  --env-file .env \
  cplab:latest

# View logs
docker logs -f cplab

# Stop the container
docker stop cplab
docker rm cplab
```

## Environment Variables

Required environment variables for the application:

### Database
- `MONGODB_URI` - MongoDB connection string

### Payload CMS
- `PAYLOAD_SECRET` - Secret key for Payload (min 32 characters)
- `NEXT_PUBLIC_SERVER_URL` - Public URL of the application

### Storage (Cloudflare R2 / S3)
- `S3_ENDPOINT` - S3-compatible endpoint
- `S3_BUCKET` - Bucket name
- `S3_ACCESS_KEY_ID` - Access key ID
- `S3_SECRET_ACCESS_KEY` - Secret access key
- `S3_REGION` - Region (use 'auto' for Cloudflare R2)

### Email (SMTP)
- `EMAIL_FROM` - Sender email address
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

## Docker Image Details

### Multi-Stage Build

The Dockerfile uses a multi-stage build process:

1. **deps** - Installs dependencies
2. **builder** - Builds the Next.js application
3. **runner** - Production runtime image

### Image Optimization

- Uses `node:20-alpine` for minimal image size
- Leverages Next.js standalone output for optimal bundle
- Includes only production dependencies
- Runs as non-root user (`nextjs:1001`)

### Exposed Ports

- Port `3000` - HTTP server

## Production Deployment

### Docker Hub / Container Registry

```bash
# Tag the image
docker tag cplab:latest your-registry.com/cplab:latest

# Push to registry
docker push your-registry.com/cplab:latest

# Pull and run on production server
docker pull your-registry.com/cplab:latest
docker run -d -p 3000:3000 --env-file .env your-registry.com/cplab:latest
```

### Health Check

Add a health check to your deployment:

```bash
docker run -d \
  -p 3000:3000 \
  --name cplab \
  --env-file .env \
  --health-cmd="wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  cplab:latest
```

## Troubleshooting

### View Container Logs

```bash
docker logs cplab
docker logs -f cplab  # Follow logs
```

### Execute Commands in Container

```bash
docker exec -it cplab sh
```

### Rebuild Without Cache

```bash
docker build --no-cache -t cplab:latest .
```

### Check Container Status

```bash
docker ps -a
docker inspect cplab
```

## Notes

- The application runs on port 3000 by default
- Change the port mapping if needed: `-p 8080:3000`
- Ensure MongoDB is accessible from the Docker container
- For production, use a reverse proxy (Nginx, Traefik) with SSL
- Consider using Docker secrets for sensitive environment variables
- The `media` directory is copied but consider using cloud storage (R2/S3) for production
