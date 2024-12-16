import { Routes } from "react-router-dom";
import useAssembleApp from "./AMT/Custom Hooks/useAssembleApp";
import Loading from "./Pages/Components/Loading";

function App() {
  const routes = useAssembleApp();

  if (routes == null) return <Loading></Loading>;

  return <Routes>{routes}</Routes>;
}

export default App;
