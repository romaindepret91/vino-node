// Npm packages and utilities
import { React, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
// Styles
import "./Form.scss";
// Contexts
import UserContext from "../../context/userContext";

/**
 * Login Component.
 * Renders a div component of class Form.
 *
 * @returns {div} The Login
 */
function Login() {
  // State variables and hooks
  const navigate = useNavigate();
  const { state: stateSignupConfMsg } = useLocation();
  const [setUser] = useContext(UserContext);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [signupSuccessMsg, setSignupSuccesMsg] = useState(
    stateSignupConfMsg || null
  );
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Global variables
  const hostOriginURL = "http://localhost:3000";

  /**
   * Update form data on change of input value
   * @param {object} e Object event type
   */
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  /**
   * Update user password in the db
   * @param {object} identifiants Credentials values
   * @returns {Promise} Promise object represents the user logged in
   */
  const loggingIn = async (credentials) => {
    return await axios.post(`${hostOriginURL}/api/auth`, credentials);
  };

  /**
   * Handle connection on client side. Set user logged in in local storage.
   * @param {object} e Object event type
   */
  function handleLoggingIn(e) {
    e.preventDefault();
    loggingIn(formValues)
      .then((response) => {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        setLoginErrorMsg(error.response.statusText);
      });
  }

  return (
    <div className="Form">
      {loginErrorMsg && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setLoginErrorMsg(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {loginErrorMsg}
        </Alert>
      )}
      {signupSuccessMsg && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                window.history.replaceState({}, "/login");
                setSignupSuccesMsg(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {signupSuccessMsg.success_message}
        </Alert>
      )}
      <h2>CONNEXION</h2>
      <form className="Form" onSubmit={handleLoggingIn}>
        <TextField
          className="textField"
          required
          type="email"
          name="email"
          id="email"
          label="Courriel"
          variant="outlined"
          margin="dense"
          value={formValues.email}
          onChange={handleInputChange}
        >
          Courriel
        </TextField>
        <TextField
          className="textField"
          required
          type="password"
          id="password"
          name="password"
          label="Mot de passe"
          variant="outlined"
          margin="dense"
          value={formValues.password}
          onChange={handleInputChange}
        >
          Mot de passe
        </TextField>
        <Button className="valider" variant="contained" type="submit">
          Valider
        </Button>
        <Link to={"/signup"}>
          Pas encore Membre? <span>Inscrivez-vous ici!</span>
        </Link>
      </form>
    </div>
  );
}

export default Login;
