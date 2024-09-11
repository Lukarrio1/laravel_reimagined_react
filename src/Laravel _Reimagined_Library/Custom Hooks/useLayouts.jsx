import React from "react";
import { useSelector } from "react-redux";

export default function useLayouts(layout_id=null) {
  const { layout } = useSelector((state) => {
    return {
      layout: state?.coreNodes.layouts?.find(
        (item) => item?.id == layout_id
      ),
    };
  });
  return layout
}
