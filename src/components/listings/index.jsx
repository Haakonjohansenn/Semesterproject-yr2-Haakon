import { API_URL } from "../../../lib/constants";
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
      <div className="listing-container">
        {listings.map(({id, title, media, updated}) => (
                    <div key={id} className="listing-item bg-cyan-400 w-40">
                    <h2>{title}</h2>
                    {/* Display other properties as needed, for example: */}
                    <p>Updated: {updated}</p>
                    {/* Add more properties as needed */}
                  </div>
        ))}
      </div>
    </div>
  )
}