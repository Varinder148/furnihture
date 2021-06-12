import React from "react";
import CustomTextField from "../../components/customTextField/customTextField.component";
import CustomButton from "../../components/customButton/customButton.component";
import { setUser, toggleSpinner } from "../../redux/user/user.actions";
import "./signIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  auth,
  firestore,
  signInWithGmail,
} from "../../firebase/firebase.config";
import CustomHeading from "../../components/customHeading/customHeading.component";
import MsgPopup from "../../components/msgPopup/msgPopup.component";
import { withRouter } from "react-router-dom";

class SignIn extends React.Component {
  unsubscribe = null;

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showError: {
        email: false,
        password: false,
      },
      showMsgBox: false,
      msg: "",
      status: "",
    };
  }

  validations = (e) => {
    let tag = e.target;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let { email, password, showError } = this.state;
    let errors = { ...showError };
    if (tag.name === "email" && re.test(email.toLocaleLowerCase())) {
      errors = { ...errors, email: false };
    } else if (tag.name === "email") {
      errors = { ...errors, email: true };
    }
    if (tag.name === "password" && password.length < 5) {
      errors = { ...errors, password: true };
    } else if (tag.name === "password") {
      errors = { ...errors, password: false };
    }
    this.setState({ showError: errors });
  };

  onChangeHandler = (event) => {
    this.validations(event);
    let tag = event.target;
    this.setState({ [tag.name]: tag.value });
  };

  signIn = async (e) => {
    e.preventDefault();
    let { email, password, showError } = this.state;

    if (!showError.email && !showError.password && email.length > 0) {
      this.props.toggleSpinner();
      try {
        let res = await auth.signInWithEmailAndPassword(email, password);

        let user = null;
        let uid = res.user.uid;
        this.unsubscribe = firestore
          .collection("users")
          .where("uid", "==", uid)
          .onSnapshot((snapshot) => {
            user = snapshot.docs.map((doc) => doc.data());
            this.props.setUser(user[0]);
            this.props.toggleSpinner();

            this.props.history.push("/homepage");
          });
      } catch (err) {
        this.setState({
          showError: {
            email: false,
            password: true,
          },
        });
        this.props.toggleSpinner();

        this.setState({
          msg: err.message,
          showMsgBox: true,
          status: "error",
          password: "",
        });
      }
    } else {
      this.setState({
        showError: {
          email: true,
          password: true,
        },
      });
    }
  };

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.props.spinner) {
      toggleSpinner();
    }
  }

  render() {
    let { email, password, showError, showMsgBox, msg, status } = this.state;
    let { setUser, history } = this.props;
    return (
      <>
        {showMsgBox ? (
          <MsgPopup
            status={status}
            onClick={() => {
              this.setState({ showMsgBox: false });
            }}
          >
            {msg}
          </MsgPopup>
        ) : null}
        <div className="signin">
          <div className="title">
            <FontAwesomeIcon icon={faIdCard} size="3x"></FontAwesomeIcon>
            <CustomHeading>
              Email and Password,
              <br /> You must Enter
            </CustomHeading>
          </div>

          <form className="form">
            <CustomTextField
              type="email"
              name="email"
              showError={showError.email}
              errorMessage={"You don't write an email like that."}
              onChange={this.onChangeHandler}
              value={email}
            ></CustomTextField>
            <CustomTextField
              type="password"
              name="password"
              showError={showError.password}
              errorMessage={"You call this a password?"}
              onChange={this.onChangeHandler}
              value={password}
            ></CustomTextField>

            <div className="clump-together">
              <CustomButton type="cus-btn large btndown" onClick={this.signIn}>
                SIGN IN
              </CustomButton>

              <CustomButton
                type="cus-btn large btndown"
                variant="reverse"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = null;
                  try {
                    res = await signInWithGmail();
                  } catch {
                    this.setState({
                      showMsgBox: true,
                      status: "error",
                      msg: "Something went wrong. Please try again.",
                    });
                    return;
                  }
                  const profileInfo = res.additionalUserInfo.profile;
                  setUser(profileInfo);
                  history.push("/homepage");
                }}
              >
                SIGN IN WITH GOOGLE
              </CustomButton>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  toggleSpinner: () => dispatch(toggleSpinner()),
});

const mapStateToProps = ({ user: { spinner } }) => ({
  spinner,
});
export default connect(null, mapDispatchToProps)(withRouter(SignIn));
