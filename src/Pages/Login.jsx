import React, { useEffect, useState } from "react";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";
import Link from "../Laravel _Reimagined_Library/Link";
import restClient from "../Laravel _Reimagined_Library";
import { useDispatch } from "react-redux";

export default function Login() {
  const [error, setError] = useState(null);
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });
  const HomePageLink = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );

  const login = async () => {
    try {
      const { data } = await restClient(
        "xCggjsbTw94JlgbHDsaQ1j77nBKU08EKdSI0OiJPSoS9EFCyH8",
        {},
        { email, password }
      );
      setError(null);
      sessionStorage.setItem("bearerToken", data?.token);
      window.location.href = HomePageLink?.node?.node_route;
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card">
            <div className="card-header text-center h4 bg-white">Login</div>
            <div className="card-body">
              <div className="text-center text-danger">{error}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ password, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ email, password: e.target.value })
                    }
                  />
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
                uuid={"FJisFM6Ur8GMDW5PDjM2lLO9KIzyW9LhRNGLGBwS6vxCI38Q7B"}
                className="btn btn-sm btn-default"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
