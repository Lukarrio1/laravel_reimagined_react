import { Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NoPermission from "../Pages/NoPermission";
import NotFound from "../Pages/NotFound";
import { setSettings } from "./React Base Stores/setting";
import { setNodes } from "./React Base Stores/coreNodes";
import { restClient } from "./restClient";
import { setAuthProperties } from "./React Base Stores/auth";
import View from "../Pages/Todo/View";

const pages = {
  HomePage: Home,
  NotFound: NotFound,
  LoginPage: Login,
  NoPermission,
  // todo edit happens on the same page as Todos
  Todos: View,
  EditTodo: View,
};

const generateRoutes = (pages_properties, pages, authUser) => {
  if (pages_properties.length === 0) {
    return null;
  }

  return Object.keys(pages).map((page) => {
    let page_props = pages_properties.filter(
      (p) => p.component && p.component === page
    )[0];
    page_props = page_props ? page_props : {};
    const path = page_props?.path ? page_props.path : "/";
    const Component =
      pages[
        page_props && page_props?.hasAccess === true && page_props.component
          ? page_props.component
          : "NoPermission"
      ];

    return (
      <Route
        key={path} // Add a key prop for better list handling
        path={path}
        element={
          authUser !== -1 && [1, 2].includes(page_props?.isAuthenticated) ? (
            <Component />
          ) : (
            <Login />
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
