import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { runInThisContext } from "vm";
import "./index.scss";

export default class LoginForm extends Component<any, { [key: string]: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirect: false,
    };
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.setState({ redirect: true });
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-form-wrapper">
        <div className="login-form-container">
          <form action="#" autoComplete="off" onSubmit={this.handleSubmit}>
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
                <input
                  value={username}
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  type="text"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="login-form-footer">
              <div className="form-control">
                <input
                  type="submit"
                  value="Sign In"
                  disabled={username && password ? false : true}
                />
              </div>
            </div>
          </form>
        </div>
        {this.state.redirect && <Navigate to="/dashboard" replace={true} />}
      </div>
    );
  }
}
