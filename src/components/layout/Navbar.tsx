import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        {children}
      </div>
    </div>
  );
};

const Navbar = (userDetails) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRoleChangeOpen, setIsRoleChangeOpen] = useState(false);
  const [user, setUser] = useState(userDetails.user?.user || null);
  const [role, setRole] = useState(userDetails.user?.user?.role || '');
  const [error, setError] = useState('');

  const RoleChangeDialog = ({ open, onClose, onChangeRole, userId }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Change Role</h2>
            <button onClick={onClose} className="text-gray-600">&times;</button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Select your role:</p>
  
            {error && <p className="text-red-600">{error}</p>}
  
            <div className="flex flex-col mt-4">
              <button
                onClick={() => onChangeRole('Renter')}
                className="login-btn w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Renter
              </button>
              <button
                onClick={() => onChangeRole('Hoster')}
                className="login-btn w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Hoster
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google/callback`);
  };

  const handleChangeRole = async (newRole) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/changeRole/${user.id}`,
        { role: newRole.toLowerCase() },
        { withCredentials: true }
      );
  
      if (response.data) {
        setRole(newRole);
        console.log(`Role changed to: ${newRole}`);

        window.location.reload();
  
        setUser((prevUser) => ({
          ...prevUser,
          role: newRole.toLowerCase(),
        }));
        setError('');
  
        // Close the dialog
        setIsRoleChangeOpen(false);
      } else {
        console.error('Failed to change role:', response.data.error);
      }
    } catch (err) {
      console.error('Error changing role:', err);
      setError(err.response.data.error);
    }
  };

  const DropdownMenu = ({ onLogout }) => {
    return (
      <div className="absolute right-0 mt-10 w-48 bg-white rounded-lg shadow-lg z-50">
        <ul className="py-2">
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                setIsRoleChangeOpen(true);
              }}
              className="block px-4 py-2 cursor text-gray-700 hover:bg-gray-100"
            >
              Change Role
            </Link>
          </li>
          {role === 'hoster' && (
            <li>
              <Link to="/property/management" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Property Management
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <header className="fixed w-full text-white black-bg-primary">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold">
          <h3 className='text-xl text-white'>LALA Test</h3>
        </Link>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
        </button>

        <ul className="hidden lg:flex space-x-9 mt-1">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/properties" className="hover:text-gray-400">
              Properties
            </Link>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#help" className="mr-20 hover:text-gray-400">
              Contact
            </a>
          </li>

          {user ? (
            <div className="relative flex">
              <button onClick={() => setIsRoleChangeOpen(true)} className="mr-5">
                <span className="hover:text-gray-400">Role [ {role || 'Undefined'} ]</span>
              </button>

              <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
                {user.avatar ? (
                  <img src={user.avatar} className="h-8 w-8 text-gray-600 topSpace rounded-full hover:bg-gray-700" />
                ) : (
                  <UserCircleIcon className="h-10 w-10 text-gray-600 topSpace rounded-full hover:bg-gray-700" />
                )}
              </button>
              {isDropdownOpen && <DropdownMenu onLogout={onLogout} />}
            </div>
          ) : (
            <div className="lg:flex">
              <button onClick={handleLoginClick} className="login-btn-outline bg-blue-600 px-4 py-2 ml-0 rounded-lg hover:bg-blue-700 topSpace">
                Login
              </button>
              <button onClick={handleLoginClick} className="login-btn bg-blue-600 px-4 py-2 ml-10 rounded-lg hover:bg-blue-700 topSpace">
                Sign Up
              </button>
            </div>
          )}
        </ul>
      </nav>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-center p-4 lg:hidden">
          <ul className="space-y-4">
            <li>
              <a href="#billboard" className="block py-2">
                Home
              </a>
            </li>
            <li>
              <Link to="/properties" className="hover:text-gray-400">
                Properties
              </Link>
            </li>
            <li>
              <a href="#about" className="block py-2">
                About
              </a>
            </li>
            <li>
              <a href="#help" className="block py-2">
                Contact
              </a>
            </li>
            <li>
              <button onClick={handleLoginClick} className="login-btn bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
                Login
              </button>
            </li>
            <li>
              <button onClick={handleLoginClick} className="login-btn bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Login</h2>
          <button onClick={handleModalClose} className="text-gray-600">
            &times;
          </button>
        </div>
        <form className="mt-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input type="email" className="w-full border p-2 rounded" />
          <label className="block mt-4 mb-2 text-gray-700">Password</label>
          <input type="password" className="w-full border p-2 rounded" />
          <button type="submit" className="login-btn w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
          <button className="login-btn w-full mt-5" onClick={googleAuth}>
            <span>Sign in with Google</span>
          </button>
        </form>
      </Dialog>

      <RoleChangeDialog
        open={isRoleChangeOpen}
        onClose={() => setIsRoleChangeOpen(false)}
        onChangeRole={handleChangeRole}
        userId={user?.id}
      />
    </header>
  );
};

export default Navbar;