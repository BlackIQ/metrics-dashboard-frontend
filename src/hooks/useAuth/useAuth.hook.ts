"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hooks";

const useAuth = () => {
  const router = useRouter();

  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    router.replace(token ? "/panel" : "/auth");
  }, [token, router]);
};

export default useAuth;
