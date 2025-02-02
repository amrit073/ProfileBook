import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ProfileContext } from '../context/profile.context';

export default function Navbar() {
  const location = useLocation();
  const context = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);

  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');

  const { isAuthenticated, loading } = context;

  return (
    <nav className="bg-gray-200 fixed z-50 w-screen px-6 py-4 shadow">
      <div className="flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-indigo-600 text-xl font-bold md:text-2xl">
              Profile Book
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="block text-gray-800 font-semibold hover:text-indigo-700 focus:text-gray-600 focus:outline-none md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        <div className={`md:flex ${isOpen ? '' : 'hidden'} `}>
          {!loading && isAuthenticated && (
            <Link
              to="/profile"
              className={`block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 font-semibold hover:text-indigo-700 ${
                location.pathname === '/profile' && 'text-indigo-500'
              }`}
            >
              Profile
            </Link>
          )}

          {!loading && isAuthenticated && (
            <Link
              to="/account"
              className={`block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 font-semibold hover:text-indigo-700 ${
                location.pathname === '/account' && 'text-indigo-500'
              }`}
            >
              Account
            </Link>
          )}

          <Link
            to="/about"
            className={`block mt-4 md:inline-block md:mt-0 md:ml-6 text-gray-600 font-semibold hover:text-indigo-700 ${
              location.pathname === '/about' && 'text-indigo-500'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ${location.pathname === '/profile' && 'text-indigo-500'}
