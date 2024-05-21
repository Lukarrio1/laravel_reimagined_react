import React, { useState } from "react";
import TodoNav from "./TodoNav";
import PermissionWrapper from "../Laravel _Reimagined_Library/PermissionWrapper";
import restClient from "../Laravel _Reimagined_Library";
import {
  Navigate,
  unstable_HistoryRouter,
  useLocation,
  useParams,
} from "react-router-dom";

export default function TodoCreate() {
  const [todo, setTodo] = useState("");
  const params = useParams();
  const createOrUpdateTodo = async (e) => {
    e.preventDefault();
    const { data } = restClient(
      "3NzKVDTa8Q2sNaALUsB4vF62a1y6OyqiDZTZfrwc6mxKjobFe4",
      {},
      { todo, id: params?.id }
    );
    // window.location.href = "/todos";
  };
  return (
    <div>
      <TodoNav></TodoNav>
      <div className="row">
        <PermissionWrapper
          uuid={"dZKqSNnwUOlT7IpfNcz2G75jU8nQLKR9SwrV7ZeCg3r1Ab6pp0"}
          children={
            <div className="col-sm-8 offset-sm-2">
              <div className="card mt-3">
                <div className="card-header text-center h4 bg-white">
                  Create Todo
                </div>
                <div className="card-body">
                  <form onSubmit={createOrUpdateTodo}>
                    <label htmlFor="" className="form-label">
                      Todo :
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                    ></input>
                    <div className="text-center mt-2">
                      <button type="submit" className="btn btn-primary btn-sm">
                        save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          }
        ></PermissionWrapper>
      </div>
    </div>
  );
}
