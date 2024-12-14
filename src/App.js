import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";

import { BrowserRouter, Routes } from "react-router-dom";
import { generateRoutes } from "./AMT/Abstract/AppStructure";
import { assembleApp } from "./AMT/Abstract/AppStructure";
import Loading from "./Pages/Components/Loading";
import { getMemCurrentPage, getMemPages } from "./AMT/Stores/coreNodes";
import { getMemSettings } from "./AMT/Stores/setting";
import useCache from "./AMT/Custom Hooks/useCache";

function App() {
  const [routes, setRoutes] = useState(null);

  const dispatch = useDispatch();

  const pages_properties = useSelector((state) => getMemPages(state));

  useEffect(() => {
    assembleApp(dispatch);
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const app_name = getMemSettings(store.getState())?.client_app_name?.value;
      const page_name = getMemCurrentPage(store.getState())?.name;
      const extra_data = getMemCurrentPage(store.getState())?.extra_data;
      const title = page_name
        ? `${app_name} | ${page_name} ${
            extra_data ? "(" + extra_data + ")" : ""
          }`
        : "";
      document.title = title;
    });
  }, []);

  useEffect(() => {
    if (!pages_properties) return;
    setRoutes(generateRoutes(pages_properties));
  }, [pages_properties]);

  if (pages_properties == null || routes == null) return <Loading></Loading>;

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
}

export default App;
