// components/Navbar.js
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const AdminTopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold">
        <Link href="/"> Billy The Blue Whale Collection
        </Link>
      </div>

      {/* Right Side - Profile Menu */}
      <div
        className="relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {/* Profile Icon */}
        <button className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <span className="text-lg font-medium"> <FaUserCircle /> </span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0   w-48 bg-white text-black rounded-lg shadow-lg  ">
            <ul className='p-2 '>
              <li className="hover:bg-gray-100 px-4 py-2">
                <Link href=""> Update Profile </Link>
              </li>
              <li className="hover:bg-gray-100">
                <button className="block w-full text-left px-4 py-2" onClick={() => alert('Logged out')}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminTopNav;