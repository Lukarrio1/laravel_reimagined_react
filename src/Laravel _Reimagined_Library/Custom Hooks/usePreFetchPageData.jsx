import React from "react";

export default function usePreFetchPageData({ getValue, setValue }) {
  return {
    data: null,
    setValue,
  };
}
