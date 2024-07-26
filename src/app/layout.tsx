import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider"; 
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/layout-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urban deca tower",
  description: "Explore a best hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar/> */}
          <LayoutProvider>{children}</LayoutProvider>     
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
