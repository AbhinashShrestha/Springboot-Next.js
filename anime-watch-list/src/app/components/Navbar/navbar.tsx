import { useState } from 'react';
import RegisterModal from '../Modal/RegisterModal';
import LoginModal from '../Modal/LoginModal';
import Link from 'next/link';

function Navbar() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <button>
            <Link href='/animelist'>
              AnimeList
            </Link>
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={openRegisterModal}
            className="text-white hover:text-gray-200 cursor-pointer"
          >
            Register
          </button>
          <button
            onClick={openLoginModal}
            className="text-white hover:text-gray-200 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)} />
      )}
    </nav>
  );
}

export default Navbar;
