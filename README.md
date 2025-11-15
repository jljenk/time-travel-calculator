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
3. Select your region (e.g., `us-east-1`) from the top-right dropdown
4. Click **"Create repository"**
5. Configure the repository:
   - **Visibility settings**: Private
   - **Repository name**: `time-travel-calculator`
   - **Tag immutability**: Optional (recommended: Enabled)
   - **Scan on push**: Optional (recommended: Enabled)
6. Click **"Create repository"**
7. Note the **Repository URI** (e.g., `123456789012.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator`)

#### Step 2: Push Docker Image to ECR

You'll need to use the command line for this step (or AWS CloudShell):

1. **Get your AWS account ID:**
   - In the AWS Console, click on your username (top-right)
   - Your 12-digit account ID is displayed

2. **Authenticate Docker to ECR:**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
```

3. **Build and tag the image:**
```bash
docker build -t time-travel-calculator .
docker tag time-travel-calculator:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
```

4. **Push to ECR:**
```bash
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
```

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

### Option 2: AWS ECS with Fargate (Scalable)

For more control and scalability, use ECS with Fargate.

#### Step 1: Push Image to ECR

Follow **Step 1 and Step 2** from Option 1 to create the ECR repository and push your Docker image.

#### Step 2: Create CloudWatch Log Group (AWS Console)

1. Navigate to **CloudWatch** service
2. Click **"Log groups"** in the left sidebar
3. Click **"Create log group"**
4. **Log group name**: `/ecs/time-travel-calculator`
5. Click **"Create"**

#### Step 3: Create ECS Cluster (AWS Console)

1. Navigate to **ECS** (Elastic Container Service)
2. Click **"Clusters"** in the left sidebar
3. Click **"Create cluster"**
4. **Cluster configuration:**
   - **Cluster name**: `time-travel-calculator-cluster`
   - **Infrastructure**: Select **"AWS Fargate (serverless)"**
5. Click **"Create"**

#### Step 4: Create Task Definition (AWS Console)

1. In ECS, click **"Task definitions"** in the left sidebar
2. Click **"Create new task definition"**
3. **Select launch type**: **Fargate**
4. **Task definition configuration:**
   - **Task definition family**: `time-travel-calculator`
   - **Task size:**
     - **CPU**: 0.25 vCPU
     - **Memory**: 0.5 GB
5. **Container details:**
   - Click **"Add container"**
   - **Container name**: `time-travel-calculator`
   - **Image URI**: Enter your ECR image URI (e.g., `<AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest`)
   - **Port mappings**: 
     - **Container port**: `8080`
     - **Protocol**: `tcp`
   - **Environment variables**:
     - Click **"Add environment variable"**
     - **Key**: `NODE_ENV`
     - **Value**: `production`
   - **Logging**:
     - **Log driver**: `awslogs`
     - **Log group**: `/ecs/time-travel-calculator`
     - **Log stream prefix**: `ecs`
     - **Region**: Select your region (e.g., `us-east-1`)
6. Click **"Add"** to add the container
7. Click **"Create"** to create the task definition

#### Step 5: Create ECS Service (AWS Console)

1. Go back to your cluster (`time-travel-calculator-cluster`)
2. Click on the **"Services"** tab
3. Click **"Create"**
4. **Configure service:**
   - **Launch type**: **Fargate**
   - **Task definition**:
     - **Family**: `time-travel-calculator`
     - **Revision**: `1` (latest)
   - **Service name**: `time-travel-calculator-service`
   - **Desired tasks**: `1`
5. **Networking:**
   - **VPC**: Select your VPC (or use default)
   - **Subnets**: Select at least 2 subnets (preferably in different availability zones)
   - **Security groups**: 
     - Click **"Create new security group"** or select existing
     - **Inbound rules**: Add rule for port `8080` from `0.0.0.0/0` (or restrict to your IP)
   - **Auto-assign public IP**: **Enabled** (required for Fargate tasks in public subnets)
6. **Load balancing** (optional):
   - You can skip this for now, or configure an Application Load Balancer for HTTPS
7. Click **"Create"**

#### Step 6: Access Your Application

1. Wait for the service to start (check the **"Tasks"** tab)
2. Once a task is running, click on it
3. Find the **Public IP** address
4. Access your application at: `http://<public-ip>:8080`

**Note:** For production, consider setting up an Application Load Balancer with HTTPS for better security and a custom domain.

### Option 3: AWS EC2 (Traditional)

Deploy directly to an EC2 instance.

#### Step 1: Launch EC2 Instance (AWS Console)

1. Navigate to **EC2** service
2. Click **"Launch instance"**
3. **Name and tags:**
   - **Name**: `time-travel-calculator`
4. **Application and OS Images:**
   - Choose **Amazon Linux 2023** or **Ubuntu** (recommended: Amazon Linux 2023)
5. **Instance type:**
   - Select **t3.micro** or **t3.small** (eligible for free tier)
