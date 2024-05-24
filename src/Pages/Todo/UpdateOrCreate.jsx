import React from "react";
import Link from "../../Laravel _Reimagined_Library/Link";

export default function UpdateOrCreate({ createOrUpdateTodo, setTodo, todo }) {
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="">Todo</label>
            <input
              type="text"
              className="form-control"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="mb-3 text-center">
            <Link
              uuid={"KlZ6jFXhUoWFqvSwhZidC0bi0JsBimzcDUMttuKJiAlXz8QbH5"}
              text="create"
              className={"btn btn-sm btn-primary"}
              onClick={() => createOrUpdateTodo()}
            ></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
