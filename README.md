# Time Travel Parameter Calculator

A full-stack web application that calculates 10 fictional "time travel parameters" based on a target date. Built with Node.js (Express + TypeScript) for the backend, React (Vite) + Tailwind CSS for the frontend, and containerized in a single Docker image.

## Overview

This application takes a date as input and computes various time travel-related metrics using mathematical functions. The calculations are deterministic (same date = same results) using a seeded PRNG.

### Calculated Parameters

1. **Temporal Displacement Energy (TDE)** - Energy required to shift temporal frame
2. **Chroniton Density (CD)** - Chroniton particle density in spacetime
3. **Flux Instability Index (FII)** - Spacetime flux volatility measure
4. **Spacetime Curvature Delta (SCD)** - Gravitational distortion coefficient
5. **Quantum Drift Factor (QDF)** - Quantum chaos drift measurement
6. **Dimensional Overlap Ratio (DOR)** - Adjacent dimension overlap percentage
7. **Entropy Deviation Coefficient (EDC)** - Temporal entropy deviation measure
8. **Chronometric Stability Index (CSI)** - Time measurement stability (0-100)
9. **Relativity Compression Factor (RCF)** - Lorentz-style temporal distortion
10. **Time Loop Probability (TLP)** - Probability of temporal loop formation

## Tech Stack

- **Backend**: Node.js 20, Express, TypeScript
- **Frontend**: React 18, Vite, Tailwind CSS
- **Package Manager**: pnpm
- **Container**: Docker (single container)

## Project Structure

