import { useState } from "react";
import { API_URL } from "../../../lib/constants";
import { Link, useNavigate } from "@tanstack/react-router";

export default function LoginForm() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    console.log("Login submitted with:", credentials);

    const navigateToProfile = () => {
      setTimeout(() => {
        navigate({ to: "/profile" });
      }, 2000);
    };

    try {
      const response = await fetch(`${API_URL}/auction/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;

        // Store the access token securely in localStorage
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("user_name", data.name);

        setAccessToken(newAccessToken);

        navigateToProfile();

        setMessage("Login successful!");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("Your login attempt failed. Please try again.");
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
          </label>
          <input
            className="shadow appearance-none border rounded w-full sm:w-270 py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
          </label>
          <input
            className="shadow appearance-none border rounded w-full sm:w-270 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-my-blue hover:bg-my-blue-light text-white font-bold py-2 px-4 m-auto rounded-3xl h-10 md:h-12 w-full focus:outline-none focus:shadow-outline mb-4"
          type="submit"
        >
          Log In
        </button>
        <p className="text-my-black text-sm my-6 text-center">
          Dont have an account?{" "}
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
