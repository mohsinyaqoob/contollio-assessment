import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type Props = {};

type State = {};

export default class LoginForm extends Component<Props, State> {
  state = {
    buttonDisabled: true,
  };

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="login-form-container">
          <form action="#" autoComplete="off">
            <div className="login-form-header">
              <h2>Login to Contollio</h2>
              <p>
                Greetings! Welcome to Contollio. Please log in to continue to
                your dashboard
              </p>
            </div>
            <div className="login-form-body">
              <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" />
              </div>
            </div>
            <div className="login-form-footer">
              <div className="form-control">
                <input type="button" value="Sign In" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
