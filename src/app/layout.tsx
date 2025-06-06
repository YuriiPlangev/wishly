import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";
import I18nProvider from "../app/Providers/i18n-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wishly",
  description: "Create a wishlist for any occasion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
         <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
        {children}
        <Toaster />
        </ThemeProvider>
         </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
