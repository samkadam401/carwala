import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    
    if (!user) {
        navigate('/login');
        return null;
    }
    
    
    
    
    

    return (
        <div className="w-full flex items-center bg-black justify-center min-h-[90vh]">
            <div className=' p-10 rounded-lg bg-gray-200 shadow-gray-600 shadow-lg'>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
            
            <div className="space-y-4">
                <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="text-lg font-semibold">{user.name || "N/A"}</p>
                </div>
                <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="text-lg font-semibold">{user.email || "N/A"}</p>
                </div>
                <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="text-lg font-semibold">{user.phone || "Not Provided"}</p>
                </div>
                <div>
                    <span className="text-gray-600">Joined On:</span>
                    <p className="text-lg font-semibold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Profile;
