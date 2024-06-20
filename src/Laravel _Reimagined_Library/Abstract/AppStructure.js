import { Route } from "react-router-dom";
import { setSettings } from "../React Base Stores/setting";
import { setNodes } from "../React Base Stores/coreNodes";
import { restClient } from "./restClient";
import { setAuthProperties } from "../React Base Stores/auth";
import Layout from "../Wrappers/LayoutWrapper";
import Redirect from "../Wrappers/RedirectWrapper";
import { Suspense, lazy } from "react";
import Loading from "../../Components/Loading";
import { pages } from "./PagesAndLayouts";
import LayoutWrapper from "../Wrappers/LayoutWrapper";
import RedirectWrapper from "../Wrappers/RedirectWrapper";

const generateRoutes = (pages_properties, authUser, app_animation) => {
  if (pages_properties.length === 0) {
    return null;
  }
  return Object.keys(pages).map((page) => {
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
                  <Component animation_class={app_animation}></Component>
                </Suspense>
              }
            ></LayoutWrapper>
          </RedirectWrapper>
        }
      />
    );
  });
};

const assembleApp = async (dispatch) => {
  const {
    data: { settings },
  } = await restClient("xBULrpJXyMrElSIu6OhIlizi3WwrQnQTm7x6RloTyg4QzmOE3p");
  dispatch(setSettings(settings));
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
  const { data: nodes } = await restClient(uuid);
  dispatch(setNodes(nodes));
};

export { pages, generateRoutes, assembleApp };
