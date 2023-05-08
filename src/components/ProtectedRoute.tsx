import { type ReactNode } from "react";
import { useRouter } from "next/router";



import { useSession } from "next-auth/react";

import { Icons } from "./icons";



const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icons.loadingSpinner className="stroke-primary w-6 h-6" />
      </div>
    );
  }

  if (!data) {
    void router.push("/");
    return <div></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;