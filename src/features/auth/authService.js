import axios from "axios";

 const register = async (formData) => {
        const response = await axios.post("https://car-rental-app-5d25.onrender.com/api/auth/register", formData);
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data; 
};
const login = async (formData) => {
    const response = await axios.post("https://car-rental-app-5d25.onrender.com/api/auth/login", formData);
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data; 
};


const authService = {
    register,login
}
export default authService