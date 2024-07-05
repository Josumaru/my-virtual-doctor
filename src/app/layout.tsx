import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIDO - Virtual Doctor",
  description: "Virtual Doctor",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
