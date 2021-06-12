import "./App.css";
import Homepage from "./pages/homepage/homepage";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/navbar/navbar.component";
import SignIn from "./pages/signIn/signIn";
import Register from "./pages/register/register";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Shop from "./pages/shop/shop";
import Checkout from "./pages/checkout/checkout";
import Spinner from "./components/spinner/spinner.component";
import { connect } from "react-redux";

const App = ({ spinner, toggleSpinner, currUser }) => {
  return (
    <>
      <div className={`App ${spinner ? "hide-overflow" : ""}`}>
        {spinner ? <Spinner /> : ""}

        <Navbar type="orange"></Navbar>

        <div className="content">
          <Switch>
            <Route
              exact
              path="/signin"
              render={() =>
                currUser ? <Redirect to="/homepage" /> : <SignIn />
              }
            />
            <Route exact path="/homepage" component={Homepage} />
            <Route
              exact
              path="/register"
              render={() =>
                currUser ? <Redirect to="/homepage" /> : <Register />
              }
            />
            <Route exact path="/shop/:type" component={Shop} />
            <Route path="/shop" component={Shop} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { spinner, currUser } }) => ({
  spinner,
  currUser,
});
export default connect(mapStateToProps, null)(withRouter(App));
