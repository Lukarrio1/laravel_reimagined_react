import React, { useState } from "react";
import Link from "../Laravel _Reimagined_Library/Link";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";
import useRest from "../Laravel _Reimagined_Library/useRest";

export default function Register() {
  const [error, setError] = useState(null);
  const HomePageLink = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );
  const [creds, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });
  const { restClient } = useRest();

  const register = async () => {
    try {
      const { data } = await restClient(
        "AdhmjMGkWcgYO9VvTACKum8h1BsYSP1btLfBVajD52KupkOlbC",
        {},
        { ...creds }
      );
      sessionStorage.setItem("bearerToken", data?.token);
      window.location.href = HomePageLink?.node?.node_route;
    } catch (error) {
      setError(error?.response?.data?.errors);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card">
            <div className="card-header text-center h4 bg-white">Register</div>
            <div className="card-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  register();
                }}
              >
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, name: e.target.value })
                    }
                  />
                  {error && error["name"] && (
                    <div className="text-left">
                      {error["name"]?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, email: e.target.value })
                    }
                  />
                  {error && error["email"] && (
                    <div className="text-left">
                      {error["email"]?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, password: e.target.value })
                    }
                  />
                  {error && error["password"] && (
                    <div className="text-left">
                      {error["password"]?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({
                        ...creds,
                        confirm_password: e.target.value,
                      })
                    }
                  />
                  {error && error["confirm_password"] && (
                    <div className="text-left">
                      {error["confirm_password"]?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer h5 bg-white">
              or{" "}
              <Link
                uuid={"K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"}
                className="btn btn-sm btn-default"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
