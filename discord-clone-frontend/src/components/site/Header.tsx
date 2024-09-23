import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/reduxHooks'; // Adjust the import based on your hooks location

const Header: React.FC = () => {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();

    const handleOpenDiscord = () => {
        navigate('/channels/@me'); // Navigate to /channels/@me
    };

    return (
        <header className="bg-[#36393f] text-white p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                <FaDiscord className="text-4xl" />
                <span className="text-xl font-bold">Discord</span>
            </Link>
            {isLoggedIn ? ( // Conditional rendering based on login status
                <button 
                    onClick={handleOpenDiscord} 
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                    Open Discord
                </button>
            ) : (
                <Link to="/login" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                    Login
                </Link>
            )}
        </header>
    );
};

export default Header;