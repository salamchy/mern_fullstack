import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterUserMutation } from "../../redux/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading: isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      userName,
      email,
      password
    }

    try {
      await registerUser(data).unwrap();
      alert("Registration successful.")
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed!")
    }
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">

          <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setuserName(e.target.value)} required className="w-full bg-gray-100 focus:outline-none px-5 py-3" />

          <input type="email" name="email" id="email" placeholder=" Your Email" onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-100 focus:outline-none px-5 py-3" />

          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
          {
            message && <p className="text-red-500">{message}</p>
          }

          <button className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md" type="submit">Register</button>
        </form>

        <p className="my-5  text-sm text-center">Already have an account? <Link className="italic text-red-700 px-1 hover:underline" to="/login">Login</Link> here.</p>
      </div>
    </section>
  )
}
export default Register