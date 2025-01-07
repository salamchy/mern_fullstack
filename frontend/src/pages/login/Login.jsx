import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/auth/authApi";

const Login = () => {

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await loginUser(data).unwrap();
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide valid email and password")
    }
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">

          <input type="text" name="email" id="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-100 focus:outline-none px-5 py-3" />

          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
          {
            message && <p className="text-red-500">{message}</p>
          }

          <button className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md" type="submit">Login</button>
        </form>

        <p className="my-5  text-sm text-center">Don't have an account? <Link className="italic text-red-700 px-1 hover:underline" to="/register">Register</Link> here.</p>
      </div>
    </section>
  )
}
export default Login