# 🍹 blendRUSH Backend

This is the backend of the **Juice Bar Ordering System**, implemented using a **Node.js microservices architecture** with an **API Gateway**.  
It provides secure and modular APIs for menu, user, order, and cart management.

The backend is containerized with **Docker** and deployed on **AWS EC2** using **Terraform** and **GitHub Actions** for CI/CD.

---

## 🚀 Tech Stack
- **Node.js + Express** – Backend framework for services  
- **Microservices Architecture** – Independent services for modularity  
- **MongoDB** – Database for storing menu, users, orders, and carts  
- **API Gateway** – Single entry point using `http-proxy-middleware`  
- **Docker & Docker Compose** – Containerization and orchestration  
- **Terraform** – Infrastructure provisioning on AWS EC2  
- **GitHub Actions** – CI/CD automation for backend deployments  
- **Nginx + SSL** – Reverse proxy and HTTPS support  

---

## 📂 Project Structure

```
backend/
│── .github/           # GitHub Actions workflows (CI/CD)
│── api-gateway/       # API Gateway service
│── cart-service/      # Cart microservice
│── menu-service/      # Menu microservice
│── order-service/     # Order microservice
│── terraform/         # Terraform IaC for AWS EC2 provisioning
│── user-service/      # User microservice
│── .env               # Environment variables
│── .gitignore
│── docker-compose.yml # Docker Compose file
```

---

## ⚙️ Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/BlendRush/backend.git
cd backend
```

### 2. Configure environment variables
Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection
MONGODB_URI_USER_SERVICE=your_mongodb_connection
MONGODB_URI_ORDER_SERVICE=your_mongodb_connection
MONGODB_URI_CART_SERVICE=your_mongodb_connection

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

ENCRYPTION_KEY=your_encryption_key
ACCESS_TOKEN=your_access_token
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
CLIENT_URL=your_oauth_redirect_url
```

### 3. Run with Docker Compose
```bash
docker-compose up --build
```

Services will run on:
- API Gateway → `http://localhost:3000`  
- Menu Service → `http://localhost:3001`  
- Order Service → `http://localhost:3002`  
- User Service → `http://localhost:3003`  
- Cart Service → `http://localhost:3005`  

---

## ☁️ Deployment to AWS

### 1. Provision Infrastructure with Terraform
Terraform is used to create:
- EC2 instance with **t2.micro** (Free Tier)  
- Security group with ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3000–3005  

```bash
cd terraform
terraform init
terraform apply
```

### 2. Deploy via GitHub Actions
When code is merged into `main`, GitHub Actions automatically:
1. Builds Docker images  
2. Connects to EC2 via SSH  
3. Runs `docker-compose down`  
4. Runs `docker-compose up --build -d`  
5. Deploys the latest version of all backend services  

### 3. Nginx + SSL
- Nginx is configured as a reverse proxy  
- Routes HTTPS (port 443) → API Gateway (port 3000)  
- A **self-signed SSL certificate** is used for testing  
- In production, a **Let’s Encrypt certificate** should be used  

