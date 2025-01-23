// components/Navbar.js
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router';
import { API_URL } from '../../utils/constants';
import axios from 'axios';

const AdminTopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get(`${API_URL}/profile`, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold">
        <Link href="/"> Ruhul Amin
        </Link>
      </div>

      {/* Right Side - Profile Menu */}
      <div
        className="relative flex"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {/* Profile Icon */}
        <div className='p-2'>  {user && (<>{user?.displayName} </>)} </div>
        <button className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">

          <span className="text-lg font-medium"> <FaUserCircle /> </span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0   w-48 bg-white text-black rounded-lg shadow-lg  ">
            <ul className='p-2 '>
              <li className="hover:bg-gray-100 px-4 py-2">
                <Link to={"/admin/profile"}> Update Profile </Link>
              </li>
              <li className="hover:bg-gray-100">
                <button className="block w-full text-left px-4 py-2" onClick={() => {
                  localStorage.removeItem('token');
                  navigate("/login", { replace: true }); // Navigate programmatically
                }}  >Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminTopNav;