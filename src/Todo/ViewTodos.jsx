import React from "react";
import PermissionWrapper from "../Laravel _Reimagined_Library/PermissionWrapper";
import TodosTable from "./TodosTable";
import CreateTodos from "./TodoCreate";
import TodoNav from "./TodoNav";

export default function ViewTodos() {
  return (
    <div>
      <TodoNav></TodoNav>
      {/* <PermissionWrapper
        uuid={"srCHGx99TYxBUL9NqoBndKeHQJzOz6h9rCkp5peXJLKHDripkY"}
        children={<CreateTodos></CreateTodos>}
      ></PermissionWrapper>
      <PermissionWrapper
        uuid={"lQOPc7LgIeRELwEx6lOMSZaXoNUVo9X5LRRDp4DqXBHkA1HiQI"}
        children={<TodosTable></TodosTable>}
      ></PermissionWrapper> */}
    </div>
  );
}
