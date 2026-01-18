import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

export const metadata: Metadata = {
    title: "Jacob Candelaria Dev Portfolio",
    description: "Backend Software Engineer",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />

                <header>
                    <h1>Jacob Candelaria</h1>
                    <h2>Backend Software Engineer</h2>
                    <hr />
                </header>

                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
