import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginForm from "./components/LoginForm";
import Layout from "./layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

type Props = {};

type State = {};

export default class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Layout>
    );
  }
}
