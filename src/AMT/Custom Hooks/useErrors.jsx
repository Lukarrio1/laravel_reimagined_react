import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMemErrors } from "../Stores/errors";
import { useCallback } from "react";

/**
 * @description Custom hook for managing errors in the application.
 * Provides functions to retrieve specific error messages and to clear errors from the state.
 * @returns {Object} - An object containing:
 *  - getError: Function to retrieve error messages by key
 *  - clearError: Function to clear errors, either all or specific ones based on key
 */
export default function useErrors() {
  // Get current errors from the Redux state
  const errors = useSelector((state) => getMemErrors(state));

  const dispatch = useDispatch();

  /**
   * @param {string} key - The key associated with the desired error messages
   * @description This function retrieves error messages associated with the provided key.
   * If no errors are found for the key, it returns an empty array.
   * @returns {Array} - An array of error messages or an empty array if no errors found.
   */
  const getError = useCallback(
    (key) => {
      const currentError = errors?.find((e) => e.key === key);
      return currentError !== undefined ? currentError?.messages : [];
    },
    [errors] // Dependency array for useCallback to re-create the function when errors change
  );

  /**
   * @param {string|null} key - The key of the error to clear; if null, all errors will be cleared
   * @description This function clears the error(s) associated with the given key.
   * If no key is provided, it clears all errors from the state.
   */
  const clearError = useCallback(
    (key = null) => {
      dispatch(clearErrors(key)); // Dispatch the action to clear errors
    },
    [dispatch]
  );

  return {
    getError,
    clearError,
  };
}
