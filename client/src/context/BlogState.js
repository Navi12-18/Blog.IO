import { useState } from "react";
import BlogContext from "./BlogContext";

const BlogState = (props) => {
  const host = "http://localhost:4000";
  const blogsInitial = [];
  const usersBlog = [];
  const [blogs, setBlogs] = useState(blogsInitial);
  const [usersblog, setUserBlog] = useState(usersBlog);

  //Get All blogs
  const getBlogs = async () => {
    const res = await fetch(`${host}/api/blog/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const json = await res.json();
    setBlogs(json);
  };

  const userBlogs = async () => {
    const res = await fetch(`${host}/api/blog/myblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const json = await res.json();
    setUserBlog(json);
  };

  //Create blog
  const createBlogs = async (formdata) => {
    const res = await fetch(`${host}/api/blog/createBlog`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('token'),
      },
      body: formdata,
    });

    const blog = await res.json();
    setBlogs(blogs.concat(blog));
  };

  //Delete Blog
  const deleteBlog = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/blog/deleteBlog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);
    const newBlogs = blogs.filter((blog) => {
      return blog._id !== id;
    });

    const newUserBlogs = usersblog.filter((blog) => {
        return blog._id !== id;
      });
    setBlogs(newBlogs);
    setUserBlog(newUserBlogs);
  };

  // Edit a Note
  const editBlog = async (id,title,desc,cover) => {
    // API Call
    console.log(title);
    console.log(desc); 
    const response = await fetch(`${host}/api/blog/updateBlog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, desc, cover})
    });

    const json = await response.json(); 
    console.log(json);
    let newBlogs = JSON.parse(JSON.stringify(blogs))
    // Logic to edit in client
    for (let index = 0; index < newBlogs.length; index++) {
      const element = newBlogs[index];
      if (element._id === id) {
        newBlogs[index].title = title;
        newBlogs[index].desc = desc;
        newBlogs[index].cover = cover; 
        break; 
      }
    }  
    setBlogs(newBlogs);
    // setUserBlog(json);
  }

  return (
    <BlogContext.Provider
      value={{ blogs, getBlogs, createBlogs, setBlogs, usersblog, userBlogs,deleteBlog,editBlog}}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
