import { useEffect } from "react";
import { store } from "./store/store";

import { Routes } from "react-router-dom";
import useAssembleApp from "./AMT/Custom Hooks/useAssembleApp";
import { getMemCurrentPage } from "./AMT/Stores/coreNodes";
import { getMemSettings } from "./AMT/Stores/setting";
import Loading from "./Pages/Components/Loading";

function App() {
  const routes = useAssembleApp();
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

  if (routes == null) return <Loading></Loading>;

  return <Routes>{routes}</Routes>;
}

export default App;
