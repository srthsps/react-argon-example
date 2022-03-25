import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Cookies from "js-cookie";

const token = Cookies.get('token');
console.log("this is token",token)
const Authmiddleware = ({isAuthProtected}) => {
  return isAuthProtected && token ? (
    <Route render={(props) => <AdminLayout {...props} />} />
  ) : (
    <Route render={(props) => <AuthLayout {...props} />} />
  );
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
