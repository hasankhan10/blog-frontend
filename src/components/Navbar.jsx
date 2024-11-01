import { ThemeContext } from '../App';
import { useContext, useState } from "react";
import { FiMoon, FiSun,FiHome } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({userData}) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  const clearToken =()=>{
    localStorage.removeItem("token");
    navigate("/")
    
  }

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      {location.pathname === '/' ? <h1 className="text-3xl font-bold">Tech Blog</h1> :
        <h1 className="text-3xl font-bold">
          <NavLink to={"/"}><FiHome className="w-6 h-6 inline-block" /></NavLink> Hi, {userData.username}
        </h1>}
        <div className="flex items-center">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
          <button onClick={handleMenu} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-4">
            <AiOutlineUser className="w-6 h-6" />
          </button>
          {showMenu && (
            <div className={`absolute top-14 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 w-40 rounded-md`}>
              <ul>
                <NavLink to={token?"/dashboard":"/signin"} className={`py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} cursor-pointer font-semibold`}>
                  Profile
                </NavLink>
                <li className={`py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} cursor-pointer font-semibold`}>
                    {token?<p onClick={clearToken}>Logout</p>:<NavLink to={"/signup"}>Sign Up</NavLink>}
                </li>
              </ul>
          </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar