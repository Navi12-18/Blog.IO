import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 font-Poppins">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className='flex items-center'>
            <img src="https://cdn-icons-png.flaticon.com/128/2625/2625883.png" className='h-12' alt="" srcset=""/>
            <Link
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 ml-4 whitespace-nowrap uppercase text-teal-500"
              to="/"
            >
              Waves
            </Link>
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <img src="https://cdn-icons-png.flaticon.com/128/2613/2613045.png" className='h-8' alt="" srcset="" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center " +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className='w-full flex flex-col list-none lg:ml-auto lg:flex-row-reverse bg-gray-100 lg:bg-white'>
            <ul className="flex flex-col list-none lg:ml-auto lg:flex-row bg-gray-100 lg:border-2 lg:border-teal-400 p-1 rounded">
              <li className="nav-item m-1">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-teal-500 hover:opacity-75"
                  to = "/"
                >
                  <span className="lg:text-[16px]">Home</span>
                </Link>
              </li>
              <li className="nav-item m-1">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-teal-500 hover:opacity-75"
                  to = "/myBlogs"
                >
                  <span className="lg:text-[16px]">My Waves</span>
                </Link>
              </li>
              <li className="nav-item m-1">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-teal-500 hover:opacity-75"
                  to = "/createBlog"
                >
                  <span className="lg:text-[16px]">Create a Wave</span>
                </Link>
              </li>
              <li className="nav-item m-1">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug h-7 bg-black w-full h-full rounded-sm text-teal-500 hover:opacity-75"
                  onClick={logout}
                >
                  <span className="lg:text-[16px]">Logout</span>
                </button>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

    // <div className='bg-white w-full border-b-4 border-teal-300 flex px-10 py-4 font-Poppins'>
    // <img srcSet="https://cdn-icons-png.flaticon.com/128/4922/4922073.png" alt="" className='h-12'/>
    // <div className='flex justify-between w-full'>
    // <div className='flex items-center'>
    //     <Link to="/" className='ml-4 py-1 px-1 transition-all duration-300 border-b-4 border-transparent hover:border-b-4 hover:border-black font-bold hover:text-teal-800'>Home</Link>
    //     <Link to="/myBlogs" className='py-1 px-1 mx-2 transition-all duration-300 border-b-4 border-transparent hover:border-b-4 hover:border-black font-bold hover:text-teal-800' >My Blogs</Link>
    //     <Link to="/createBlog" className='py-1 px-1 mx-0 transition-all duration-300 border-b-4 border-transparent hover:border-b-4 hover:border-black font-bold hover:text-teal-800' >Create Blog</Link>
    // </div>
    // <div className='flex items-center'>
    // {!localStorage.getItem('token' === null) ? <button className='py-3.5 px-6 mx-2 rounded-xl text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white' onClick={logout}>Logout</button> :
    // <Link to="/register" className='py-3.5 px-6 rounded-xl text-teal-400 bg-black transition-all duration-300 hover:bg-teal-400 hover:text-white'>Register</Link>}
    // </div>
    // </div>
    // </div>
//   )
// }

export default Navbar