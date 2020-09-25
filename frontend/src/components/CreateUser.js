import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
  state = {
    users: [],
  };
  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
  };
  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
    });
    this.setState({ username: "" });
    this.getUsers();
  };
  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };
  render() {
    return (
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-md-4">
          <div
            className="card card-body"
            style={{ border: "1px solid #375e97" }}
          >
            <h4>Create New User</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUsername}
                  value={this.state.username}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary btn-sm">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group" style={{ border: "1px solid #fb6542" }}>
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
