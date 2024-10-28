import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMemErrors } from "../Stores/errors";
import { useCallback } from "react";

/**
 * @description This hook returns getError which could be used to retrieve an error given the error key
 * and clearError which is used to remove an error if the key is given if not all errors will be removed
 * @returns [getError,ClearError]
 */
export default function useErrors() {
  const errors = useSelector((state) => getMemErrors(state));

  const dispatch = useDispatch();
  /**
   *
   * @param {string} key
   * @description this function returns an array of errors given the error key
   * @returns array
   */
  const getError = useCallback(
    (key) => {
      const currentError = errors?.find((e) => e.key == key);
      return currentError != undefined ? currentError?.messages : [];
    },
    [errors]
  );

  /**
   *
   * @param {string} key
   * @description if key is empty it will clear all of the errors
   * if not it will clear all occurrences of key
   */
  const clearError = useCallback((key = null) => {
    dispatch(clearErrors(key));
  }, []);

  return {
    getError,
    clearError,
  };
}
