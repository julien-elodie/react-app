import React from "react";

export default class nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse navbar-expand-md">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler hidden-lg-up px-2"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div
            className="img-menu"
            style={{
              background: `url(${require("../img/menu.png")})`
            }}
          />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div
                className="dropdown-menu bg-inverse"
                aria-labelledby="dropdownId"
              >
                <a className="dropdown-item bg-inverse" href="#">
                  Action 1
                </a>
                <a className="dropdown-item bg-inverse" href="#">
                  Action 2
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-0">
            <input
              className="form-control col-sm-9"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 col-sm-3"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
