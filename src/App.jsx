import React from 'react';
import { BrowserRouter as router , Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import Cars from './components/Cars';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import SearchCard from './pages/SearchCard';
import MyRentals from './pages/MyRentals';
import Profile from './pages/Profile';

import RentalsList from './features/admin/RentalsList';
import AdminDashboard from './features/admin/AdminDashboard';
import ReviewsList from './features/admin/ReviewsList';
import CarsList from './features/admin/CarsList';
import RentalDetails from './pages/RentalDetails';
import AddCarForm from './features/admin/AddCarForm';
import PrivateRoute from './hooks/PrivateRoute';
import AdminRoute from './hooks/AdminRoute';



function App() {
  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/car/:id' element={<CarDetails />} />
      <Route path='/search/:query' element={<SearchCard />} />
      <Route path='/services' element={<ServicePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='/contact' element={<Contact />} />
     
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected user routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/myRentals' element={<MyRentals />} />
        <Route path='/myRentals/:rid' element={<RentalDetails />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Protected admin routes */}
      <Route element={<AdminRoute />}>
        <Route path='/admin' element={<AdminDashboard />}>
          <Route path='' element={<RentalsList />} />
          <Route path='reviews' element={<ReviewsList />} />
          <Route path='cars' element={<CarsList />} />
        </Route>
        <Route path='/admin/form' element={<AddCarForm />} />
      </Route>
    </Routes>

    <Footer />
    <ToastContainer />
  </BrowserRouter>
  );
}

export default App;