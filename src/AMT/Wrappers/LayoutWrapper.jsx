import React, { memo, useLayoutEffect, useState } from "react";
import { layouts } from "../Abstract/PagesAndLayouts";
import useLayouts from "../Custom Hooks/useLayouts";
import useCurrentPage from "../Custom Hooks/useCurrentPage";

/**
 * A wrapper component that applies a dynamic layout to a given page component.
 *
 * @component
 * @param {Object} props - The props for the LayoutWrapper component.
 * @param {React.ComponentType} props.Component - The component to be wrapped by the layout.
 * @param {Object} props.page - The page object containing layout information.
 * @param {string} props.page.layout_id - The unique identifier for the page's layout.
 *
 * @returns {JSX.Element} The layout-wrapped component or the original component if no layout is applied.
 */
const LayoutWrapper = memo(({ Component, page }) => {
  const layout = useLayouts(page?.layout_id);
  const [ActualLayoutComponent, setActualLayoutComponent] = useState(null);
  const currentPage = useCurrentPage();
  useLayoutEffect(() => {
    if (!page) return; // Exit if no page is provided

    // Retrieve the actual layout component from the layouts collection based on layout properties
    const ActualLayout = layouts[layout?.properties?.value?.actual_component];

    // If an actual layout is found, set it in state; otherwise, set null
    setActualLayoutComponent(
      ActualLayout != null ? (
        <ActualLayout Component={Component} page={page} />
      ) : null
    );
    // Dispatch the current page to Redux to update the application state
    currentPage.setCurrentPage(page);
  }, [page]);

  // Render either the layout-wrapped component or the base Component if no layout is applied
  return page && ActualLayoutComponent != null
    ? ActualLayoutComponent // Return the wrapped layout component if it exists
    : Component; // Return the original component if no layout is applied
});

export default LayoutWrapper;
