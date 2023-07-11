import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyBlogs from "./components/MyBlogs";
import CreateBlogs from "./components/CreateBlogs";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogState from "./context/BlogState";
import FullBlog from "./components/FullBlog";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <>
      <BlogState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/myblogs" element={<MyBlogs></MyBlogs>}></Route>
            <Route
              exact
              path="/createBlog"
              element={<CreateBlogs></CreateBlogs>}
            ></Route>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route
              exact
              path="/register"
              element={<Register></Register>}
            ></Route>
            <Route
              exact
              path="/blog/:id"
              element={<FullBlog></FullBlog>}
            ></Route>
            <Route
              exact
              path="/editBlog/:id"
              element={<EditBlog></EditBlog>}
            ></Route>
          </Routes>
        </Router>
      </BlogState>
    </>
  );
}

export default App;
