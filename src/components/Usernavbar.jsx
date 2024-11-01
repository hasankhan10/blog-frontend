import { ThemeContext } from '../App';
import {useContext} from "react";
import {FiMoon, FiSun} from "react-icons/fi";

function Usernavbar() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hi, Mehedi</h1>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
        </button>
        </div>
    </header>
  )
}

export default Usernavbar