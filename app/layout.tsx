import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star",
  description: "Star",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
