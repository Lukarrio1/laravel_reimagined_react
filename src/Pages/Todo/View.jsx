import React, { useEffect, useState } from "react";
import UpdateOrCreate from "./UpdateOrCreate";
import Table from "./Table";
import PermissionWrapper from "../../Laravel _Reimagined_Library/PermissionWrapper";
import restClient from "../../Laravel _Reimagined_Library";
import { useParams } from "react-router-dom";

export default function View() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const { id } = useParams();

  const createOrUpdateTodo = async () => {
    const uuidRoute = id
      ? "a64z1IpfUW16CTtWBENRWK2nrQGvEIDgqSYJj51HN6IH7lVgs8"
      : "UhZBSeQhxIh8mT2jo6LXB17ivlXWPBl2EKV5GajbY1Wkcw8nLb";
    try {
      const { data } = await restClient(uuidRoute, { todo: id }, { todo });
      setTodo("");
      getTodos();
      console.log(data);
    } catch (error) {}
  };

  const getTodos = async () => {
    const { data } = await restClient(
      "xwHVVckTJPbdLjcyiPstMLENcByl7NO7NXeLReDJCZsdrliIiS"
    );
    setTodos(data?.todos);
  };

  const deleteTodo = async (TodoId) => {
    const { data } = await restClient(
      "TqgkgClXC1tqgirx0cOJwyiRWrqdWvYyahqR1BztiJEz5KisKB",
      { todo: TodoId }
    );
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (!id) return;
    setTodo(todos?.filter((t) => t?.id == id)[0]?.todo);
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <PermissionWrapper
          uuid={"8KWrRbnno7oTF5BdV1vbfmJhepJTpRZBma3lxt9cJqMoo0XRG8"}
        >
          <div className="col-sm-8 offset-sm-2 mt-2">
            <UpdateOrCreate
              createOrUpdateTodo={createOrUpdateTodo}
              todo={todo}
              setTodo={setTodo}
            ></UpdateOrCreate>
          </div>
        </PermissionWrapper>
        <PermissionWrapper
          uuid={"RLv9Tt9p3KHxBVUuELxsqJBy0QemwzDafPtEvjt0XH9dXMpaYn"}
        >
          <div className="col-sm-8 offset-sm-2 mt-2">
            <Table todos={todos} deleteTodo={deleteTodo}></Table>
          </div>
        </PermissionWrapper>
      </div>
    </div>
  );
}
