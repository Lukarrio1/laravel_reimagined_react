import React from "react";
import { useSelector } from "react-redux";

export default function useAuthUser() {
  const { auth_user } = useSelector((state) => {
    return {
      auth_user: state?.authentication?.user,
    };
  });
  return auth_user ?? null;
}
