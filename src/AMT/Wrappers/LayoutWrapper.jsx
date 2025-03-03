/* eslint-disable react/prop-types */
import React, { memo, useLayoutEffect, useState } from "react";
import { layouts } from "../Abstract/PagesAndLayouts";
import useLayouts from "../Custom Hooks/useLayouts";
import useCurrentPage from "../Custom Hooks/useCurrentPage";
import useClearCache from "../Custom Hooks/useClearCache";
import { checkLocalStorageUsage } from "../Abstract/localStorage";

const LayoutWrapper = memo(({ Component, page }) => {
  const clearCache = useClearCache();
  const layout = useLayouts(page?.layout_id);
  const [ActualLayoutComponent, setActualLayoutComponent] = useState(null);
  const currentPage = useCurrentPage();
  useLayoutEffect(() => {
    if (!page) return;
    const ActualLayout = layouts[layout?.properties?.value?.actual_component];
    setActualLayoutComponent(
      ActualLayout != null ? (
        <ActualLayout Component={Component} page={page} />
      ) : null
    );
    currentPage.setCurrentPage(page);
    checkLocalStorageUsage();
    clearCache();
  }, [page]);

  return page && ActualLayoutComponent != null
    ? ActualLayoutComponent
    : Component;
});

export default LayoutWrapper;
