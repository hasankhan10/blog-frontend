import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function SignInPage({getDetails}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Call API to sigin user
        const result = await axios.post("http://localhost:8080/api/v1/auth/login",{
          email:email,
          password:password
        })
        if(result.data.success){
          localStorage.setItem("token",result.data.token)
          navigate("/dashboard")
        }
        getDetails(result.data)
        
    }
  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md mx-2">
        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <NavLink
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </NavLink>
          </div>
          <h1 className=" pt-2">Don't have an Account? <NavLink to={"/signup"} className={"font-semibold text-blue-800"}>Signup</NavLink></h1>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;