import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"; // ✅ ADD THIS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ UNCOMMENT THIS

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("role", res.data.user.role); // 🔥 FIX THIS
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.token, res.data.user); // ✅ NOW WORKS

      console.log("Logged In:", res.data);

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error); // 👈 add this for debugging
      alert(error.response?.data || "Login failed");
    }
  };


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-yellow-50 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-yellow-600 mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Login to explore local events around you
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-yellow-500 text-black
            font-semibold hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
