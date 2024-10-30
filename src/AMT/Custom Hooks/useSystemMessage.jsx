import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../Stores/message";

export default function useSystemMessage() {
  const message = useSelector((state) => state?.message?.message);
  const dispatch = useDispatch();
  return {
    getMessage: () => message,
    setMessage: (message) => dispatch(setMessage(message)),
    clearMessage: () => dispatch(setMessage("")),
  };
}