```
time-travel-parameter-calculator/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── routes/
│   │   │   │   └── calculate.ts
│   │   │   └── lib/
│   │   │       ├── metrics.ts
│   │   │       ├── prng.ts
│   │   │       ├── time.ts
│   │   │       └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── DateInput.tsx
│       │   │   ├── MetricCard.tsx
│       │   │   └── ResultsTable.tsx
│       │   ├── lib/
│       │   │   ├── api.ts
│       │   │   ├── format.ts
│       │   │   └── types.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── postcss.config.js
├── Dockerfile
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## API Endpoints

### POST /api/calculate

Calculate time travel parameters for a given date.

**Request:**
```json
{
  "date": "2025-12-25"
}
```

**Response:**
```json
{
  "summary": {
    "inputDate": "2025-12-25",
    "deltaDays": 365,
    "deltaYears": 1.0,
    "seed": 20251225
  },
  "metrics": [
    {
      "name": "Temporal Displacement Energy",
      "value": 31.416,
      "unit": "TDE",
      "description": "Energy required to shift temporal frame"
    },
    ...
  ]
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Local Development

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run development servers:
```bash
pnpm dev
```

This will start:
- Backend API at `http://localhost:8080`
- Frontend dev server at `http://localhost:5173`

3. Build for production:
```bash
pnpm build
```

4. Start production server:
```bash
pnpm start
```

## Docker

### Build Docker Image

```bash
pnpm docker:build
```

Or directly:
```bash
docker build -t time-travel-calculator .
```

### Run Container

```bash
pnpm docker:run
```

Or directly:
```bash
docker run -p 8080:8080 time-travel-calculator
```

Visit `http://localhost:8080` in your browser.

**Note:** If you get an error like "port is already allocated", another container or process is using port 8080. You can either:
- Stop the existing container: `docker ps` to find it, then `docker stop <container-name>`
- Use a different port: `docker run -p 8081:8080 time-travel-calculator` (then access at `http://localhost:8081`)

## AWS Deployment

This application can be deployed to AWS using several methods. Below are the most common deployment options:

### Prerequisites

- AWS account with appropriate permissions
- Docker installed locally (for building and pushing images)
- AWS CLI installed (optional, for command-line operations)

### Option 1: AWS App Runner (Recommended - Easiest)

AWS App Runner is the simplest way to deploy containerized applications to AWS.

#### Step 1: Create ECR Repository (AWS Console)

1. Log in to the [AWS Console](https://console.aws.amazon.com)
2. Navigate to **ECR** (Elastic Container Registry) service
3. Select your region (e.g., `us-west-2`) from the top-right dropdown
4. Click **"Create repository"**
5. Configure the repository:
   - **Repository name**: `time-travel-calculator`
6. Click **"Create repository"**
7. Note the **Repository URI** (e.g., `123456789012.dkr.ecr.us-west-2.amazonaws.com/time-travel-calculator`)

#### Step 2: Push Docker Image to ECR

You'll need to use the command line for this step (or AWS CloudShell):

1. **Get your AWS account ID:**
   - In the AWS Console, click on your username (top-right)
   - Your 12-digit account ID is displayed

2. **Configure AWS credentials** (if not already configured):
   ```bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Enter default region (e.g., us-west-2)
   # Enter default output format (json)
   ```
   Or if using AWS CloudShell, credentials are automatically configured.

3. **Authenticate Docker to ECR using AWS credentials:**
```bash
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com
```
   Replace `<AWS_ACCOUNT_ID>` with your 12-digit account ID and `us-west-2` with your selected region.

4. **Build and tag the image:**
```bash
docker build -t time-travel-calculator .
docker tag time-travel-calculator:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/time-travel-calculator:latest
```
   Replace `<AWS_ACCOUNT_ID>` with your account ID and `us-west-2` with your selected region.

5. **Push to ECR:**
```bash
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/time-travel-calculator:latest
```
   Replace `<AWS_ACCOUNT_ID>` with your account ID and `us-west-2` with your selected region.

#### Step 3: Create App Runner Service (AWS Console)

1. Navigate to **App Runner** service in AWS Console
2. Click **"Create service"**
3. **Source and deployment:**
   - Select **"Container registry"**
   - Choose **"Amazon ECR"**
   - **Provider**: Amazon ECR
   - **Container image URI**: Click "Browse" and select your repository, then choose the `latest` tag
   - **Deployment trigger**: Choose "Automatic" (deploys on new image push) or "Manual"
4. **Configure service:**
   - **Service name**: `time-travel-calculator`
   - **Virtual CPU**: 0.25 vCPU (minimum)
   - **Memory**: 0.5 GB (minimum)
5. **Configure service - Networking:**
   - **VPC connector**: None (unless you need VPC access)
   - **Security**: Use default settings or configure as needed
6. **Configure service - Health check:**
   - **Health check path**: `/api/health`
   - **Health check interval**: 10 seconds (default)
   - **Health check timeout**: 5 seconds (default)
   - **Healthy threshold**: 1 (default)
   - **Unhealthy threshold**: 5 (default)
7. **Configure service - Port:**
   - **Port**: `8080`
8. **Configure service - Environment variables:**
   - Click **"Add environment variable"**
   - **Key**: `NODE_ENV`
   - **Value**: `production`
9. **Review and create:**
   - Review all settings
   - Click **"Create & deploy"**

#### Step 4: Access Your Application

1. Wait for the service to deploy (usually 2-5 minutes)
2. Once the status shows "Running", click on your service
3. Find the **Default domain** in the service details
4. Your application is available at: `https://<service-id>.<region>.awsapprunner.com`

### Troubleshooting: App Runner Deployment Failures

If you see logs like:
```
[AppRunner] Successfully pulled your application image from ECR.
[AppRunner] Failed to deploy your application image.
```

This means the container image was pulled successfully but failed to start or pass health checks. Here are common causes and solutions:

#### 1. **Check CloudWatch Logs for Detailed Errors**

1. Go to **CloudWatch** → **Log groups** in AWS Console
2. Look for log group: `/aws/apprunner/<service-name>/<service-id>/application`
3. Check the logs for specific error messages

#### 2. **Container Not Starting Properly**

**Common issues:**
- Application crashes on startup
- Missing dependencies
- Incorrect CMD/ENTRYPOINT in Dockerfile
- Module resolution errors (ES modules vs CommonJS)

**Solution:**
- Test the container locally first:
```bash
  docker run -p 8080:8080 -e NODE_ENV=production <your-ecr-image-uri>
  ```
- Check that the server starts and responds to requests
- Verify the Dockerfile CMD is correct: `CMD ["node", "backend/server.js"]`

#### 3. **Health Check Failing**

App Runner checks `/api/health` by default. If this endpoint fails, deployment will fail.

**Verify:**
- The health check path is set to `/api/health` in App Runner configuration
- The server responds with `200 OK` and `{"status": "ok"}`
- The server starts within the health check timeout (default 5 seconds)

**Test locally:**
```bash
docker run -p 8080:8080 -e NODE_ENV=production <your-ecr-image-uri>
curl http://localhost:8080/api/health
# Should return: {"status":"ok"}
```

#### 4. **Port Configuration Mismatch**

**Verify:**
- Container exposes port `8080` (Dockerfile: `EXPOSE 8080`)
- App Runner is configured to use port `8080`
- Server listens on `0.0.0.0:8080` (not `localhost:8080`)

**Check server.ts:**
```typescript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 5. **Missing Environment Variables**

**Verify:**
- `NODE_ENV=production` is set in App Runner configuration
- Any other required environment variables are set

#### 6. **Resource Constraints**

If CPU/memory is too low, the container may fail to start.

**Solution:**
- Increase CPU to at least 0.5 vCPU
- Increase memory to at least 1 GB
- Check CloudWatch metrics for resource utilization

#### 7. **Module Resolution Issues (ES Modules)**

If using ES modules, ensure:
- `package.json` has `"type": "module"` in the backend directory
- The working directory is correct when running the server
- All imports use `.js` extensions (even for TypeScript-compiled files)

**Quick Fix:**
Update the Dockerfile CMD to ensure proper module resolution:
```dockerfile
WORKDIR /app/backend
CMD ["node", "server.js"]
```

#### 8. **Check Build Output**

Verify the build process creates the correct files:
- `apps/backend/dist/server.js` exists
- `apps/frontend/dist/` contains the built frontend files
- All dependencies are installed in the production image

**Debug Steps:**
1. **Check App Runner logs** in CloudWatch for specific error messages
2. **Test container locally** before pushing to ECR
3. **Verify health endpoint** responds correctly
4. **Check resource usage** - increase CPU/memory if needed
5. **Review Dockerfile** - ensure all paths and commands are correct

### Troubleshooting: Docker Build Failures

If you encounter errors like:
```
ERROR: failed to build: failed to solve: process "/bin/sh -c pnpm build" did not complete successfully: exit code: 2
```

This means the build process is failing. Here's how to debug and fix it:

#### 1. **Test Build Locally First**

Before building the Docker image, test the build locally:
```bash
pnpm install
pnpm build
```

This will show you the exact error message. Common issues:
- TypeScript compilation errors
- Missing dependencies
- Frontend build errors (Vite)

#### 2. **Check TypeScript Errors**

If TypeScript compilation fails:
```bash
# Check backend TypeScript errors
cd apps/backend
pnpm build

# Check frontend TypeScript errors  
cd apps/frontend
pnpm build
```

#### 3. **Verify All Files Are Present**

Ensure all source files are present and not excluded by `.dockerignore`:
- `apps/backend/src/**/*.ts`
- `apps/frontend/src/**/*.tsx`
- `package.json` files
- `tsconfig.json` files

#### 4. **Check for Missing Dependencies**

Ensure `pnpm-lock.yaml` is up to date:
```bash
pnpm install
```

#### 5. **Build Docker Image with Verbose Output**

The updated Dockerfile now builds backend and frontend separately, which will help identify which part fails:
```bash
docker build -t time-travel-calculator . --progress=plain --no-cache
```

The `--progress=plain` flag shows all build output, and `--no-cache` ensures a fresh build.

#### 6. **Common Build Issues**

**TypeScript strict mode errors:**
- Check `tsconfig.json` for strict settings
- Fix any TypeScript errors shown in the build output

**Missing dependencies:**
- Run `pnpm install` locally to update `pnpm-lock.yaml`
- Ensure all dependencies are listed in `package.json`

**Frontend build errors:**
- Check Vite configuration in `vite.config.ts`
- Verify all React components compile correctly

**Memory issues:**
- Docker build may need more memory
- Try building on a machine with more RAM
- Or increase Docker's memory limit in settings

#### 7. **Quick Fix: Rebuild from Scratch**

If all else fails, try a clean rebuild:
```bash
# Clean local build artifacts
rm -rf node_modules apps/*/node_modules apps/*/dist

# Reinstall dependencies
pnpm install

# Test build locally
pnpm build

# If local build works, rebuild Docker image
docker build -t time-travel-calculator . --no-cache
```

## AWS Deployment
Domain (time-travel-calculator.com) managed in Route53 and manually configured manually through App Runner (using an alias)