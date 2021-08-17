import React from "react";
import axios from "axios";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEntry: this.props.currentEntry,
      userIds: [],
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.currentEntry.userId !== prevState.currentEntry.userId) {
      return newProps.currentEntry;
    }
    return null;
  }

  componentDidMount = () => this.getUsers();

  getUsers = async () => {
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.setState({ userIds: data });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = ({ target: { name, value } }) => {
    let currentEntry = { ...this.state.currentEntry };
    currentEntry[name] = value;
    if (name === "userName") {
      let index = this.state.userIds.findIndex((user) => {
        return user.name === value;
      });
      currentEntry["userId"] = this.state.userIds[index].id;
    }
    this.setState({ currentEntry });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.collectFormData(this.state.currentEntry);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">User ID</label>
          <select
            name="userName"
            value={this.state.currentEntry.userName}
            onChange={this.handleChange}
          >
            <option value={this.state.currentEntry.userName}>
              {this.state.currentEntry.userName}
            </option>
            {this.state.userIds.map((val) => {
              return (
                <option value={val.name} key={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            id=""
            value={this.state.currentEntry.title}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Body</label>
          <input
            type="text"
            name="body"
            id=""
            value={this.state.currentEntry.body}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PostForm;
