import logo from "./logo.svg";
import "./App.css";
import { restClient } from "./Laravel _Reimagined_Library/restClient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNodes } from "./Laravel _Reimagined_Library/React Base Stores/coreNodes";
import { setSettings } from "./Laravel _Reimagined_Library/React Base Stores/setting";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { generateRoutes } from "./Laravel _Reimagined_Library/AppStructure";
import { assembleApp } from "./Laravel _Reimagined_Library/AppStructure";
import Footer from "./Pages/Footer";

// sessionStorage.setItem(
//   "bearerToken",
//   "2|Zx6vbBd9rSB3x2ZN7WvFAFEKupQTxczKMqHhtCP18ff82e97"
// );

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
      <Footer version={appVersion} />
    </>
  );
}

export default App;
