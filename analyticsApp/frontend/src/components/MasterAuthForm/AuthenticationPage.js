import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { CSSTransition } from 'react-transition-group';
import AuthenticationForm from './AuthenticationForm/AuthenticationForm';
import './AuthenticationPageTransition.css';

const styles = {
  LoginPage: {
    backgroundColor: "#354555",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Noto Sans', sans-serif"
  },
  LoginPageLogoHeader: {
    height: "90px",
    display: "flex",
    alignItems: "center"
  },
};

class LoginPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      showLoginForm: true
    };
    this.handleToogleForm = this.handleToogleForm.bind(this);
  }

  handleToogleForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    });
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.LoginPage}>
        <div className={classes.wrapper}>
          <div className={classes.LoginPageLogoHeader}>
            <span>Logo goes here</span>
            <CSSTransition
              in={this.state.showLoginForm}
              appear={true}
              timeout={1200}
              classNames="alert"
            >
              <AuthenticationForm
                showLoginForm={this.state.showLoginForm}
                toogleForm={this.handleToogleForm}
              />
            </CSSTransition>
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
