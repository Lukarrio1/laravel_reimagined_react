import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithTTL, setWithTTL } from "../Abstract/localStorage";
import { setSettings } from "../Stores/setting";
import { restClient } from "../Abstract/restClient";
import { Constants } from "../Abstract/Constants";
import { getMemPages, setNodes } from "../Stores/coreNodes";
import useUserDataLayer from "./useUserDataLayer";
import useAuthUser from "../Custom Hooks/useAuthUser";
import { Route } from "react-router-dom";
import RedirectWrapper from "../Wrappers/RedirectWrapper";
import LayoutWrapper from "../Wrappers/LayoutWrapper";
import { pages } from "../Abstract/PagesAndLayouts";
import Loading from "../../Pages/Components/Loading";

const {
  uuids: {
    user_uuids: { profile_endpoint_uuid },
    system_uuids: { monitor_endpoint_uuid, settings_endpoint_uuid },
    auth_uuids: { auth_nodes_endpoint_uuid, guest_nodes_endpoint_uuid },
  },
} = Constants;

export default function useAppDataLayer() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const { getProfile } = useUserDataLayer();
  const pages_properties = useSelector((state) => getMemPages(state));

  const auth_user = useAuthUser();

  const generateRoutes = () => {
    if (pages_properties.length === 0) {
      return null;
    }
    return [
      ...Object.keys(pages).map((page) => {
        let page_props =
          pages_properties.find((p) => p.component && p.component === page) ??
          {};
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

  const getSettings = async () => {
    let settingsData = getWithTTL(settings_endpoint_uuid);
    if (settingsData != null) {
      dispatch(setSettings(settingsData));
      return;
    }
    const {
      data: { settings },
    } = await restClient(settings_endpoint_uuid);
    const cache_ttl = settings?.find((s) => s.key == "cache_ttl")?.properties
      ?.value;
    setWithTTL(Constants.app_cache_ttl, cache_ttl);
    setWithTTL(settings_endpoint_uuid, settings, cache_ttl);
    dispatch(setSettings(settings));
  };

  const assembleApp = async (dispatch) => {
    if (auth_user != null) {
      setUpNodes(auth_nodes_endpoint_uuid, dispatch);
      return;
    }
    setUpNodes(guest_nodes_endpoint_uuid, dispatch);
    return true;
  };

  const setUpNodes = async (uuid) => {
    let nodesCachedData = getWithTTL(uuid);
    if (nodesCachedData != null) {
      dispatch(setNodes(nodesCachedData));
      return;
    }
    const { data: nodes } = await restClient(uuid);
    dispatch(setNodes(nodes));
    setWithTTL(uuid, nodes, getWithTTL(Constants.app_cache_ttl));
  };

  //   useEffect(() => {
  //     setIsLoading((prev) => true);
  //     getProfile();
  //     setIsLoading((prev) => false);
  //     setIsLoading((prev) => false);
  //   }, [auth_user]);

  useEffect(() => {
    setIsLoading((prev) => true);
    // if (!pages_properties) return;
    setRoutes(generateRoutes());
    getSettings();
    setIsLoading((prev) => false);
  }, [pages_properties]);

  return { getSettings, assembleApp, loading, routes };
}
