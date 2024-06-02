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
    const Component = pages[page_props.component ?? "LoginPage"];

    return (
      <Route
        key={path}
        path={path}
        element={
          page_props?.hasAccess === true ? (
            <Layout Component={<Component></Component>}></Layout>
          ) : (
            <NoPermission
              link_uuid={
                authUser != null
                  ? "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
                  : "K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"
              }
            ></NoPermission>
          )
        }
      />
    );
  });
};

const assembleApp = async (dispatch) => {
  let uuid = "8rHTiiM6KcJrpiidNm6DZLIxHMutYPghSA6llyDcz2IyraxvyS";
  try {
    const {
      data: { user },
    } = await restClient("kZ5ZSVmv6BWUYWbPI0is2N3kiy6agWIm4fZw4LUBUbx2xi2Reo");
    uuid = "QGXWjhKGG4odx9O6zOcy7MSKyjYO3KW9nw9orosCQD6vEEHMnk";
    dispatch(setAuthProperties(user));
  } catch (error) {}

  const { data: nodes } = await restClient(uuid);
  dispatch(setNodes(nodes));

  const {
    data: { settings },
  } = await restClient("xBULrpJXyMrElSIu6OhIlizi3WwrQnQTm7x6RloTyg4QzmOE3p");
  dispatch(setSettings(settings));
};

export { pages, generateRoutes, assembleApp };
