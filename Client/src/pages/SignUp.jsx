import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        username: name, // map full name → username
        phone,
        gender,
        email,
        password,
      });

      alert("Signup Successful");

      navigate("/login"); // redirect after signup
    } catch (error) {
      alert(error.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-yellow-50 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-yellow-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-yellow-500 focus:ring-2"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-yellow-500 focus:ring-2"
          />

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-yellow-500 focus:ring-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-yellow-500 focus:ring-2"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-yellow-500 focus:ring-2"
          />

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black rounded-xl font-semibold hover:bg-yellow-400"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;