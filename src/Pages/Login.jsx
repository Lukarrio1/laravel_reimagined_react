import React, { useEffect } from "react";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";

export default function Login() {
  const HomePage = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );

  useEffect(() => {}, []);

  return (
    <div
      onClick={() => {
        HomePage.setNavProperties({ ready: true });
      }}
    >
      This is the login Page
    </div>
  );
}
