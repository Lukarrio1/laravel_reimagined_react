import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { generateRoutes } from "./Laravel _Reimagined_Library/Abstract/AppStructure";
import { assembleApp } from "./Laravel _Reimagined_Library/Abstract/AppStructure";
import NotFound from "./Pages/NotFound";

function App() {
  const [pages_properties, setPagesProperties] = useState(null);
  const [app_animation, setAppAnimation] = useState("");
  const [authUser, setUser] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    assembleApp(dispatch);
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      document.title = store.getState().setting?.settings?.app_name?.value;
      setPagesProperties(store.getState().coreNodes.pages);
      setAppAnimation(
        store?.getState()?.setting?.settings?.app_animation?.value
      );
      setUser(store.getState().authentication.user);
    });
  }, []);

  return !pages_properties ? (
    <>
      <div
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "10rem",
            height: "10rem",
            borderWidth: "0.4em",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          {pages_properties.length > 0 &&
            generateRoutes(pages_properties, authUser, app_animation)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
