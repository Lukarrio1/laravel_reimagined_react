import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "./store/store";

import { BrowserRouter, Routes } from "react-router-dom";
import { generateRoutes, monitorCache } from "./AMT/Abstract/AppStructure";
import { assembleApp } from "./AMT/Abstract/AppStructure";
import Loading from "./Pages/Components/Loading";
import { getMemCurrentPage, getMemPages } from "./AMT/Stores/coreNodes";
import { getMemSettings } from "./AMT/Stores/setting";

function App() {
  const [pages_properties, setPagesProperties] = useState(null);
  const [routes, setRoutes] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.title = "";
    assembleApp(dispatch);
    const interval = setInterval(() => monitorCache(), 30000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    store.subscribe(() => {
      setPagesProperties(getMemPages(store.getState()));
      const app_name = getMemSettings(store.getState())?.client_app_name?.value;
      const page_name = getMemCurrentPage(store.getState())?.name;
      const title = page_name ? `${app_name} | ${page_name}` : "";
      document.title = title;
    });
  }, []);

  useLayoutEffect(() => {
    if (!pages_properties) return;
    setRoutes(generateRoutes(pages_properties));
  }, [pages_properties]);

  return pages_properties == null ? (
    <Loading></Loading>
  ) : routes == null ? (
    <Loading></Loading>
  ) : (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
