import { NextPage } from "next";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const SignInLayout: NextPage<Props> = ({ children }) => {
  return <>{children}</>;
};

export default SignInLayout;
