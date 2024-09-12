import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrors } from "../React Base Stores/errors";

export default function useErrors() {
  const { errors } = useSelector((state) => {
    const errors = [...state?.errors?.errors];
    return { errors: errors };
  });

  const dispatch = useDispatch();

  const getError = (key) => {
    const currentError = errors?.find((e) => e.key == key);
    return currentError != undefined ? currentError?.messages : [];
  };

  const clearError = (key) => {
    dispatch(setErrors(errors?.filter((e) => e.key != key)));
  };

  return {
    getError,
    clearError,
  };
}
