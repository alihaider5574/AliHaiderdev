import type { Metadata } from "next";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Haider — AI/ML Engineer",
  description:
    "I build machine learning systems that see, predict, and ship. Portfolio of Ali Haider — AI/ML Engineer specializing in computer vision, predictive modeling, and full-stack deployment.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Computer Vision",
    "TensorFlow",
    "Python",
    "Portfolio",
    "Ali Haider",
  ],
  openGraph: {
    title: "Ali Haider — AI/ML Engineer",
    description:
      "I build machine learning systems that see, predict, and ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-base text-content font-body transition-colors duration-300">
        {/* Anti-flash: apply dark class before paint if stored in localStorage */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
