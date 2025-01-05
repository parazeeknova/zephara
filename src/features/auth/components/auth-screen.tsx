"use client";

import { useState } from "react";
import type { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setstate] = useState<SignInFlow>("signIn");

  return (
    <div className="flex h-full items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setstate} />
        ) : (
          <SignUpCard setState={setstate} />
        )}
      </div>
    </div>
  );
};
