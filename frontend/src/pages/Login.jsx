import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/AuthServices";

export function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(loginData.email, loginData.password)
      if (data.token) {
        console.log("Login successful", data)
        navigate("/")
      }
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col bg-white p-6 rounded-2xl text-black">
        <div className="flex items-center justify-center ">
          <h2>Login</h2>
        </div>
        <form className="flex flex-col gap-4 mt-4">
          <label htmlFor="username">Email</label>
          <input
            className="bg-gray-300 rounded-2xl text-black p-1"
            type="text"
            name="email"
            required
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />

          <label htmlFor="password">Password:</label>
          <input
            className="bg-gray-300 rounded-2xl text-black p-1"
            type="password"
            name="password"
            required
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />

          <button
            className="bg-blue-500 text-white rounded-2xl p-1 cursor-pointer hover:bg-blue-600"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p>Don't have an account?</p>
          <a href="/register" className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault()
              navigate("/register")
            }}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}