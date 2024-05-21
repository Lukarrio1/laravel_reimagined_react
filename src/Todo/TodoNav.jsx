import React from "react";
import Link from "../Laravel _Reimagined_Library/Link";

export default function TodoNav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            uuid={"nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"}
            className={"navbar-brand"}
          ></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={"nav-link active mt-2"}
                  uuid={"Hl835VqYBxkJ5PQxWWLwaW2MCawbQm14CNVugpibxRtUIf03u9"}
                ></Link>
              </li>
              <li className="nav-item">
                <Link
                  className={"nav-link active mt-2"}
                  uuid={"fuYwssOQVpr3sgiBBrQsfVwskaLKkzphsnRH3kR4D3GGEjhXEP"}
                ></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
