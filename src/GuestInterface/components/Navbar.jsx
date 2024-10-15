import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAboutUsClick = () => {
    navigate('/about');
  };

  const handleBlockClick = () => {
    console.log("hi");
    navigate('/start');
  };

  return (
    <header className=" w-full p-4 text-white bg-slate-900">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">BlockBurst</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#examples" className="hover:underline">Examples</a></li>
            <li><button className="hover:underline" onClick={handleAboutUsClick}>About us</button></li>
            <li><button className="hover:underline" onClick={handleBlockClick}>Block us</button></li>
            <li>
              <button
                className="px-4 py-2 text-blue-600 bg-white rounded hover:bg-gray-200"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
