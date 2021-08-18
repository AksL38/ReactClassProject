import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    setPosts(data);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    setUsers(data);
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "Choose one ...",
    title: "",
    description: "",
    errors: {
      name: "",
      title: "",
      description: "",
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    let data = { ...formData };
    data[name] = value;
    switch (name) {
      case "name":
        if (value === "Choose one ...") {
          data.errors.name = "Please choose one username from the list";
        } else {
          data.errors.name = "";
          let index = users.findIndex((user) => {
            return user.name === value;
          });
          data.id = users[index].id;
        }
        break;
      case "title":
        if (value === "") {
          data.errors.title = "Title field can not be empty";
        } else {
          data.errors.title = "";
        }
        break;
      case "description":
        if (value === "") {
          data.errors.description = "Description field can not be empty";
        } else {
          data.errors.description = "";
        }
        break;

      default:
        break;
    }
    setFormData(data);
  };

  const [allowSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (
      formData.id !== "" &&
      formData.name !== "Choose one ..." &&
      formData.title !== "" &&
      formData.description !== ""
    ) {
      if (
        formData.errors.name === "" &&
        formData.errors.title === "" &&
        formData.errors.description === ""
      ) {
        setSubmit(true);
      } else {
        setSubmit(false);
      }
    } else {
      setSubmit(false);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {
      userId: formData.id,
      title: formData.title,
      body: formData.description,
    };
    updatePosts(newEntry);
    setFormData({
      id: "",
      name: "Choose one ...",
      title: "",
      description: "",
      errors: {
        name: "",
        title: "",
        description: "",
      },
    });
    setSubmit(false);
  };

  const updatePosts = async (newEntry) => {
    let { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newEntry
    );
    let newPosts = [...posts];
    newPosts.push(data);
    setPosts(newPosts);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username </label>
        <select name="name" value={formData.name} onChange={handleChange}>
          <option value="Choose one ...">Choose one ...</option>{" "}
          {users.map((user) => {
            return (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <span>{formData.errors.name}</span>
        <br />
        <label>Title </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <span>{formData.errors.title}</span>
        <br />
        <label>Description </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <span>{formData.errors.description}</span>
        <br />
        <button disabled={!allowSubmit}>Submit</button>
      </form>
      <h3>Posts so far ....</h3>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Post Id</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
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
    </>
  );
}
