import About from "./Pages/About";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NoPermission from "./Pages/NoPermission";
import NotFound from "./Pages/NotFound";
import TodoCreate from "./Todo/TodoCreate";
import TodosTable from "./Todo/TodosTable";
import ViewTodos from "./Todo/ViewTodos";
import view from "./Todo/ViewTodos";

const pages = {
  HomePage: Home,
  AboutPage: About,
  NotFound: NotFound,
  LoginPage: Login,
  NoPermission,
  //   example usage
  TodosTable: TodosTable,
  TodoCreate: TodoCreate,
  TodoUpdate: TodoCreate,
};

export { pages };
