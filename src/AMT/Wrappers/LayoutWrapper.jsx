import React, { useLayoutEffect, useState } from "react";
import { layouts } from "../Abstract/PagesAndLayouts";
import useLayouts from "../Custom Hooks/useLayouts";
import useSettings from "../Custom Hooks/useSettings";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../Stores/coreNodes";
/**
 *
 *@description This is the general layout component that is used  to apply a pages layout dynamically .
 */
export default function LayoutWrapper({ Component, page }) {
  const layout = useLayouts(page?.layout_id);
  const [ActualLayoutComponent, setActualLayoutComponent] = useState(null);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!page) return;
    const ActualLayout = layouts[layout?.properties?.value?.actual_component];
    setActualLayoutComponent(
      ActualLayout != null ? (
        <ActualLayout Component={Component} page={page}></ActualLayout>
      ) : null
    );
    dispatch(setCurrentPage(page));
  }, [page]);

  return page && ActualLayoutComponent != null
    ? ActualLayoutComponent
    : Component;
}
