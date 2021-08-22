import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Post(props) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(useParams().id);

  useEffect(() => {
    console.log(id);
    fetchPosts();
    fetchUsers();
  }, [id]);

  const fetchPosts = async () => {
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  //   const [userInfo, setUserInfo] = useState({});
  //   const [comments, setComments] = useState([]);

  //   useEffect(() => {
  //     let postIndex = posts.findIndex((post) => post.id === +id);
  //     let post = posts[postIndex];
  //     console.log(post);
  //     let userIndex = users.findIndex((user) => user.id === post.userId);
  //     let user = users[userIndex];
  //     console.log(user);
  //   });

  return <></>;
}
