import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
  authCheckState,
  logout,
  authLogin,
  authRegister
} from '../../../actions/authentication';

const styles = {
  formSection: {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  FormContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  textField: {
    marginBottom: "15px"
  },
  formContainer: {
    display: "flex",
    padding: "40px",
    background: "#36393f",
    borderRadius: "5px",
    boxSizing: "border-box",
    width: "750px",
    boxShadow: "0 2px 10px 0 rgba(0,0,0,.2)",
    justifyContent: "space-between",
  },
  formContainerContent: {
    flexGrow: "1",
    textAlign: "center"
  },
  inputLabelText: {
    color: "#fff !important",
    fontSize: "18px",
    opacity: "0.6",
    fontSize: "1em",
    marginBottom: "5px",
  },
  inputText: {
    color: "#fff",
    padding: "1px"
  },
  formContainerInfo: {
    marginBottom: "15px",
    "& p": {
      color: "#fff",
      opacity: "0.7"
    }
  },
  h3: {
    color: "#fff",
    fontWeight: "400",
    marginBottom: "8px"
  },
  button: {
    color: "white",
    marginTop: "10px",
    marginBottom: "15px"
  },
  buttonRegister: {
    marginTop: "10px",
    marginBottom: "15px",
    color: "#fff",
    backgroundColor: "#B8C0FF"
  },
  formMotoContainer: {
    flexBasis: "50%",
    "& p": {
      fontSize: "1em",
      color: "#fff"
    }
  },
  formMoto: {
    padding: "0 20px"
  },
  wrapper: {
    width: "1180px",
    margin: "0 auto",
  },
  hr: {
    height: "80%",
    width: "1px",
    backgroundColor: "#575b62",
    alignSelf: "center",
    marginLeft: "50px"
  },
  authenticationOptionText: {
    color: "#767c87",
    fontSize: "14px"
  },
  nextFormBtn: {
    fontWeight: "700",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    marginLeft: "3px",
    color: "#687cc2",
    "&:hover": {
      color: "white",
      cursor: "pointer",
      textDecoration: "underline"
    }
  }
};

class AuthenticationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameLogin: "",
      passwordLogin: "",
      usernameRegister: "",
      emailRegister: "",
      password1Register: "",
      password2Register: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount(){
    this.props.onTryAutoSignin()
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.showLoginForm ? (
      this.props.authLogin(this.state.usernameLogin,this.state.passwordLogin)
    ) : (
      this.props.authRegister(
        this.state.usernameRegister,
        this.state.emailRegister,
        this.state.password1Register,
        this.state.password2Register
      )
    )
    this.clearForm();
  }

  clearForm = e => {
    this.setState({
      usernameLogin: "",
      passwordLogin: "",
      usernameRegister: "",
      emailRegister: "",
      password1Register: "",
      password2Register: ""
    })
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formSection}>

          {

            this.props.showLoginForm ? (
              <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.formContainerContent}>
                  <div className={classes.formContainerInfo}>
                    <h3 className={classes.h3}>
                      Rebonjour !
                    </h3>
                    <p>
                      Heureux de vous revoir
                    </p>
                  </div>
                  <div className={classes.FormContent}>
                    <TextField
                       color="primary"
                       id="standard-error"
                       label="Nom d'utilisateur"
                       name="usernameLogin"
                       onChange={this.handleChange}
                       value={this.state.usernameLogin}
                       InputLabelProps={{
                        className: classes.inputLabelText
                       }}
                       InputProps={{
                         className: classes.inputText
                       }}
                       className={classes.textField}
                    />
                    <TextField
                      color="primary"
                      id="standard-error-helper-text"
                      label="Password"
                      type="password"
                      name="passwordLogin"
                      onChange={this.handleChange}
                      value={this.state.passwordLogin}
                      label="Mot de Passe"
                      InputLabelProps={{
                       className: classes.inputLabelText
                      }}
                      InputProps={{
                        className: classes.inputText
                      }}
                      className={classes.textField}
                    />
                  </div>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="inherit"
                    className={classes.button}
                    onClick={this.handleSubmit}
                  >
                    Se connecter</Button>
                  <p className={classes.authenticationOptionText}>
                    Besoin de créer votre compte ?
                    <span
                      className={classes.nextFormBtn}
                      onClick={this.props.toogleForm}
                    >
                     s'inscrire
                  </span>
                  </p>
                </form>
                <hr className={classes.hr}></hr>
                <div className={classes.formMotoContainer} className={classes.formContainerContent}>
                  <div className={classes.formMoto}>
                    <p>
                      Rejoindre notre équipe ?
                    </p>
                  </div>
                </div>
              </div>
              ) : (
              <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.formContainerContent}>
                  <div className={classes.formContainerInfo}>
                    <h3 className={classes.h3}>
                      Créer un compte
                    </h3>
                  </div>
                  <div className={classes.FormContent}>
                    <TextField
                       color="primary"
                       label="Nom d'utilisateur"
                       name="usernameRegister"
                       onChange={this.handleChange}
                       value={this.state.usernameRegister}
                       InputLabelProps={{
                        className: classes.inputLabelText
                       }}
                       InputProps={{
                         className: classes.inputText
                       }}
                       className={classes.textField}
                    />
                    <TextField
                       color="primary"
                       id="standard-error"
                       label="Email"
                       name="emailRegister"
                       onChange={this.handleChange}
                       value={this.state.emailRegister}
                       InputLabelProps={{
                        className: classes.inputLabelText
                       }}
                       InputProps={{
                         className: classes.inputText
                       }}
                       className={classes.textField}
                    />
                    <TextField
                      color="primary"
                      label="Password"
                      type="password"
                      name="password1Register"
                      onChange={this.handleChange}
                      value={this.state.password1Register}
                      label="Mot de Passe"
                      InputLabelProps={{
                       className: classes.inputLabelText
                      }}
                      InputProps={{
                        className: classes.inputText
                      }}
                      className={classes.textField}
                    />
                    <TextField
                      color="primary"
                      id="standard-error-helper-text"
                      label="Password2"
                      type="password"
                      name="password2Register"
                      onChange={this.handleChange}
                      value={this.state.password2Register}
                      label="Vérification du mot de passe"
                      error={this.state.password1Register !== this.state.password2Register}
                      helperText={(this.state.password1Register !== this.state.password2Register) && this.state.password2Register ? (
                        "Les mots de passent doivent être identiques"
                      ) : ("")}
                      InputLabelProps={{
                       className: classes.inputLabelText
                      }}
                      InputProps={{
                        className: classes.inputText
                      }}
                      className={classes.textField}
                    />
                    <Button
                      variant="outlined"
                      fullWidth
                      color="inherit"
                      className={classes.button}
                      onClick={this.handleSubmit}
                    >
                      Confirmer</Button>
                    <p className={classes.authenticationOptionText}>
                      Déjà un compte ?
                      <span
                        className={classes.nextFormBtn}
                        onClick={this.props.toogleForm}
                      >
                       se connecter
                    </span>
                    </p>
                  </div>
                </form>
              </div>
              )
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.authentication.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(authCheckState()),
    authLogin: (username, password) => dispatch(authLogin(username, password)),
    logout: () => dispatch(logout()),
    authRegister: (username, email, password1, password2) => dispatch(authRegister(username, email, password1, password2))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenticationForm));
