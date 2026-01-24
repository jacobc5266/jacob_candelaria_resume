import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import ShowViewport from "@/components/maintenance/ShowViewport";

export const metadata: Metadata = {
    title: "Jacob Candelaria Dev Portfolio",
    description: "Backend Software Engineer",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
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
                    <SpeedInsights />
                </main>

                <footer>
                    <ShowViewport />
                </footer>
            </body>
        </html>
    );
}
