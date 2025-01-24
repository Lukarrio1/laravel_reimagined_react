import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Loading from "../../Pages/Components/Loading";
import NotFound from "../../Pages/NotFound";
import { Constants } from "../Abstract/Constants";
import {
  checkLocalStorageUsage,
  getWithTTL,
  setWithTTL,
} from "../Abstract/localStorage";
import { pages } from "../Abstract/PagesAndLayouts";
import { restClient } from "../Abstract/restClient";
import { setAuthProperties } from "../Stores/auth";
import { getMemPages, setNodes } from "../Stores/coreNodes";
import { setSettings } from "../Stores/setting";
import LayoutWrapper from "../Wrappers/LayoutWrapper";
import RedirectWrapper from "../Wrappers/RedirectWrapper";
import useAuthUser from "./useAuthUser";
import useDocumentTitle from "./useDocumentTitle";
import useMonitorCache from "./useMonitorCache";

const {
  uuids: {
    user_uuids: { profile_endpoint_uuid },
    system_uuids: { monitor_endpoint_uuid, settings_endpoint_uuid },
    auth_uuids: { auth_nodes_endpoint_uuid, guest_nodes_endpoint_uuid },
  },
} = Constants;

export default function useAssembleApp() {
  const dispatch = useDispatch();
  const [routes, setRoutes] = useState(null);

  const pages_properties = useSelector((state) => getMemPages(state));

  const getUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await restClient(profile_endpoint_uuid);
      dispatch(setAuthProperties(user));
      return true;
    } catch (error) {
      return false;
    }
  };

  const setUpNodes = async (uuid, dispatch) => {
    let nodesCachedData = getWithTTL(uuid);
    if (!nodesCachedData) {
      const { data: nodes } = await restClient(uuid);
      dispatch(setNodes(nodes));
      setWithTTL(uuid, nodes, getWithTTL(Constants.app_cache_ttl));
    } else {
      dispatch(setNodes(nodesCachedData));
    }
    getAppSettings(dispatch);
  };

  const getAppSettings = async (dispatch) => {
    let settingsData = getWithTTL(settings_endpoint_uuid);
    if (settingsData != null) {
      dispatch(setSettings(settingsData));
      return;
    }
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
  };

  const generateRoutes = () => {
    if (!pages_properties || pages_properties.length === 0) {
      return null;
    }
    const routes = pages_properties.map((page_props) => {
      const path = page_props.path || "/";
      const Component = pages[page_props.component] || NotFound;
      return (
        <Route
          key={path}
          path={path}
          element={
            <RedirectWrapper page={page_props}>
              <LayoutWrapper
                page={page_props}
                Component={
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                }
              />
            </RedirectWrapper>
          }
        />
      );
    });
    routes.push(<Route path="*" element={<NotFound />} key="not-found" />);
    return routes;
  };

  const assembleApp = async (isAuthValid = false, callback = () => null) => {
    callback();
    if ((await getUserProfile()) == true) {
      setUpNodes(auth_nodes_endpoint_uuid, dispatch);
    } else setUpNodes(guest_nodes_endpoint_uuid, dispatch);
    return true;
  };

  const user = useAuthUser();

  useEffect(() => {
    if (user) return;
    assembleApp();
  }, [user]);

  useEffect(() => {
    if (!pages_properties) return;
    setRoutes((prev) => generateRoutes());
    checkLocalStorageUsage();
  }, [pages_properties]);

  useDocumentTitle();
  useMonitorCache();

  return routes;
}
