import React from "react";
import "./horizontalMenu.styles.scss";
import {
  faAddressCard,
  faAngleDoubleRight,
  faBars,
  faShoppingBag,
  faShoppingCart,
  faTimes,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import CartIcon from "../cartIcon/cartIcon.component";
import { withRouter, Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currUser } from "../../redux/user/user.selectors";
import { unsetUser } from "../../redux/user/user.actions";
import { signOutWithGmail } from "../../firebase/firebase.config";

class HorizontalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      checked: false,
    };
  }

  render() {
    let links = { Shop: "/shop", Register: "/register", "Sign in": "/signin" };
    let { show, checked } = this.state;
    let { user, unsetUser, history } = this.props;
    // let { match } = history;
    // console.log(history);
    links = user ? { Shop: "/Shop" } : links;

    return (
      <div className="full-menu">
        <input type="checkbox" id="chk" checked={checked} readOnly></input>
        <label htmlFor="chk" className="menu-icon" hidden={checked}>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              this.setState({ checked: true });
            }}
          ></FontAwesomeIcon>
        </label>

        <label htmlFor="chk" className="close-icon" hidden={!checked}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              this.setState({ checked: false });
            }}
          ></FontAwesomeIcon>
        </label>
        <ul className="horizontal-menu">
          {history.location.pathname === "/checkout" ? null : (
            <li className="item">
              <CartIcon
                onClick={() => {
                  this.setState({ checked: false });
                }}
              ></CartIcon>
            </li>
          )}

          {Object.keys(links).map((obj, idx) => (
            <span key={idx}>
              {/* <Link to={links[obj]} style={{ textDecoration: "none" }}> */}
                <li
                  className={`item ${show ? "show" : ""}`}
                  onClick={() => {
                    if(history.location.pathname!==links[obj])
                        history.push(links[obj])
                    this.setState({ checked: false });
                  }}
                >
                  {obj}
                </li>
              {/* </Link> */}
            </span>
          ))}
          <div className="user" hidden={user ? false : true}>
            <li
              className="item"
              onClick={() => {
                signOutWithGmail()
                  .then(() => {
                    unsetUser();
                  })
                  .catch(() => alert("Something went wrong"));
              }}
            >
              Log out ?
            </li>
            <li>
              Hey, <b>{user ? user.name : ""}</b>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: currUser,
});

const mapDispatchToProps = (dispatch) => ({
  unsetUser: () => dispatch(unsetUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HorizontalMenu));
