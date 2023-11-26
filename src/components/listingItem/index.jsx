import { useEffect, useState } from "react";
import { API_URL } from "../../../lib/constants";
import { useParams } from "@tanstack/react-router";

export default function ListingItem() {
  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const url = new URL(`${API_URL}/auction/listings/${listingId}`);
        url.searchParams.append("_seller", "true");
        url.searchParams.append("_bids", "true");
        const response = await fetch(
          `${url}`,
          {
            headers: {
              authorization: `bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        setListing(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>No listing found. {error?.message}</h1>;

  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex justify-center gap-16 my-auto">
        <img src={listing?.media} className="w-2/4 h-2/4 object-cover"></img>
        <div className="flex flex-col items-center">
          <div className="">
            <h2 className="font-bold">{listing.title}</h2>
          </div>
          <div className="">
          <h3>Posted by: {listing.seller?.name || 'Unknown Seller'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
