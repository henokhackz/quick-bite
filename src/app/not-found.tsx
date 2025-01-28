"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { roleRoutes } from "@/lib/settings";
import { StepBack } from "lucide-react";

const NotFoundPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const role = session?.user?.role;
  const pathname = React.useMemo(() => {
    return roleRoutes[role as keyof typeof roleRoutes]
      ? `/${roleRoutes[role as keyof typeof roleRoutes]}/`
      : "/unauthorized";
  }, [role]);

  let baseUlr:string;
  if(window !== undefined){
     baseUlr = window.location.origin;
    
  }
  const handleClick = () => {
    if (status === "authenticated") {
      router.push(baseUlr + pathname);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-white to-white text-gray-800 p-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/404.jpg"
          alt="Not found"
          width={400}
          height={400}
          className="rounded-lg"
        />
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-2 px-6 py-3 mt-4 rounded-lg text-white bg-primary font-semibold transition duration-300 hover:bg-primary/80 ease-in-out"
        >
          <StepBack /> Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
