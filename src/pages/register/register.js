import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../components/customButton/customButton.component";
import CustomTextField from "../../components/customTextField/customTextField.component";
import CustomHeading from "../../components/customHeading/customHeading.component";
import "./register.scss";
import { createUserDoc, auth } from "../../firebase/firebase.config";
import { setUser, toggleSpinner } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import MsgPopup from "../../components/msgPopup/msgPopup.component";
import HandOutGuy from "../../svgAnimations/handoutguy/handoutguy.image";

const Register = (props) => {
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");
  const [showBox, setShowBox] = useState(false);
  let { spinner } = props;

  let initialStateCred = {
    name: "",
    age: "",
    confEmail: "",
    email: "",
    password: "",
    confPassword: "",
  };
  let initialStateErr = {
    name: false,
    age: false,
    confEmail: false,
    email: false,
    password: false,
    confPassword: false,
  };

  const [credentials, setCredentials] = useState(initialStateCred);

  const [errors, setErrors] = useState(initialStateErr);

  const [clicked, setClicked] = useState(initialStateErr);

  const registerUser = async (e) => {
    e.preventDefault();

    for (const err in errors) {
      if (errors[err]) {
        setShowBox(true);
        setMsg("Fix all the errors first");
        setStatus("error");
        return;
      }
    }
    try {
      toggleSpinner();
      const authUserCreated = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = await createUserDoc(authUserCreated.user, credentials);
      setUser(user);
      toggleSpinner();
    } catch (err) {
      toggleSpinner();
      setShowBox(true);
      setMsg(err.message);
      setStatus("error");
    }
  };

  useEffect(() => validations(), [credentials]);

  useEffect(() => {
    return () => {
      if (spinner) {
        toggleSpinner();
      }
    };
  }, []);

  let { setUser, toggleSpinner } = props;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let { name, age, confEmail, email, password, confPassword } = credentials;
  const validations = () => {
    let update = {
      name: false,
      age: false,
      confEmail: false,
      email: false,
      password: false,
      confPassword: false,
    };

    if (name.length === 0) {
      update = { ...update, name: true };
    }
    if (isNaN(age) || age.length === 0) {
      update = { ...update, age: true };
    }
    if (!re.test(email)) {
      update = { ...update, email: true };
    }
    if (confEmail !== email) {
      update = { ...update, confEmail: true };
    }
    if (password.length <= 6) {
      update = { ...update, password: true };
    }
    if (confPassword !== password) {
      update = { ...update, confPassword: true };
    }
    setErrors(update);
  };

  const onChangeHandler = (e) => {
    setClicked({ ...clicked, [e.target.name]: true });
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showBox ? (
        <MsgPopup
          status={status}
          onClick={() => {
            setShowBox(false);
          }}
        >
          {msg}
        </MsgPopup>
      ) : null}
      <div className="register">
        <form className="register-form" onSubmit={registerUser}>
          <CustomHeading>
            New here? Sign up
            <div className="icon">
              <HandOutGuy></HandOutGuy>
            </div>
          </CustomHeading>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto" className="justify-self-right padding">
                <CustomTextField
                  name="name"
                  showError={clicked.name && errors.name}
                  errorMessage="Give me a name and I shall give you an account"
                  onChange={onChangeHandler}
                  value={name}
                />
              </Col>
              <Col md="auto" className="padding">
                <CustomTextField
                  name="age"
                  showError={clicked.age && errors.age}
                  errorMessage="LETTERS SHALL NOT PASS and so does the special characters &#128521;"
                  onChange={onChangeHandler}
                  value={age}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="6" className="padding">
                <CustomTextField
                  name="email"
                  showError={clicked.email && errors.email}
                  errorMessage="You don't write an email like this &#128533;"
                  onChange={onChangeHandler}
                  value={email}
                />
              </Col>
              <Col md="6" className="padding">
                <CustomTextField
                  name="confEmail"
                  showError={clicked.confEmail && errors.confEmail}
                  label="Confirm Email"
                  errorMessage="I worry for you &#128543;"
                  onChange={onChangeHandler}
                  value={confEmail}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto" className="justify-self-right padding">
                <CustomTextField
                  name="password"
                  showError={clicked.password && errors.password}
                  type="password"
                  errorMessage="Too short"
                  onChange={onChangeHandler}
                  value={password}
                />
              </Col>
              <Col md="auto" className="padding">
                <CustomTextField
                  name="confPassword"
                  showError={clicked.confPassword && errors.confPassword}
                  type="password"
                  label="Confirm Password"
                  errorMessage="Forgot already? &#x1F616;"
                  onChange={onChangeHandler}
                  value={confPassword}
                />
              </Col>
            </Row>
          </Container>
          <div className="center">
            <CustomButton
              type="btnup large padding"
              onClick={(e) => registerUser(e)}
            >
              Sign up
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { spinner } }) => ({
  spinner,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSpinner: () => dispatch(toggleSpinner()),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(Register);
