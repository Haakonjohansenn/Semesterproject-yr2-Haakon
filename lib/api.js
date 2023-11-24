import { API_URL } from "./constants";

export default async function createListing() {
  const url = `${API_URL}/auction/listings`;
  const oneDayFromNow = new Date();
  oneDayFromNow.setDate(oneDayFromNow.getDate() + 1); // Adds one day to the current date

  const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token

  const data = {
      title: "Vintage Artwork", // Example title
      description: "A rare collection of vintage paintings", // Example description
      tags: ["vintage", "art", "paintings"], // Example tags
      media: ["https://source.unsplash.com/random/900%C3%97700/?painting"], // Example image URLs
      endsAt: oneDayFromNow.toISOString() // Timestamp one day from now in ISO format
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`, // Authorization header with bearer token
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.errors?.[0]?.message || "Failed to create listing";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Listing created:', result);
      return result;
  } catch (error) {
      console.error('Error creating listing:', error.message);
  }
}