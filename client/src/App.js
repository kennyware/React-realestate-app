import React, { Fragment, useEffect } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import ListHomes from "./components/pages/ListHomes";
import ViewHome from "./components/pages/ViewHome";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopBtn from "./components/misc/ScrollToTopBtn";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { checkUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";

library.add(fas, far);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(checkUser());
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      console.log(e.target);
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Fragment>
            <ScrollToTopBtn />
            <Navbar />
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/homes" component={ListHomes} />
              <Route exact path="/home/:id" component={ViewHome} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </ScrollToTop>
      </Router>
    </Provider>
  );
};

export default App;
