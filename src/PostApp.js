import React from "react";
import PostForm from "./PostForm";
import PostTable from "./PostTable";
import axios from "axios";

class PostApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentEntry: {
        userId: "",
        userName: "Select One..",
        id: "",
        title: "",
        body: "",
      },
      posts: [],
    };
  }

  componentDidMount = () => this.getPosts();

  async getPosts() {
    let { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // let nextState = { ...this.state };
    // nextState.posts = data;
    this.setState({ posts: data });
  }

  collectFormData = async (values) => {
    let { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      values
    );
    let posts = this.state.posts;
    posts.push(data);
    this.setState({
      currentEntry: {
        userId: "",
        userName: "Select One..",
        id: "",
        title: "",
        body: "",
      },
      posts,
    });
  };

  render() {
    return (
      <>
        <PostForm
          currentEntry={this.state.currentEntry}
          collectFormData={this.collectFormData}
        />
        <br />
        <br />
        <PostTable posts={this.state.posts} />
      </>
    );
  }
}

export default PostApp;
