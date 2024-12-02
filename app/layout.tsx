import React from "react";
import "./globals.css";

export const metadata = {
  title: "AI Search Assistant",
  description: "Search and summarize with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
