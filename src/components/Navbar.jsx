import { User2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import img from '../assets/logo.png';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleRemove = () => {
        dispatch(userLogout());
        navigate('/');
        setSidebarOpen(false);
        toast.success("User Logout", { position: "top-center" });
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] shadow-md h-24 w-full flex items-center justify-between px-6 md:px-8">
                <div className="w-full mx-auto flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <div className="flex items-center ">
                  
                        <Link to='/'>  <img src={img} alt="Logo" className="h-39 w-40" /> </Link>
                    </div>

                    {/* 🔹 Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to='/about' className=" text-white hover:text-gray-600 text-xl font-serif transition">ABOUT</Link>
                        <Link to='/services' className=" text-white hover:text-gray-600 text-xl font-serif transition">PERFOMANCE</Link>
                        <Link to='/cars' className=" text-white hover:text-gray-600 text-xl font-serif transition">CARS</Link>
                        <Link to='/contact' className=" text-white hover:text-gray-600 text-xl font-serif transition">CONTACT</Link>
                    </div>

                    
                    <div className="flex items-center space-x-3">
                        {!user ? (
                            <Link to='/login'>
                                <button className='px-4 py-1 text-white rounded bg-green-600 hover:bg-green-700 transition'>
                                    LOGIN
                                </button>
                            </Link>
                        ) : (
                            <>
                                <button onClick={handleRemove} className='px-4 py-1 text-white rounded bg-red-600 hover:bg-red-700 uppercase'>
                                    LOGOUT
                                </button>
                                <User2
                                    className='rounded-full border bg-white p-1 w-8 h-8 cursor-pointer hover:bg-gray-200 transition'
                                    onClick={() => setSidebarOpen(true)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </nav>

   
            <div className="md:hidden flex justify-around  bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505]  py-2 border-b">
                <Link to='/about' className=" text-white hover:text-gray-600  text-sm font-serif transition">About</Link>
                <Link to='/services'className=" text-white hover:text-gray-600 text-sm font-serif transition">PERFOMANCE</Link>
                <Link to='/cars' className=" text-white hover:text-gray-600 text-sm font-serif transition">CARS</Link>

                <Link to='/contact' className=" text-white hover:text-gray-600 text-sm font-serif transition">CONTACT</Link>
            </div>

            <div className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg z-50 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-white ">User Panel</h2>
                    <X className="cursor-pointer text-white " onClick={() => setSidebarOpen(false)} />
                </div>

                <div className="p-6 space-y-4 bg-black h-full  ">
                    {user ? (
                        <>
                            <p className="text-white font-medium">Hello, {user?.name || "User"}!</p>
                            {user.isAdmin ? (
                                <Link to="/admin" className="block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">Admin</Link>
                            ) : (
                                <Link to="/profile" className="block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">Profile</Link>
                            )}
                            <Link to="/myRentals" className="block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">My Rentals</Link>
                            <button onClick={handleRemove} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-600 font-medium">Welcome, Guest!</p>
                            <Link to="/login" className="block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">Profile</Link>
                            <Link to="/login" className="block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">My Rentals</Link>
                            <Link to="/login" className="block bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
