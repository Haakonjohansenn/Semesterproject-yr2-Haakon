import { useState } from 'react';
import { API_URL } from '../../../lib/constants';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../authContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    // Validate input and set corresponding validity state
    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    } else if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
    }
  };

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await fetch(`${API_URL}/auction/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.accessToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('user', JSON.stringify(data)); // Store the user data

          login(data); // Call the login function from the context with user data

          setMessage('Login successful!');
          navigate({ to: '/' });
        } else {
          setMessage('Login failed. Please try again.');
        }
      } catch (error) {
        setMessage('Your login attempt failed. Please try again.');
      }
    } else {
      setMessage('Invalid email or password. Please check your inputs.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 max-w-lg"
        onSubmit={handleLoginForm}
      >
        <h1 className="welcome-title text-center font-bold mb-8 md:text-2xl">Welcome!</h1>
        <div className="mb-4">
          <label
            className="block text-my-gray text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full sm:w-270 py-2 px-3 mb-4 text-my-gray leading-tight focus:outline-none focus:shadow-outline ${
              isEmailValid ? 'border-my-gray' : 'border-not-success-red'
            }`}
            id="email"
            type="text"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
          {!isEmailValid && (
            <p className="text-not-success-red text-sm">Invalid email format</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-my-gray text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full sm:w-270 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isPasswordValid ? 'border-my-gray' : 'border-not-success-red'
            }`}
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {!isPasswordValid && (
            <p className="text-not-success-red text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>
        <button
          className="bg-my-blue hover:bg-my-blue-light text-white font-bold py-2 px-4 m-auto rounded-3xl h-10 md:h-12 w-full focus:outline-none focus:shadow-outline mb-4"
          type="submit"
        >
          Log In
        </button>
        <p className="text-my-black text-sm my-6 text-center">
          Dont have an account?{' '}
        </p>
        <button className="m-auto rounded-3xl h-10 w-full md:h-12 bg-none border-solid border-2 border-my-blue hover:bg-cta-color">
          <Link to="/register" className="text-my-blue">
            Register here
          </Link>
        </button>
      </form>
    </div>
  );
}
