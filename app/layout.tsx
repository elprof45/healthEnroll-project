"use client";
import Loader from "@/components/common/Loader";
import "@/css/font_style.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen h-full">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
