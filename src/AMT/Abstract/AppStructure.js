import { Route } from "react-router-dom";

import { setNodes } from "../Stores/coreNodes";
import { restClient } from "./restClient";
import { setAuthProperties } from "../Stores/auth";
import { Suspense } from "react";
import Loading from "../../Pages/Components/Loading";
import { pages } from "./PagesAndLayouts";
import LayoutWrapper from "../Wrappers/LayoutWrapper";
import RedirectWrapper from "../Wrappers/RedirectWrapper";
import { getWithTTL, setWithTTL } from "./localStorage";
import { Constants } from "./Constants";
import { setSettings } from "../Stores/setting";

const {
  uuids: {
    user_uuids: { profile_endpoint_uuid },
    auth_uuids: {
      auth_nodes_endpoint_uuid,
      guest_nodes_enpoint_uuid,
      settings_endpoint_uuid,
      monitor_endpoint_uuid,
    },
  },
} = Constants;

const generateRoutes = (pages_properties) => {
  if (pages_properties.length === 0) {
    return null;
  }
  return [
    ...Object.keys(pages).map((page) => {
      let page_props =
        pages_properties.find((p) => p.component && p.component === page) ?? {};
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
                    <Component></Component>
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
  let settingsData = getWithTTL(settings_endpoint_uuid);
  if (!settingsData) {
    const {
      data: { settings },
    } = await restClient(settings_endpoint_uuid);
    settingsData = settings;
    setWithTTL(
      Constants.app_cache_ttl,
      settingsData?.find((s) => s.key == "cache_ttl")?.properties?.value
    );
    setWithTTL(
      settings_endpoint_uuid,
      settings,
      getWithTTL(Constants.app_cache_ttl)
    );
    dispatch(setSettings(settings));
  } else {
    dispatch(setSettings(settingsData));
  }
  // gets the user profile data
  try {
    const {
      data: { user },
    } = await restClient(profile_endpoint_uuid);
    setUpNodes(auth_nodes_endpoint_uuid, dispatch);
    dispatch(setAuthProperties(user));
    return;
  } catch (error) {}
  setUpNodes(guest_nodes_enpoint_uuid, dispatch);
  return true;
};

export const setUpNodes = async (uuid, dispatch) => {
  let nodesCachedData = getWithTTL(uuid);
  if (!nodesCachedData) {
    const { data: nodes } = await restClient(uuid);
    dispatch(setNodes(nodes));
    setWithTTL(uuid, nodes, getWithTTL(Constants.app_cache_ttl));
  } else {
    dispatch(setNodes(nodesCachedData));
  }
};

export const monitorCache = async () => {
  let current_cache_token = getWithTTL(settings_endpoint_uuid);
  if (current_cache_token != null) {
    current_cache_token = current_cache_token?.find(
      (s) => s.key == "is_cache_valid"
    )?.properties?.value;
  }
  const { data } = await restClient(monitor_endpoint_uuid);
  if (data?.is_cache_valid !== current_cache_token) {
    if (current_cache_token) localStorage.clear();
  }
};

export { pages, generateRoutes, assembleApp };
