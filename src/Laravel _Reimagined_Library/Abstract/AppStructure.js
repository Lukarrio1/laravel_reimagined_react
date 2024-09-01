import { Route } from "react-router-dom";
import { setSettings } from "../React Base Stores/setting";
import { setNodes } from "../React Base Stores/coreNodes";
import { restClient } from "./restClient";
import { setAuthProperties } from "../React Base Stores/auth";
import Layout from "../Wrappers/LayoutWrapper";
import Redirect from "../Wrappers/RedirectWrapper";
import { Suspense, lazy } from "react";
import Loading from "../../Pages/Components/Loading";
import { pages } from "./PagesAndLayouts";
import LayoutWrapper from "../Wrappers/LayoutWrapper";
import RedirectWrapper from "../Wrappers/RedirectWrapper";
import NotFound from "../../Pages/NotFound";
import { getWithTTL, setWithTTL } from "../Custom Hooks/localStorage";
import { Constants } from "./Constants";
import { setReloadCachedData } from "../React Base Stores/app";

const generateRoutes = (pages_properties = [], search_skip_word) => {
  if (pages_properties.length === 0) {
    return null;
  }
  return [
    ...Object.keys(pages).map((page) => {
      let page_props = pages_properties.filter(
        (p) => p.component && p.component === page
      )[0];
      page_props = page_props ? page_props : {};
      const path = page_props?.path ? page_props.path : "/";
      const Component = pages[page_props.component ?? "NoFound"];
      return (
        <Route
          key={path}
          path={path}
          element={
            <RedirectWrapper page={{ ...page_props }}>
              <LayoutWrapper
                page={{ ...page_props }}
                Component={
                  <Suspense fallback={<Loading></Loading>}>
                    <Component search_skip_word={search_skip_word}></Component>
                  </Suspense>
                }
              ></LayoutWrapper>
            </RedirectWrapper>
          }
        />
      );
    }),
    // <Route component={NotFound} />,
  ];
};

const assembleApp = async (dispatch) => {
  let settingsData = getWithTTL(Constants.settings);
  if (!settingsData) {
    const {
      data: { settings },
    } = await restClient("xBULrpJXyMrElSIu6OhIlizi3WwrQnQTm7x6RloTyg4QzmOE3p");
    settingsData = settings;
    setWithTTL(
      Constants.app_cache_ttl,
      settingsData?.find((s) => s.key == "cache_ttl")?.properties?.value * 1000
    );
    setWithTTL(
      Constants.settings,
      settings,
      getWithTTL(Constants.app_cache_ttl)
    );
    dispatch(setSettings(settings));
  } else {
    dispatch(setSettings(settingsData));
  }

  try {
    const {
      data: { user },
    } = await restClient("kZ5ZSVmv6BWUYWbPI0is2N3kiy6agWIm4fZw4LUBUbx2xi2Reo");
    setUpNodes("QGXWjhKGG4odx9O6zOcy7MSKyjYO3KW9nw9orosCQD6vEEHMnk", dispatch);
    dispatch(setAuthProperties(user));
    return;
  } catch (error) {}
  setUpNodes("ITD2Dj5t8NFdl8FCjsQxldnMPwdSnq1iuAYh7qpmjMbSZktUUF", dispatch);
  return true;
};

export const setUpNodes = async (uuid, dispatch) => {
  let nodesCachedData = getWithTTL(uuid);
  if (!nodesCachedData) {
    const { data: nodes } = await restClient(uuid);
    dispatch(setNodes(nodes));
    setWithTTL(uuid, nodes, getWithTTL(Constants.app_cache_ttl));
  } else {
    dispatch(setNodes(nodesCachedData ?? []));
  }
};

export const monitorCache = async (dispatch) => {
  const uuid = "IvSpS0YVKV4ZKZJ2UahEMoPwzotH67iKvHd9rq6LJk2NMyCVDf";
  let current_cache_token = getWithTTL(Constants.settings);
  if (current_cache_token != null) {
    current_cache_token = current_cache_token?.find(
      (s) => s.key == "is_cache_valid"
    )?.properties?.value;
  }
  const { data } = await restClient(uuid);
  if (data?.is_cache_valid !== current_cache_token) {
    if (current_cache_token) {
      localStorage.clear();
      dispatch(setReloadCachedData(true));
    }
  }
};

export { pages, generateRoutes, assembleApp };
