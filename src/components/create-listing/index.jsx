import { API_URL } from "../../../lib/constants";
import { useState } from "react";

export default function CreateListing() {
  const date = new Date;
  
  const [formData, setFormData] = useState({
    title: "",
    endsAt: date.toISOString().split('T')[0],
    media: [],
    description: "",
  });

  const [isListingCreated, setListingCreated] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'endsAt' ? formatDateString(value) : value,
    }));
  };
  
  const formatDateString = (dateString) => {
    const selectedDate = new Date(dateString);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    return formattedDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken")

      JSON.stringify(formData)

      const response = await fetch(`${API_URL}/auction/listings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          endsAt: formData.endsAt,
          media: Array.isArray(formData.media) ? formData.media : [formData.media],
          description: formData.description,
        }),
      });

      if (response.ok) {
        console.log("Listing created successfully!");
        setListingCreated(true);
      } else {
        const responseBody = await response.json();
        console.error("Failed to create listing. Server returned:", response.status, response.statusText, responseBody);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            name="endsAt"
            value={formData.endsAt} 
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="media" className="block text-sm font-medium text-gray-700">
            Media URL
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={formData.media}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className={`bg-cta-color text-my-black rounded-lg p-2 font-semibold transition ${isListingCreated ? "bg-success-green" : ""}`}
          disabled={loading}
        >
          {isListingCreated ? "Listing Created" : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
