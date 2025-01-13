import React from "react";
import Image from "next/image";

const NOtFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
      <Image src="/404.png" alt="not found image" width={500} height={500} />
    </div>
  );
};

export default NOtFoundPage;
