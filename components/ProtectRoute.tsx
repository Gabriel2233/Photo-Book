import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

export function ProtectRoute(Component) {
  return function () {
    const { user } = useAuth();
    const loading = user === null;
    const Router = useRouter();

    useEffect(() => {
      if (!user && !loading) Router.push("/");
    }, [user, loading]);

    return <Component {...arguments} />;
  };
}
