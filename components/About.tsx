"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

import { SiteSettings, Stat } from "@prisma/client";

const DEFAULT_STATS = [
  { value: 2.85, label: "CGPA", suffix: "/4.00", decimals: 2 },
  { value: 2, label: "Web Internships", suffix: "+", decimals: 0 },
  { value: 5, label: "Full-Stack Projects", suffix: "+", decimals: 0 },
];

const DEFAULT_SKILLS = [
  "MERN Stack",
  "React & Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma ORM",
  "Tailwind CSS",
  "REST APIs",
  "Full-Stack Development",
  "FastAPI",
  "HTML",
  "CSS",
  "Bootstrap",
  "Python",
];

// Helper to parse basic markdown (**bold** and \n\n)
function parseMarkdown(text: string) {
  let html = text.replace(/\*\*(.*?)\*\*/g, '<span class="text-content font-semibold">$1</span>');
  html = html.replace(/\n\n/g, '</p><p class="mt-4">');
  html = html.replace(/\n/g, '<br/>');
  return `<p>${html}</p>`;
}

function CountUpNumber({
  target,
  decimals,
  suffix,
}: {
  target: number;
  decimals: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About({
  settings,
  stats,
}: {
  settings?: SiteSettings | null;
  stats?: Stat[];
}) {
  const displayStats = stats?.length ? stats : DEFAULT_STATS;
  const displaySkills = settings?.aboutSkills ? JSON.parse(settings.aboutSkills) : DEFAULT_SKILLS;
  
  const defaultBio = `I'm Ali Haider, a **Full-Stack Developer** passionate about building robust applications that solve real-world problems. I specialize in **modern web technologies**, **backend architectures**, and **scalable systems**, with hands-on experience deploying complete solutions to production using modern frameworks like the **MERN Stack**.\n\nFrom crafting intuitive user interfaces to building secure APIs and shipping full-stack platforms with **Next.js + Prisma**, I bridge the gap between complex requirements and production-ready software. I have completed my **BSSE** degree with a **2.85 CGPA**.`;
  
  const bioHtml = parseMarkdown(settings?.aboutBio || defaultBio);
  
  return (
    <section id="about" className="relative py-[80px] lg:py-[100px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-sm font-mono text-violet font-medium">
              01
            </span>
            <h2
              className="font-heading font-bold text-content"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              About Me
            </h2>
            <span className="flex-1 h-[1px] bg-subtle" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal delay={0.1}>
              <div 
                className="text-lg leading-relaxed text-content-dim [&>p]:mb-4 last:[&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: bioHtml }}
              />
            </ScrollReveal>

            {/* Skill Pills */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-4">
                {displaySkills.map((skill: string, i: number) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.04,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="px-3.5 py-1.5 text-xs font-medium text-content-dim rounded-full border border-subtle hover:border-violet/30 hover:text-content hover:bg-violet/[0.06] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {displayStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.2 + i * 0.1}>
                <div className="glass-card rounded-2xl p-6 text-center hover:border-violet/20 transition-colors duration-300 group">
                  <div className="text-3xl lg:text-4xl font-heading font-bold gradient-text mb-2">
                    <CountUpNumber
                      target={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-content-dim group-hover:text-content-dim transition-colors">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
