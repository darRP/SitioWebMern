import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo4.png";
export default class Navigation extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "#375e97" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              width="22%"
              style={{ marginLeft: -18 }}
              alt="logo principal"
            />
            &nbsp;&nbsp;NotesApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/create-new.png"
                    width="20%"
                    alt="icono de notas"
                  />
                  &nbsp;Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  <img
                    src="https://img.icons8.com/clouds/100/000000/create-new.png"
                    width="15%"
                    alt="icono de crear icono"
                  />
                  &nbsp; Create Note
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  <img
                    src="https://img.icons8.com/clouds/100/000000/add-user-male.png"
                    width="15%"
                    alt="icono crear usuario"
                  />
                  &nbsp;Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
