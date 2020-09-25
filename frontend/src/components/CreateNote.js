import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };
  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: "",
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editing: true,
        _id: this.props.match.params.id,
      });
    }
  }
  onSubmit = async (e) => {
    e.preventDefault();
    this.state.date.setHours(0, 0, 0);
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.editing) {
      if (
        newNote.title !== "" &&
        newNote.content !== "" &&
        newNote.author !== ""
      ) {
        await axios.put(
          "http://localhost:4000/api/notes/" + this.state._id,
          newNote
        );
        console.log(newNote);
        window.alert("Note Updated!!");
        window.location.href = "/";
      } else {
        window.alert("Please enter all the data!!");
      }
    } else {
      if (
        newNote.title !== "" &&
        newNote.content !== "" &&
        newNote.author !== ""
      ) {
        await axios.post("http://localhost:4000/api/notes", newNote);
        window.alert("Note created!!");
        window.location.href = "/";
      } else {
        window.alert("Please enter all the data!!");
      }
    }
  };
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeDate = (date) => {
    this.setState({ date });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3" style={{ marginTop: 15 }}>
        <div className="card card-body" style={{ border: "1px solid #fb6542" }}>
          <h4>Create Note</h4>
          {/* SELECT USER */}
          <div className="form-group">
            <select
              name="userSelected"
              className="form-control"
              onChange={this.onInputChange}
              placeholder="Select User"
              value={this.state.userSelected}
            >
              <option value="">Select User</option>
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              onChange={this.onInputChange}
              className="form-control"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="Content"
              onChange={this.onInputChange}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              dateFormat="dd/MM/yyyy"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-outline-primary btn-sm">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
