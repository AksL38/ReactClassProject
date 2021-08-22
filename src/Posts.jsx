import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const [formData, setFormData] = useState({
    userId: "",
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
          data.userId = users[index].id;
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
      formData.userId !== "" &&
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
      userId: formData.userId,
      title: formData.title,
      body: formData.description,
    };
    if (formData.id === "") {
      updatePosts(newEntry);
    } else {
      newEntry.id = formData.id;
      updatePost(newEntry);
    }
    setFormData({
      userId: "",
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
    try {
      let { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newEntry
      );
      let newPosts = [...posts];
      newPosts.push(data);
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (newEntry) => {
    try {
      let { data } = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/" + newEntry.id,
        newEntry
      );
      let index = posts.findIndex((post) => {
        return post.id === data.id;
      });
      let newPosts = [...posts];
      newPosts[index] = data;
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (post) => {
    let index = users.findIndex((user) => {
      return user.id === post.userId;
    });
    post.name = users[index].name;
    setFormData({
      userId: post.userId,
      id: post.id,
      name: post.name,
      title: post.title,
      description: post.body,
      errors: {
        name: "",
        title: "",
        description: "",
      },
    });
  };

  const handleDelete = async (post) => {
    if (formData.id === post.id) {
      setFormData({
        userId: "",
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
    }
    try {
      await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/" + post.id
      );
      let index = posts.findIndex((val) => {
        return val.id === post.id;
      });
      let newPosts = [...posts];
      newPosts.splice(index, 1);
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" mx-5 text-primary">
        <h3>Create new post</h3>
        <form onSubmit={handleSubmit}>
          <label>Username </label>
          <br />
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
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <span>{formData.errors.title}</span>
          <br />
          <label>Description </label>
          <br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <span>{formData.errors.description}</span>
          <br />
          <br />
          <button disabled={!allowSubmit}>Submit</button>
        </form>
      </div>
      <br />
      <div className="mx-5 text-primary">
        <h3>Posts so far ....</h3>
        <br />
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>User Id</th>
              <th>Post Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Details</th>
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
                  <td>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(post)}>Delete</button>
                  </td>
                  <td>
                    <button>
                      <Link to={"/posts/" + post.id}>More</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
