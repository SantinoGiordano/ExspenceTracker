import React from "react";
import Nav from "../components/nav";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-50">
      <Nav />
      {children}
    </div>
  );
}
