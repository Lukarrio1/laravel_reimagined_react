// import { Route } from "react-router-dom";

// import { setNodes } from "../Stores/coreNodes";
// import { restClient } from "./restClient";
// import { setAuthProperties } from "../Stores/auth";
// import { Suspense, useEffect } from "react";
// import Loading from "../../Pages/Components/Loading";
// import { pages } from "./PagesAndLayouts";
// import LayoutWrapper from "../Wrappers/LayoutWrapper";
// import RedirectWrapper from "../Wrappers/RedirectWrapper";
// import { getWithTTL, setWithTTL } from "./localStorage";
// import { Constants } from "./Constants";
// import { setSettings } from "../Stores/setting";
// import NotFound from "../../Pages/NotFound";

// const {
//   uuids: {
//     user_uuids: { profile_endpoint_uuid },
//     system_uuids: { monitor_endpoint_uuid, settings_endpoint_uuid },
//     auth_uuids: { auth_nodes_endpoint_uuid, guest_nodes_endpoint_uuid },
//   },
// } = Constants;

// const generateRoutes = (pages_properties) => {
//   if (!pages_properties || pages_properties.length === 0) {
//     return null;
//   }
//   const routes = pages_properties.map((page_props) => {
//     const path = page_props.path || "/";
//     const Component = pages[page_props.component] || NotFound;
//     return (
//       <Route
//         key={path}
//         path={path}
//         element={
//           <RedirectWrapper page={page_props}>
//             <LayoutWrapper
//               page={page_props}
//               Component={
//                 <Suspense fallback={<Loading />}>
//                   <Component />
//                 </Suspense>
//               }
//             />
//           </RedirectWrapper>
//         }
//       />
//     );
//   });
//   routes.push(<Route path="*" element={<NotFound />} key="not-found" />);
//   return routes;
// };

// const assembleApp = async (
//   dispatch,
//   isAuthValid = false,
//   callback = () => null
// ) => {
//   callback();
//   if ((await getUserProfile(dispatch)) == true) {
//     setUpNodes(auth_nodes_endpoint_uuid, dispatch);
//   } else setUpNodes(guest_nodes_endpoint_uuid, dispatch);
//   return true;
// };

// const getUserProfile = async (dispatch) => {
//   try {
//     const {
//       data: { user },
//     } = await restClient(profile_endpoint_uuid);
//     dispatch(setAuthProperties(user));
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export const getAppSettings = async (dispatch) => {
//   let settingsData = getWithTTL(settings_endpoint_uuid);
//   if (settingsData != null) {
//     dispatch(setSettings(settingsData));
//     return;
//   }
//   const {
//     data: { settings },
//   } = await restClient(settings_endpoint_uuid);
//   settingsData = settings;
//   setWithTTL(
//     Constants.app_cache_ttl,
//     settingsData?.find((s) => s.key == "cache_ttl")?.properties?.value
//   );
//   setWithTTL(
//     settings_endpoint_uuid,
//     settings,
//     getWithTTL(Constants.app_cache_ttl)
//   );
//   dispatch(setSettings(settings));
// };

// export const setUpNodes = async (uuid, dispatch) => {
//   let nodesCachedData = getWithTTL(uuid);
//   if (!nodesCachedData) {
//     const { data: nodes } = await restClient(uuid);
//     dispatch(setNodes(nodes));
//     setWithTTL(uuid, nodes, getWithTTL(Constants.app_cache_ttl));
//   } else {
//     dispatch(setNodes(nodesCachedData));
//   }
//   getAppSettings(dispatch);
// };

// export { pages, generateRoutes, assembleApp };
