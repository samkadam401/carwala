import React, { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const { isLoading, isError, message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      navigate("/");
      toast.success("🎉 Login Successful!", {
        position: "top-center",
      });
    }
    if (isError && message) {
      toast.error(`❌ ${message}`, {
        position: "top-center",
      });
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-2xl transform transition duration-300 hover:scale-[1.02]">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white">
          🚗 Welcome Back!
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white font-medium mb-2 text-lg">📧 Email</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 hover:shadow-lg focus-within:shadow-green-400 transition-all">
              <Mail className="text-white mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-white placeholder-white/70 text-base"
                required
              />
            </div>
          </div>

          <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-md hover:shadow-green-400">
            🚀 Login
          </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 font-semibold hover:underline">
            Register 📝
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
