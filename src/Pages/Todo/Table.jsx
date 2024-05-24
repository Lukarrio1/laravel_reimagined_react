import React from "react";
import PermissionWrapper from "../../Laravel _Reimagined_Library/PermissionWrapper";
import Link from "../../Laravel _Reimagined_Library/Link";

export default function Table({ todos, deleteTodo }) {
  return (
    <div className="card">
      <div className="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Todo</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.length > 0 &&
              todos?.map((todo) => {
                return (
                  <tr>
                    <th scope="row">1</th>
                    <td>{todo?.todo}</td>
                    <td>
                      <div className="row text-center">
                        <div className="col-sm-12">
                          <Link
                            uuid={
                              "dJaMYuMldKK7gAOCfkqgpY8VnE0aSB9ytKB2iACzE9OrWXGX9b"
                            }
                            className="btn-sm btn btn-warning"
                            text="edit"
                            id={todo?.id}
                          ></Link>
                          <PermissionWrapper
                            uuid={
                              "Fo4o1zNdhzgyi9tH2D2JtOG9Mi3mmA9sAqMmIPG2hBHVJ0Yphq"
                            }
                          >
                            <button
                              className="btn-sm btn btn-danger"
                              onClick={() => deleteTodo(todo?.id)}
                            >
                              Delete
                            </button>
                          </PermissionWrapper>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
