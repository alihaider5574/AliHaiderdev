import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

async function main() {
  const { Pool } = require("pg");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // 1. Update SiteSettings
  const heroHeadline = JSON.stringify([
    { text: "I", gradient: false },
    { text: "Build", gradient: false },
    { text: "Web", gradient: false },
    { text: "Apps", gradient: false },
    { text: "That", gradient: false },
    { text: "Scale,", gradient: true },
    { text: "Perform", gradient: true },
    { text: "&", gradient: true },
    { text: "Ship.", gradient: true },
  ]);

  const bio = `I'm Ali Haider, a **Full-Stack Developer** passionate about building robust applications that solve real-world problems. I specialize in **modern web technologies**, **backend architectures**, and **scalable systems**, with hands-on experience deploying complete solutions to production using modern frameworks like the **MERN Stack**.\n\nFrom crafting intuitive user interfaces to building secure APIs and shipping full-stack platforms with **Next.js + Prisma**, I bridge the gap between complex requirements and production-ready software. I have completed my **BSSE** degree with a **2.85 CGPA**.`;

  const skills = JSON.stringify([
    "MERN Stack",
    "FastAPI",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "React & Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma ORM",
    "REST APIs",
    "Full-Stack Development",
    "Python",
  ]);

  await prisma.siteSettings.update({
    where: { id: "main" },
    data: {
      heroHeadline,
      heroSubtext: "Full-Stack Developer specializing in responsive design, robust APIs, and deploying end-to-end web solutions using modern frameworks like the MERN Stack.",
      aboutBio: bio,
      aboutSkills: skills,
      cvUrl: "/ALI_HAIDER_Resume.docx",
    }
  });

  // 2. Clear and recreate Stats
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: 2.85, label: "CGPA", suffix: "/4.00", decimals: 2, sortOrder: 0 },
      { value: 2, label: "Web Internships", suffix: "+", decimals: 0, sortOrder: 1 },
      { value: 5, label: "Full-Stack Projects", suffix: "+", decimals: 0, sortOrder: 2 },
    ]
  });

  // 3. Clear and recreate Experiences
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        type: "work",
        role: "Full-Stack Developer Intern",
        company: "TechNova Solutions",
        period: "Jul 2026 – Present",
        bullets: JSON.stringify([
          "Developing dynamic, responsive web interfaces using HTML, CSS, and Tailwind CSS",
          "Building and consuming RESTful APIs powered by FastAPI and PostgreSQL",
          "Collaborating with UI/UX designers to implement pixel-perfect frontend layouts",
          "Improving page load speeds by 30% through asset optimization and modern CSS techniques",
        ]),
        sortOrder: 0,
      },
      {
        type: "work",
        role: "Backend Web Developer Intern",
        company: "CodeAlpha",
        period: "Mar 2026 – Jun 2026",
        bullets: JSON.stringify([
          "Designed robust database schemas and built secure authentication systems using Python and FastAPI",
          "Created modular API endpoints to serve data to frontend applications seamlessly",
          "Integrated third-party APIs and managed cloud deployments for staging environments",
        ]),
        sortOrder: 1,
      },
      {
        type: "education",
        role: "BS Software Engineering",
        company: "University",
        period: "2022 – 2026 (Completed)",
        bullets: JSON.stringify([
          "CGPA: 2.85/4.00",
          "Focus areas: Full-Stack Development, Web Engineering, Software Architecture",
          "Led multiple final-year projects involving modern web technologies and full-stack development",
        ]),
        sortOrder: 2,
      }
    ]
  });

  // 4. Clear and recreate Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "FastStore API",
        subtitle: "High-Performance E-Commerce Backend",
        description: "A comprehensive e-commerce API built with FastAPI and PostgreSQL. Features include JWT authentication, role-based access control, product inventory management, and automated OpenAPI documentation via Swagger UI.",
        tags: JSON.stringify(["FastAPI", "Python", "PostgreSQL", "Swagger", "REST"]),
        gradient: "from-coral/20 via-purple/10 to-violet/20",
        sortOrder: 0,
      },
      {
        title: "DashUI Framework",
        subtitle: "Responsive Admin Dashboard",
        description: "A fully responsive admin dashboard interface built entirely with HTML, CSS, and Bootstrap. Includes custom charting components, data tables, and a mobile-first sidebar navigation system.",
        tags: JSON.stringify(["HTML", "CSS", "Bootstrap", "Responsive", "UI/UX"]),
        gradient: "from-purple/20 via-violet/10 to-coral/20",
        sortOrder: 1,
      },
      {
        title: "NextFolio",
        subtitle: "Modern Developer Portfolio",
        description: "A blazing fast, SEO-optimized portfolio website built with Next.js and Tailwind CSS. Features dynamic content rendering, framer-motion animations, and a PostgreSQL database powered by Prisma.",
        tags: JSON.stringify(["Next.js", "Tailwind CSS", "TypeScript", "Prisma"]),
        gradient: "from-violet/20 via-coral/10 to-purple/20",
        sortOrder: 2,
      }
    ]
  });

  console.log("Database completely overhauled with Full-Stack Developer content!");
  await prisma.$disconnect();
}
main().catch(console.error);
