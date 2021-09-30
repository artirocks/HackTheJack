import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

//style
import 'office-ui-fabric-react/dist/css/fabric.css';

// components
// import Layout from "./layout/Layout";

// pages
import Error from "./pages/error/Error";
import Login from "./pages/auth/LoginForm/Login";
import AccountRequest from "./pages/auth/SignupForm/AccountRequest";
import Home from "./pages/home/Home";
import Faq from "./pages/faq/Faq";
import userDashboard from "./pages/userDashboard/userDashboard";
import flightRegisteration from "./pages/flightRegisteration/flightRegisteration";
import CaptureImage from "./pages/captureImage/captureImage";
// import UserDashboard from "./components/userDashboard/userDashboard";
import CheckIn from "./pages/checkIn/entry/entry"

// context
import { useUserState } from "./context/UserContext";
import faceRec from "./pages/faceRec/faceRec";

export default function App(props) {
  // global
  var { isAuthenticated } = useUserState();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/faq" component={Faq} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={AccountRequest} />
        <Route path="/userdashboard" component={userDashboard} />
        <Route path="/captureimage" component={CaptureImage} />
        <Route path="/entryin" component={CheckIn} />
        <Route path="/securityin" component={CheckIn} />
        <Route path="/gatein" component={CheckIn} />
        <Route path="/flightRegisteration" component={flightRegisteration} />
        <Route path="/facerec" component={faceRec} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/app/dashboard",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}