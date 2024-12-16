import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const { session } = useSelector((state) => state);

  useEffect(() => {
    router.push(session ? `/panel` : "/auth");
  }, [session]);
};

export default useAuth;
