import React, { useCallback } from "react";
import { useSelector } from "react-redux";

export default function useIsLoading() {
  const loads = useSelector((state) => state?.loading?.loads);
  const isLoading = useCallback((uuid) => loads[uuid] ?? false, [loads]);
  return {
    isLoading,
  };
}
