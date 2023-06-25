"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState, ReactNode } from "react";
import DepartureProvider from "./contexts/DepartureContext";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "ToDo Everywhere",
  description: "ToDo Everywhere app",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <DepartureProvider>{children}</DepartureProvider>
      </body>
    </html>
  );
}
