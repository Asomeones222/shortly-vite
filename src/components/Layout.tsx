import React from "react";
import { Navbar } from "./Navbar";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <main className="max-w-7xl mx-auto min-h-full h-full grow">
        {children}
      </main>
    </div>
  );
}
