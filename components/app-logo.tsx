import Link from "next/link";
import React from "react";

export default function AppLogo() {
  return (
    <Link
      href="/"
      className="text-sm text-slate-600 hover:text-slate-900 transition-colors block w-full"
    >
      <div className="text-center w-full">
      App Logo
      </div>
    </Link>
  );
}
