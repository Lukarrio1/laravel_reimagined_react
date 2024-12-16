import { Routes } from "react-router-dom";
import useAssembleApp from "./AMT/Custom Hooks/useAssembleApp";
import useDocumentTitle from "./AMT/Custom Hooks/useDocumentTitle";
import Loading from "./Pages/Components/Loading";

function App() {
  const routes = useAssembleApp();

  useDocumentTitle();

  if (routes == null) return <Loading></Loading>;

  return <Routes>{routes}</Routes>;
}

export default App;
