import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { API_URL } from "../../../lib/constants";

export default function RegisterForm() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^(.+)@(stud\.noroff\.no)$/;
    const isValid = emailRegex.test(email);
    const errorMessage = document.getElementById("email-error-message");

    if (!isValid) {
      errorMessage.innerText =
        "Email must contain @stud.noroff.no";
      document.getElementById("submit-button").disabled = true;
    } else {
      errorMessage.innerText = "";
      document.getElementById("submit-button").disabled = false;
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, avatar } = event.target.elements;

    validateEmail(email.value);

    if (document.getElementById("submit-button").disabled) {
      // Email is not valid, abort submission
      return;
    }

    const navigateToLogin = () => {
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
    };

    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value
    };

    try {
      const response = await fetch(`${API_URL}/auction/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;

        // Store the access token securely in localStorage
        localStorage.setItem('accessToken', newAccessToken);

        setAccessToken(newAccessToken);

        navigateToLogin();

        setMessage("Registration successful! Redirecting to login...");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-2xl">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="name"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <p className="text-red-500 text-xs italic" id="email-error-message"></p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="password"
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="avatar"
            type="text"
            placeholder="URL for Your Avatar"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-auto rounded-3xl h-10 md:h-12 w-full focus:outline-none focus:shadow-outline mb-4"
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
