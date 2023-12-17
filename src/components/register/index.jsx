import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { API_URL } from '../../../lib/constants';

export default function RegisterForm() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^(.+)@(stud\.noroff\.no)$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Email must contain @stud.noroff.no');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setMessage('');

    const navigateToLogin = () => {
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
    };

    const payload = {
      name,
      email,
      password,
      avatar,
    };

    try {
      const response = await fetch(`${API_URL}/auction/auth/register`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        setAccessToken(newAccessToken);

        navigateToLogin();

        setMessage('Registration successful! Redirecting to login...');
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An unexpected error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-2xl">Register</h2>
        {message && (
          <div className={`text-center mb-4 ${message.startsWith('Registration successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name"></label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 ${
              nameError ? 'border-not-success-red' : 'border-my-gray'
            }`}
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <p className="text-not-success-red text-xs italic">{nameError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"></label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 ${
              emailError ? 'border-not-success-red' : 'border-my-gray'
            }`}
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-not-success-red text-xs italic">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"></label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 ${
              passwordError ? 'border-not-success-red' : 'border-my-gray'
            }`}
            id="password"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="text-not-success-red text-xs italic">{passwordError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 ${
              avatarError ? 'border-not-success-red' : 'border-my-gray'
            }`}
            id="avatar"
            type="text"
            placeholder="URL for Your Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          {avatarError && <p className="text-not-success-red text-xs italic">{avatarError}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-my-blue hover:bg-my-blue-light text-white font-bold py-2 px-4 m-auto rounded-3xl h-10 md:h-12 w-full focus:outline-none focus:shadow-outline mb-4"
            type="submit"
            id="submit-button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
