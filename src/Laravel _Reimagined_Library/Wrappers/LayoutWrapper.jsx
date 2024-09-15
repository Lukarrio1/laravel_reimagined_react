import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { layouts } from "../Abstract/PagesAndLayouts";
import useLayouts from "../Custom Hooks/useLayouts";
/**
 *
 *@description This is the general layout component that is used  to apply a pages layout dynamically .
 */
export default function LayoutWrapper({ Component, page }) {
  const layout = useLayouts(page?.layout_id);
  const [ActualLayoutComponent, setActualLayoutComponent] = useState(null);
  useEffect(() => {
    if (!page) return;
    const ActualLayout = layouts[layout?.properties?.value?.actual_component];
    setActualLayoutComponent(
      ActualLayout != null ? (
        <ActualLayout Component={Component} page={page}></ActualLayout>
      ) : null
    );
  }, [page]);

  return page && ActualLayoutComponent != null
    ? ActualLayoutComponent
    : Component;
}
