import React from "react";
import SignInForm from "@/components/forms/sign-in-form";
import { TextTypeAnimation } from "@/components/type-animation";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="hidden md:flex md:w-4/6 h-full flex-col ">
        <TextTypeAnimation />
      </div>
      <div className="w-full md:w-2/6 flex items-center justify-center h-full">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
