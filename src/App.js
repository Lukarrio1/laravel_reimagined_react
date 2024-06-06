
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { generateRoutes } from "./Laravel _Reimagined_Library/AppStructure";
import { assembleApp } from "./Laravel _Reimagined_Library/AppStructure";


function App() {
  const [pages_properties, setPagesProperties] = useState([]);
  const [appVersion, setAppVersion] = useState("");
  const [authUser, setUser] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    assembleApp(dispatch);
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      document.title = store.getState().setting?.settings?.app_name;
      setAppVersion(store.getState().setting?.settings?.app_version);
      setPagesProperties(store.getState().coreNodes.pages);
      setUser(store.getState().authentication.user);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {pages_properties.length > 0 &&
            generateRoutes(pages_properties, authUser)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
