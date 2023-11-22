import { API_URL } from "../../lib/constants";
import { useState, useEffect } from "react";

export default function FetchListings() {
  const [loading , setIsLoading] = useState(true);
  const [listings, setListing] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  const handleOnSearch = (input) => {
    setSearchInput(input);
  };

  useEffect(()=> {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem("access_token");
        
        const url = new URL(`${API_URL}/auction/listings`);

        const listingResponse = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); 

        const listings = await listingResponse.json();

        console.log(listings);

        const filteredListings = listings.filter((listing) => {
          return listing.title.toLowerCase().includes(searchInput.toLowerCase());
        });

        setListing(filteredListings);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
  },[searchInput])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="parent-hero-banner h-40 bg-nav-color w-full">
        <div className="hero-banner-img-container w-40 h-40">
          <img src="hero-banner-image.jpg" className="h-full object-cover"></img>
        </div>
        <div className="hero-banner-text-container">
          <h2 className="text-white">Unleash the Bids, Seize the Wins.</h2>
        </div>
      </div>
      <div className="listing-container flex flex-wrap gap-8 justify-center">
        {listings.map(({ id, title, media, description, endsAt }) => (
          <div key={id} className="listing-item bg-gray-700 w-72 text-center md:w-1/4 border-2 border-solid rounded-lg border-x-my-black">
            {media && (
              <img
              src={media}
              className="object-cover w-full h-40"
              alt="listing-image"
              onError={(e) => {
                e.target.src = "https://source.unsplash.com/300x200/?placeholder"
              }}
              />
              )}
              <h2>{title}</h2>
            <div>
              <p>
                {description}
              </p>
            </div>
            <p>Deadline: {endsAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}