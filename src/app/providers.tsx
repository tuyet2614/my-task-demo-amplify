"use client";

import React from "react";
import "@/lib/amplify";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