6. **Key pair:**
   - Create a new key pair or select existing
   - **Key pair name**: `time-travel-calculator-key`
   - **Key pair type**: RSA
   - **Private key file format**: `.pem` (for Linux/Mac) or `.ppk` (for Windows)
   - Click **"Create key pair"** and download the file
7. **Network settings:**
   - **VPC**: Use default or select your VPC
   - **Subnet**: Use default or select a public subnet
   - **Auto-assign public IP**: **Enable**
   - **Firewall (security group)**: 
     - Click **"Create security group"**
     - **Security group name**: `time-travel-calculator-sg`
     - **Description**: `Security group for Time Travel Calculator`
     - **Inbound rules**: 
       - **SSH (22)**: My IP
       - **Custom TCP (8080)**: Anywhere-IPv4 (or restrict to your IP)
8. **Configure storage:**
   - **Volume size**: 8 GB (default, free tier eligible)
9. Click **"Launch instance"**
10. Click **"View all instances"** and wait for instance to be running

#### Step 2: Connect to EC2 Instance

1. Select your instance and click **"Connect"**
2. **SSH Client** tab:
   - Follow the instructions to connect via SSH
   - Example command (replace with your key and instance details):
   ```bash
   ssh -i "time-travel-calculator-key.pem" ec2-user@<PUBLIC_IP>
   ```

#### Step 3: Install Docker on EC2 (Command Line)

Once connected via SSH, run:

**For Amazon Linux 2023:**
```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
# Log out and back in for group changes to take effect
exit
```

**For Ubuntu:**
```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
# Log out and back in for group changes to take effect
exit
```

Reconnect via SSH after logging out.

#### Step 4: Install AWS CLI (if not already installed)

```bash
# For Amazon Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# For Ubuntu
sudo apt-get install awscli -y
```

#### Step 5: Configure AWS CLI and Pull Image

1. **Configure AWS CLI:**
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter default region (e.g., us-east-1)
# Enter default output format (json)
```

2. **Authenticate Docker to ECR:**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
```

3. **Pull and run the container:**
```bash
docker pull <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
docker run -d -p 8080:8080 --name time-travel-calculator \
  -e NODE_ENV=production \
  <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
```

#### Step 6: Set Up Auto-Restart (Optional)

Create a systemd service to automatically restart the container:

```bash
sudo nano /etc/systemd/system/time-travel-calculator.service
```

Add the following content (replace `<AWS_ACCOUNT_ID>` with your account ID):
```ini
[Unit]
Description=Time Travel Calculator
After=docker.service
Requires=docker.service

[Service]
Type=simple
ExecStart=/usr/bin/docker run --rm -p 8080:8080 -e NODE_ENV=production <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
ExecStop=/usr/bin/docker stop time-travel-calculator
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable time-travel-calculator
sudo systemctl start time-travel-calculator
sudo systemctl status time-travel-calculator
```

#### Step 7: Access Your Application

1. In EC2 Console, select your instance
2. Copy the **Public IPv4 address**
3. Access your application at: `http://<PUBLIC_IP>:8080`

### Environment Variables

You can configure the application using environment variables:

- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment mode (default: development, set to `production` for production)

### Security Considerations

- Use HTTPS in production (configure Application Load Balancer with SSL certificate)
- Restrict security group rules to only necessary ports
- Use IAM roles for ECS tasks instead of hardcoding credentials
- Enable CloudWatch logging for monitoring
- Consider using AWS Secrets Manager for sensitive configuration

### Updating the Deployment

To update your deployment with a new version:

#### Step 1: Build and Push New Image

```bash
docker build -t time-travel-calculator .
docker tag time-travel-calculator:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
```

#### Step 2: Update Deployment

**For App Runner (AWS Console):**
1. Navigate to **App Runner** → Your service
2. Click **"Deploy"** or **"Deploy new revision"**
3. If auto-deployment is enabled, it will automatically deploy the new image
4. Wait for deployment to complete

**For ECS (AWS Console):**
1. Navigate to **ECS** → Your cluster → **Services** tab
2. Select your service (`time-travel-calculator-service`)
3. Click **"Update"**
4. **Task definition**: Select the latest revision (or create new revision with updated image)
5. Check **"Force new deployment"**
6. Click **"Update"**
7. Monitor the deployment in the **"Deployments"** tab

**For EC2 (Command Line):**
SSH into your EC2 instance and run:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
docker pull <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
docker stop time-travel-calculator
docker rm time-travel-calculator
docker run -d -p 8080:8080 --name time-travel-calculator \
  -e NODE_ENV=production \
  <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/time-travel-calculator:latest
```

If using systemd service, restart it:
```bash
sudo systemctl restart time-travel-calculator
```

## Usage

1. Enter a target date in the date input field (format: YYYY-MM-DD)
2. Click "Calculate" to compute the time travel parameters
3. View the results in:
   - Summary section (delta days, years, seed)
   - Metric cards (visual display)
   - Results table (detailed view)
4. Export results:
   - Click "Copy JSON" to copy results to clipboard
   - Click "Download CSV" to download results as CSV file

## License

MIT

