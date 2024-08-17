import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { generateRoutes } from "./Laravel _Reimagined_Library/Abstract/AppStructure";
import { assembleApp } from "./Laravel _Reimagined_Library/Abstract/AppStructure";
import NotFound from "./Pages/NotFound";
import Loading from "./Pages/Components/Loading";

function App() {
  const [pages_properties, setPagesProperties] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [search_skip_word, setSearchSkipWord] = useState();
  const [authUser, setUser] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    assembleApp(dispatch);
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      document.title = store.getState().setting?.settings?.app_name?.value;
      setPagesProperties(store.getState().coreNodes.pages);
      setUser(store.getState().authentication.user);
      setSearchSkipWord(
        store.getState().setting?.settings?.search_skip_word?.value
      );
    });
  }, []);

  useEffect(() => {
    if (!pages_properties) return;
    setRoutes(generateRoutes(pages_properties, search_skip_word));
  }, [pages_properties]);

  return pages_properties == null ? (
    <Loading></Loading>
  ) : routes == null ? (
    <Loading
      textElement={
        <div className="h3">Processing the app structure, please wait ...</div>
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
