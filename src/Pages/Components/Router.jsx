import React from "react";
import { Route } from "react-router-dom";

export const Router = ({ path, component, ...rest }) => (
  <Route {...rest} path={path} Component={component}></Route>
);
