import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erwansyah — Web Developer & Bot Builder",
  description:
    "Portfolio of Erwansyah, a Web Developer, Telegram Bot Developer, and Automation Builder from Dabo Singkep, Indonesia. Specializing in HTML, CSS, JavaScript, Python, and automation scripting.",
  keywords: [
    "Erwansyah",
    "Web Developer",
    "Bot Developer",
    "Automation",
    "Telegram Bot",
    "JavaScript",
    "Python",
    "Portfolio",
    "Dabo Singkep",
    "Indonesia",
  ],
  authors: [{ name: "Erwansyah" }],
  openGraph: {
    title: "Erwansyah — Web Developer & Bot Builder",
    description:
      "Portfolio of Erwansyah — Web Dev, Bot Developer & Automation Builder from Indonesia.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erwansyah — Web Developer & Bot Builder",
    description:
      "Portfolio of Erwansyah — Web Dev, Bot Developer & Automation Builder from Indonesia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
