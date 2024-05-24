import React from "react";
import Link from "../Laravel _Reimagined_Library/Link";
import { useParams } from "react-router-dom";

export default function Home() {
  const params = useParams();
  return (
    <div>
      This is the home page, greeting: {params?.greeting} <br />
      <Link
        uuid={"K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"}
        text="Login page"
      ></Link>
    </div>
  );
}
