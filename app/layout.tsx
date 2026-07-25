import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amanj Devs | Digital Universe",
  description:
    "Full-stack developer & team lead. Building websites, apps & trading bots. Step into the void.",
  keywords: [
    "web development",
    "React",
    "Next.js",
    ".NET",
    "Python",
    "trading bots",
  ],
  openGraph: {
    title: "Amanj Devs | Digital Universe",
    description: "Step into the void. Explore the digital universe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise bg-void antialiased">{children}</body>
    </html>
  );
}
