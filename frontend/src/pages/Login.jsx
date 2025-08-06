export function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col bg-white p-6 rounded-2xl text-black">
        <div className="flex items-center justify-center ">
          <h2>Login</h2>
        </div>
        <form className="flex flex-col gap-4 mt-4">
          <label htmlFor="username">Username:</label>
          <input className="bg-gray-300 rounded-2xl text-black p-1" type="text" id="username" name="username" required />
          
          <label htmlFor="password">Password:</label>
          <input className="bg-gray-300 rounded-2xl text-black p-1" type="password" id="password" name="password" required />

          <button className="bg-blue-500 text-white rounded-2xl p-1 cursor-pointer hover:bg-blue-600" type="submit">Login</button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p>Don't have an account?</p>
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}