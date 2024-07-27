import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider"; 
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/layout-provider";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: "Urban deca tower",
  description: "Explore a best hotel",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>{children}</LayoutProvider>  
          <Toaster />   
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
