import React, { useCallback } from "react";
import { useSelector } from "react-redux";

/**
 * @description Custom hook to determine the loading state of various components or actions.
 * Provides a function to check if a specific action identified by its UUID is currently loading.
 * @returns {Object} - An object containing:
 *  - isLoading: Function to check loading state by UUID
 */
export default function useIsLoading() {
  // Retrieve the loading states from the Redux store
  const loads = useSelector((state) => state?.loading?.loads);

  /**
   * @param {string} uuid - The unique identifier for the loading state to check
   * @description This function checks if the loading state associated with the given UUID is true or false.
   * @returns {boolean} - Returns true if loading is in progress for the given UUID, otherwise false.
   */
  const isLoading = useCallback((uuid) => loads[uuid] ?? false, [loads]); // Use useCallback to memoize the function

  return {
    isLoading, // Expose the isLoading function
  };
}
