import React from "react";
import { useSelector } from "react-redux";

export default function useIsLoading() {
  const loads = useSelector((state) => state?.loading?.loads);
  return {
    isLoading: (uuid) => loads[uuid] ?? false,
  };
}
