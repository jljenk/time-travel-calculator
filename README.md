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
# The Dockerfile already includes --platform=linux/amd64 for AWS compatibility
docker build --platform=linux/amd64 -t time-travel-calculator .
docker tag time-travel-calculator:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-west-2.amazonaws.com/time-travel-calculator:latest
```
   Replace `<AWS_ACCOUNT_ID>` with your account ID and `us-west-2` with your selected region.
   
   **Note:** If you're on an M1/M2 Mac (ARM), the Dockerfile automatically builds for `linux/amd64` to ensure compatibility with AWS App Runner. If you need to override this, use: `docker build --platform=linux/amd64 -t time-travel-calculator .`

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
   - **Virtual CPU**: **0.5 vCPU** (recommended: 1 vCPU for better reliability)
   - **Memory**: **1 GB** (recommended: 2 GB for better reliability)
5. **Configure service - Networking:**
   - **VPC connector**: None (unless you need VPC access)
   - **Security**: Use default settings or configure as needed
6. **Configure service - Health check:**
   - **Select http**
   - **Health check path**: `/api/health`
   - **Health check interval**: 10 seconds (default)
   - **Health check timeout**: **10 seconds** (increase from default 5 seconds for slower startups)
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

## AWS Deployment
Domain (time-travel-calculator.com) managed in Route53 and manually configured manually through App Runner (using an alias)