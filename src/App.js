import PropTypes from 'prop-types'
import React from "react"

import { BrowserRouter , Switch } from "react-router-dom"


import { userRoutes, authRoutes } from "./routes/allRoutes"
import Authmiddleware from "./routes/middleware/Authmiddleware"

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";


const App = props => {
  return (
    <BrowserRouter>
    {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" /> */}
      <Switch>
        {authRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            layout={AuthLayout}
            component={route.component}
            key={idx}
            isAuthProtected={false}
          />
        ))}

        {userRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            layout={AdminLayout}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            exact
          />
        ))}
       
      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

export default App
