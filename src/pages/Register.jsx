import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Register = () => {
  const { isLoading, isError, message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const { name, email, password, phone, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone || !password2) {
      toast.error(message, {
        position: "top-center",
      });
    }
    if (password !== password2) {
      toast.error("❌ Password does not match", {
        position: "top-center",
      });
    }
    dispatch(userRegister(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      toast.success("🎉 Account Created Successfully!", {
        position: "top-center",
      });
    }
    if (isError && message) {
      toast.error(`🚫 ${message}`, {
        position: "top-center",
      });
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-2xl transform transition duration-300 hover:scale-[1.02]">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white">
          ✨ Create an Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white font-medium mb-2 text-lg">👤 Full Name</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <User className="text-white mr-3" />
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={name}
                placeholder="Enter your full name"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-lg">📧 Email</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <Mail className="text-white mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={email}
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-lg">📱 Phone</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <Phone className="text-white mr-3" />
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={phone}
                placeholder="Enter your phone number"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-lg">🔒 Password</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <Lock className="text-white mr-3" />
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={password}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-lg">🔁 Confirm Password</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <Lock className="text-white mr-3" />
              <input
                type="password"
                name="password2"
                id="password2"
                onChange={handleChange}
                value={password2}
                placeholder="Confirm password"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-500 transition-all hover:scale-105 shadow-md hover:shadow-green-400">
            🚀 Register
          </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 font-semibold hover:underline">
            Login 🔑
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
