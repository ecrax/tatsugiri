import { type ReactNode } from "react";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    void router.push("/");
    return <div></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
