"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import useUser from '../../hooks/useUser';

const AdminTopNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold">
                <Link href="/"> Ruhul Amin</Link>
            </div>

            <div
                className="relative flex"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <div className='p-2'>{user && <>{user?.displayName}</>}</div>
                <button className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-lg font-medium"><FaUserCircle /></span>
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 w-48 bg-white text-black rounded-lg shadow-lg">
                        <ul className='p-2'>
                            <li className="hover:bg-gray-100 px-4 py-2">
                                <Link href="/admin/profile">Update Profile</Link>
                            </li>
                            <li className="hover:bg-gray-100">
                                <button className="block w-full text-left px-4 py-2" onClick={() => {
                                    localStorage.removeItem('token');
                                    router.replace('/login');
                                }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminTopNav;
