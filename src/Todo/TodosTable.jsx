import React, { useEffect, useState } from "react";
import TodoNav from "./TodoNav";
import restClient from "../Laravel _Reimagined_Library";
import Link from "../Laravel _Reimagined_Library/Link";
import PermissionWrapper from "../Laravel _Reimagined_Library/PermissionWrapper";

export default function TodosTable() {
  const [todos, setTodos] = useState([]);

  const getAllTodos = async () => {
    try {
      const { data } = await restClient(
        "Gue1I575o3RVZJ1wv1hpYATmUfe4TbpkLvTZDV6pAUzLgr1CHq"
      );
      setTodos(data?.todos);
    } catch (error) {}
  };

  const removeTodo = async (id) => {
    const { data } = await restClient(
      "YnNDC58kOVJspGza6yeQQBUYJBaYfDLU6HtmK5T1SJIon43v9P",
      { id }
    );
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      <TodoNav></TodoNav>
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-header h4 bg-white">All Todos</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Todo</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todos &&
                    todos?.map((todo) => (
                      <tr>
                        <th scope="row">{todo?.id}</th>
                        <th scope="col">Todo</th>
                        <th scope="col">
                          <Link
                            uuid={
                              "GYfyvYqigqkMv9Secn35zWPSr7naeaJBcdbg3bAIvmu92N8wKv"
                            }
                            className="btn btn-sm btn-warning"
                            todo={todo?.id}
                          ></Link>
                          <PermissionWrapper
                            uuid={
                              "29tNRLMm5ziP7vAIf76AoVnBfKJVWfOHAHuzSNIORN1bMLv46g"
                            }
                            children={
                              <button
                                onClick={() => removeTodo(todo?.id)}
                                className="m-1 btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                            }
                          ></PermissionWrapper>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
