import React, { useEffect, useState } from "react";
import Navbar from "../../Pages/Components/Navbar";
import Footer from "../../Pages/Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import useNavigator from "../Custom Hooks/useNavigator";
import { layouts } from "../Abstract/PagesAndLayouts";
import { useForm } from "react-hook-form";
import useRest from "../Custom Hooks/useRest";
import { prefetchFunction } from "../Abstract/prefetchStructure";
import { setPreLoadPageData } from "../React Base Stores/app";

export default function LayoutWrapper({ Component, page }) {
  const { preloaded_page_data, reload_preloaded_page_data } = useSelector(
    (state) => {
      return {
        preloaded_page_data: state.app.preload_page_data,
        reload_preloaded_page_data: state.app.reload_preloaded_page_data,
      };
    }
  );

  const { restClient } = useRest();
  const dispatch = useDispatch();

  const processPrefetchData = async () => {
    const keys = Object.keys(preloaded_page_data[page.uuid]);
    if (keys.length == 0) return;
    await prefetchFunction(restClient, keys[0], dispatch, page.uuid);
  };

  useEffect(() => {
    if (reload_preloaded_page_data == null) return;
    processPrefetchData();
  }, [reload_preloaded_page_data]);

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
    processPrefetchData();
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
