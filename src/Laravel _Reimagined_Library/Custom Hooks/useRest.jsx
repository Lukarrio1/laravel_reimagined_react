import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { restClient } from "../Abstract/restClient";
import useLocalStorageCache from "./localStorage";
import { setErrors } from "../React Base Stores/errors";
// the save word for a empty variable is "empty_search_value" instead of passing it with an empty value
export default function useRest() {
  const { Routes } = useSelector((state) => {
    const routes = [...state?.coreNodes?.routes];
    return { Routes: routes };
  });
  const dispatch = useDispatch();
  return {
    restClient: async (uuid, route_params, data_to_send, use_cache = false) => {
      const route = Routes?.find((r) => r?.uuid == uuid);
      try {
        return await restClient(
          uuid,
          route_params,
          data_to_send,
          route,
          use_cache
        );
      } catch (error) {
        if (error == null) return;
        if (error.response == null) return;
        const {
          response: { data },
          status,
        } = error;
        switch (status) {
          case 500:
            dispatch(
              setErrors([
                {
                  status,
                  key: "system_errors",
                  messages: [data?.message],
                },
              ])
            );
            break;
          case 401:
            dispatch(
              setErrors([
                {
                  status,
                  key: "invalid_credentials",
                  messages: [data?.message],
                },
              ])
            );
            break;
          case 422:
            const keys = Object.keys(data?.errors);
            const temp = [];
            if (keys.length == 0) return;
            keys.forEach((key) => {
              temp.push({
                status,
                key,
                messages: [...data?.errors[key]],
              });
            });
            dispatch(setErrors(temp));
            break;
          default:
            break;
        }
        return null;
      }
    },
  };
}
