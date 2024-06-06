import { Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NoPermission from "../Pages/NoPermission";
import NotFound from "../Pages/NotFound";
import { setSettings } from "./React Base Stores/setting";
import { setNodes } from "./React Base Stores/coreNodes";
import { restClient } from "./restClient";
import auth, { setAuthProperties } from "./React Base Stores/auth";
import Register from "../Pages/Register";
import Layout from "../Components/Layout";

const pages = {
  HomePage: Home,
  NotFound: NotFound,
  LoginPage: Login,
  NoPermission,
  RegisterPage: Register,
};

const generateRoutes = (pages_properties, authUser) => {
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
        // element={
        //   page_props?.hasAccess === true ? (
        //     <Layout
        //       page={{ ...page_props }}
        //       Component={<Component></Component>}
        //     ></Layout>
        //   ) : (
        //     <NoPermission
        //       link_uuid={
        //         authUser != null
        //           ? "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
        //           : "K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"
        //       }
        //     ></NoPermission>
        //   )
        // }
        element={
          <Layout
            page={{ ...page_props }}
            Component={<Component></Component>}
          ></Layout>
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
};

export const setUpNodes = async (uuid, dispatch) => {
  const { data: nodes } = await restClient(uuid);
  dispatch(setNodes(nodes));
};

export { pages, generateRoutes, assembleApp };
