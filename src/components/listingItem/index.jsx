import { useEffect, useState } from "react";
import { API_URL } from "../../../lib/constants";
import { useParams } from "@tanstack/react-router";

export default function ListingItem() {
  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchListing = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Current URL:', window.location.href);

        console.log('Listing ID from URL:', listingId);
        const response = await fetch(`${API_URL}/auction/listings/${listingId}`, {
          headers: {
            authorization: `bearer ${accessToken}`
          }
        });
        
        const data = await response.json();
        setListing(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListing()
  },[listingId])

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>No listing found. {error?.message}</h1>;

  return (
    <div className="flex flex-row justify-center">
      <div className="flex justify-center">
        <img src={listing?.media} className="w-2/4"></img>
      </div>
      <div className="flex justify-center">
        <div><h2>{listing.title}</h2></div>
        <div><p>{listing.description}</p></div>
      </div>
    </div>
  )
}