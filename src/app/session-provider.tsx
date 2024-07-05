"use client";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const SessionProviderComponent: NextPage<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderComponent;
