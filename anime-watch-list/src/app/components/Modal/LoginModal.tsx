import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal(props: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // You can add validation logic here if needed

    // Send a login request to your backend (replace with actual API endpoint)
    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          props.onClose();
        } else {
          console.error('Login failed');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-600">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-600">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg p-2"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPassword}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-gray-600">Show Password</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={handleLogin} className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600" type="button">
              Login
            </button>
            <button onClick={props.onClose} className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600" type="button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
