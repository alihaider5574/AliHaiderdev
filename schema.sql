-- ============================================================
-- PORTFOLIO DATABASE SCHEMA & SEED DATA (PostgreSQL)
-- Compatible with Neon.tech, Supabase, Render, local PostgreSQL
-- ============================================================

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS "AdminUser" CASCADE;
DROP TABLE IF EXISTS "ContactMessage" CASCADE;
DROP TABLE IF EXISTS "Stat" CASCADE;
DROP TABLE IF EXISTS "Experience" CASCADE;
DROP TABLE IF EXISTS "Project" CASCADE;
DROP TABLE IF EXISTS "SiteSettings" CASCADE;

-- 1. SiteSettings Table
CREATE TABLE "SiteSettings" (
    "id" VARCHAR(255) PRIMARY KEY DEFAULT 'main',
    "heroHeadline" TEXT NOT NULL DEFAULT '[{"text":"I","gradient":false},{"text":"Build","gradient":false},{"text":"Machine","gradient":false},{"text":"Learning","gradient":false},{"text":"Systems","gradient":false},{"text":"That","gradient":false},{"text":"See,","gradient":true},{"text":"Predict","gradient":true},{"text":"&","gradient":true},{"text":"Ship.","gradient":true}]',
    "heroSubtext" TEXT NOT NULL DEFAULT 'AI/ML Engineer specializing in computer vision, predictive modeling, and deploying ML solutions from research to production.',
    "availabilityText" TEXT NOT NULL DEFAULT 'Available for new opportunities',
    "availabilityActive" BOOLEAN NOT NULL DEFAULT true,
    "aboutBio" TEXT NOT NULL DEFAULT '',
    "aboutSkills" TEXT NOT NULL DEFAULT '[]',
    "cvUrl" TEXT,
    "profileImageUrl" TEXT,
    "contactEmail" TEXT NOT NULL DEFAULT 'awais@example.com',
    "contactLocation" TEXT NOT NULL DEFAULT 'Shahkot, Punjab, Pakistan',
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Project Table
CREATE TABLE "Project" (
    "id" VARCHAR(255) PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "imageUrl" TEXT,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "gradient" TEXT NOT NULL DEFAULT 'from-coral/20 via-purple/10 to-violet/20',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Experience Table
CREATE TABLE "Experience" (
    "id" VARCHAR(255) PRIMARY KEY,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bullets" TEXT NOT NULL DEFAULT '[]',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Stat Table
CREATE TABLE "Stat" (
    "id" VARCHAR(255) PRIMARY KEY,
    "value" DOUBLE PRECISION NOT NULL,
    "label" TEXT NOT NULL,
    "suffix" TEXT NOT NULL DEFAULT '',
    "decimals" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- 5. ContactMessage Table
CREATE TABLE "ContactMessage" (
    "id" VARCHAR(255) PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. AdminUser Table
CREATE TABLE "AdminUser" (
    "id" VARCHAR(255) PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- ============================================================
-- SEED INITIAL DATA
-- ============================================================

-- Seed Default Site Settings
INSERT INTO "SiteSettings" (
    "id", 
    "heroHeadline", 
    "heroSubtext", 
    "availabilityText", 
    "availabilityActive", 
    "aboutBio", 
    "aboutSkills", 
    "contactEmail", 
    "contactLocation", 
    "githubUrl", 
    "linkedinUrl"
) VALUES (
    'main',
    '[{"text":"I","gradient":false},{"text":"Build","gradient":false},{"text":"Machine","gradient":false},{"text":"Learning","gradient":false},{"text":"Systems","gradient":false},{"text":"That","gradient":false},{"text":"See,","gradient":true},{"text":"Predict","gradient":true},{"text":"&","gradient":true},{"text":"Ship.","gradient":true}]',
    'AI/ML Engineer specializing in computer vision, predictive modeling, and deploying ML solutions from research to production.',
    'Available for new opportunities',
    true,
    'I''m Ali Haider, an **AI/ML Engineer** passionate about building intelligent systems that solve real-world problems. I specialize in **computer vision**, **deep learning**, and **predictive analytics**, with hands-on experience deploying ML models to production using modern frameworks and pipelines.\n\nFrom training **EfficientNet models** for species classification to building **XGBoost pricing engines** and shipping full-stack platforms with **Next.js + Prisma**, I bridge the gap between ML research and production-ready software.',
    '["Computer Vision","Deep Learning","NLP","Predictive Modeling","Data Analysis","Model Deployment","Transfer Learning","Image Classification","Object Detection","Grad-CAM","TFLite","REST APIs","Full-Stack Development"]',
    'admin@example.com',
    'Shahkot, Punjab, Pakistan',
    'https://github.com/muhammadawais',
    'https://linkedin.com/in/muhammadawais'
) ON CONFLICT ("id") DO NOTHING;

-- Seed Admin User (Password: password123, Bcrypt Hash)
INSERT INTO "AdminUser" ("id", "email", "passwordHash") 
VALUES (
    'cm7admin1234567890001',
    'admin@example.com',
    '$2a$12$K1rF9h7Z.zWzP1V.x8l/eO/q.V9wF1N1H5Z4b1g8h3K1m5n7o9p1q' -- bcrypt hash of password123
) ON CONFLICT ("email") DO NOTHING;

-- Seed Initial Stats
INSERT INTO "Stat" ("id", "value", "label", "suffix", "decimals", "sortOrder") VALUES
('stat-1', 3.72, 'CGPA', '/4.00', 2, 0),
('stat-2', 1, 'Position Every Semester', 'st', 0, 1),
('stat-3', 2, 'ML Internships', '+', 0, 2),
('stat-4', 3, 'Major Projects', '+', 0, 3);

-- Seed Initial Projects
INSERT INTO "Project" ("id", "title", "subtitle", "description", "tags", "gradient", "sortOrder", "visible") VALUES
('proj-1', 'CarpSense', 'AI-Powered Fish Species Classifier', 'EfficientNetV2S model classifying 16 carp species and detecting 7 diseases with Grad-CAM explainability. Deployed via TFLite on Flutter with a bilingual Urdu/English interface.', '["EfficientNetV2S","TFLite","Flutter","Grad-CAM","Transfer Learning"]', 'from-coral/20 via-purple/10 to-violet/20', 0, true),
('proj-2', 'CellSafe', 'AI Pre-Owned Mobile Marketplace', 'Full-featured marketplace with XGBoost-powered price prediction (R² ≈ 0.90), computer-vision-based device condition assessment, and real-time chat. Built with Flutter and Firebase.', '["XGBoost","Computer Vision","Flutter","Firebase","Price Prediction"]', 'from-purple/20 via-violet/10 to-coral/20', 1, true),
('proj-3', 'Apna Bhatta', 'Full-Stack Brick Kiln Management', 'Production-grade platform built on Next.js 15 + TypeScript + PostgreSQL/Prisma. Features JWT authentication, role-based access control, GPS tracking, and comprehensive reporting.', '["Next.js 15","TypeScript","PostgreSQL","Prisma","JWT","RBAC"]', 'from-violet/20 via-coral/10 to-purple/20', 2, true);

-- Seed Initial Experience
INSERT INTO "Experience" ("id", "type", "role", "company", "period", "bullets", "sortOrder", "visible") VALUES
('exp-1', 'work', 'AI/ML Engineer Intern', 'DevelopersHub Corporation', 'Mar 2026 – May 2026', '["Developed and trained deep learning models for computer vision tasks including image classification and object detection","Built end-to-end ML pipelines from data preprocessing to model deployment using TensorFlow and Python","Collaborated with senior engineers to optimize model inference speed by 40% through quantization and TFLite conversion","Implemented Grad-CAM visualizations for model explainability and stakeholder presentations"]', 0, true),
('exp-2', 'work', 'Machine Learning Intern', 'CodeAlpha', 'Mar 2026 – Jun 2026', '["Designed and implemented predictive models using XGBoost and Scikit-learn for real-world datasets","Created comprehensive data analysis pipelines with Pandas, NumPy, and Matplotlib","Developed RESTful APIs with Flask/FastAPI to serve ML predictions in production environments","Achieved R² scores above 0.89 on regression tasks through systematic hyperparameter tuning"]', 1, true),
('exp-3', 'education', 'BS Computer Science', 'University', '2022 – 2026 (Expected)', '["CGPA: 3.72/4.00 — 1st Position holder every semester","Focus areas: Artificial Intelligence, Machine Learning, Data Structures & Algorithms","Led multiple final-year projects involving computer vision and full-stack development","Active participant in programming competitions and AI/ML workshops"]', 2, true);
