import React, { useEffect, useState } from "react";
import Navbar from "../../Pages/Components/Navbar";
import Footer from "../../Pages/Components/Footer";
import { useSelector } from "react-redux";
import useNavigator from "../Custom Hooks/useNavigator";
import { layouts } from "../Abstract/PagesAndLayouts";

export default function LayoutWrapper({ Component, page }) {
  const { layout } = useSelector((state) => {
    return {
      layout: state?.coreNodes.layouts?.filter(
        (item) => item?.id == page?.layout_id
      )[0],
    };
  });
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
