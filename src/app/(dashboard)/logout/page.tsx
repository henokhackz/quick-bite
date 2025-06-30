"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Spinner from "@/components/ui/spinner"; 
import { LogOut } from "lucide-react";

const LogoutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doLogout = async () => {
      try {
        setLoading(true);
        await signOut(); 
      } finally {
        setLoading(false);
      }
    };
    doLogout();
  }, []);

  return (
    <div className="flex  items-center justify-center min-h-[60vh] text-center">
      <LogOut className="w-10 h-10 text-primary mb-4" />
      <p className="text-lg text-gray-700 dark:text-gray-200">
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner /> <span>Signing you out...</span>
          </div>
        ) : (
          "Redirecting..."
        )}
      </p>
    </div>
  );
};

export default LogoutPage;
