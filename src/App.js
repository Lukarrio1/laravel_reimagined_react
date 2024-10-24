import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "./store/store";

import { BrowserRouter, Routes } from "react-router-dom";
import { generateRoutes, monitorCache } from "./AMT/Abstract/AppStructure";
import { assembleApp } from "./AMT/Abstract/AppStructure";
import Loading from "./Pages/Components/Loading";

function App() {
  const [pages_properties, setPagesProperties] = useState(null);
  const [routes, setRoutes] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Loading ...";
    assembleApp(dispatch);
    const interval = setInterval(() => monitorCache(), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      document.title =
        store.getState().setting?.settings?.client_app_name?.value ?? "";
      setPagesProperties(store.getState().coreNodes.pages);
    });
  }, []);

  useEffect(() => {
    if (!pages_properties) return;
    setRoutes(generateRoutes(pages_properties));
  }, [pages_properties]);

  return pages_properties == null ? (
    <Loading></Loading>
  ) : routes == null ? (
    <Loading
      textElement={
        <div
          className="h1 text-center mt-5 text-bold"
          style={{ fontSize: "100px" }}
        >
          <span className="dots"></span>
        </div>
      }
    ></Loading>
  ) : (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
