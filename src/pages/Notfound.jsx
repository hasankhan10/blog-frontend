import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="text-center p-10 rounded-lg shadow-lg bg-white">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-600 mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-500 mb-4">The page you are looking for does not exist.</p>
        <NavLink to={"/"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;