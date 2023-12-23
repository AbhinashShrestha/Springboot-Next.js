import React, { useState } from 'react';


interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal(props: RegisterModalProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const handleRegister = () => {
  if (password === repeatPassword) {
    // Passwords match; registration logic here
    const registrationData = {
      username,
      email,
      password,
    };

    // Send a POST request to your backend 
    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then(response => {
        if (response.ok) {
          console.log('Registration successful');
          // toast('Registration successful');
          // Close the modal and redirect to /animelist
          props.onClose();
          window.location.href = '/animelist';
        } else {
          // If registration failed, parse the response body to get the error message
          response.text().then(text => {
            if (text) {
              // If the response body is not empty, parse it as JSON
              const data = JSON.parse(text);
              console.error('Registration failed:', data.message);
            } else {
              console.error('Registration failed with no error message');
            }
          });
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  } else {
    // Passwords do not match
    setPasswordsMatch(false);
  }
};


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-gray-600">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg p-2"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-600">Email:</label>
            <input
              type="email"
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
          <div className="flex flex-col">
            <label htmlFor="repeatPassword" className="mb-1 text-gray-600">Repeat Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="border rounded-lg p-2"
              placeholder="Repeat your password"
            />
          </div>
          {!passwordsMatch && (
            <div className="text-red-500">Passwords do not match</div>
          )}
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
            <button onClick={handleRegister} className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600" type="button">
              Register
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
