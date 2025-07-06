import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const ubuntu = Ubuntu_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediNova AI",
  description: "AI for Medical Imaging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={ubuntu.className} suppressHydrationWarning>
          <Provider>
            {children}
             <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
