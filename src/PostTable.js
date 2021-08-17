import React from "react";
import "./PostTable.css";

class PostTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.posts.length !== prevState.posts.length) {
      return { posts: newProps.posts };
    }
    return null;
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default PostTable;
