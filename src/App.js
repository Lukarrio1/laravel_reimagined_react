import logo from "./logo.svg";
import "./App.css";
import { restClient } from "./Laravel Reimagined Library/restClient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNodes } from "./store/coreNodes";
import { setSettings } from "./store/setting";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Router,
  useParams,
} from "react-router-dom";
import Home from "./Pages/Home";
import { pages } from "./AppStructure";
import { setAuthProperties } from "./store/auth";
import Login from "./Pages/Login";
sessionStorage.setItem(
  "bearerToken",
  "2|jAdtGx3kHvNiPsPeQ3W96kymTb2VCnryVfQYkTtv1a753bc6"
);

function App() {
  const [pages_properties, setPagesProperties] = useState([]);
  const [permisions, setPermisions] = useState(null);
  const [authUser, setUser] = useState(-1);

  const dispatch = useDispatch();

  const assembleApp = async () => {
    let uuid = "";
    try {
      const {
        data: { user },
      } = await restClient(
        "kZ5ZSVmv6BWUYWbPI0is2N3kiy6agWIm4fZw4LUBUbx2xi2Reo"
      );
      uuid = user
        ? "QGXWjhKGG4odx9O6zOcy7MSKyjYO3KW9nw9orosCQD6vEEHMnk"
        : "8rHTiiM6KcJrpiidNm6DZLIxHMutYPghSA6llyDcz2IyraxvyS";
      dispatch(setAuthProperties(user));
    } catch (error) {}
    const { data: nodes } = await restClient(uuid);
    const {
      data: { settings },
    } = await restClient("xBULrpJXyMrElSIu6OhIlizi3WwrQnQTm7x6RloTyg4QzmOE3p");

    dispatch(setNodes(nodes));
    dispatch(setSettings(settings));
  };

  useEffect(() => {
    assembleApp();
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      document.title = store.getState().setting?.settings?.app_name;
      setPagesProperties(store.getState().coreNodes.pages);
      setPermisions(store.getState().authentication.permissions);
      setUser(store.getState().authentication.user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {pages_properties.length > 0 &&
          Object.keys(pages).map((page) => {
            let page_props = pages_properties.filter(
              (p) => p.component == page
            )[0];
            page_props = page_props ? page_props : {};
            const path = page_props?.path ? page_props.path : "/";
            const Component =
              pages[
                page_props &&
                page_props?.hasAccess == true &&
                page_props.component
                  ? page_props.component
                  : "NoPermission"
              ];
            return (
              <Route
                path={path}
                state={page}
                element={
                  authUser != -1 &&
                  [1, 2].includes(page_props?.isAuthenticated) ? (
                    <Component></Component>
                  ) : (
                    <Login></Login>
                  )
                }
              ></Route>
            );
          })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
