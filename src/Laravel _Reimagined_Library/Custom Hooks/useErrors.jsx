import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../React Base Stores/errors";

/**
 * @description This hook returns getError which could be used to retrieve an error given the error key
 * and clearError which is used to remove an error if the key is given if not all errors will be removed
 * @returns [getError,ClearError]
 */
export default function useErrors() {
  const { errors } = useSelector((state) => {
    const errors = [...state?.errors?.errors];
    return { errors: errors };
  });

  const dispatch = useDispatch();
  /**
   *
   * @param {string} key
   * @description this function returns an array of errors given the error key
   * @returns array
   */
  const getError = (key) => {
    const currentError = errors?.find((e) => e.key == key);
    return currentError != undefined ? currentError?.messages : [];
  };

  /**
   *
   * @param {string} key
   * @description if key is empty it will clear all of the errors
   * if not it will clear all occurrences of key
   */
  const clearError = (key = "") => {
    dispatch(clearErrors(key));
  };

  return {
    getError,
    clearError,
  };
}
