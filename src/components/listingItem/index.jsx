import { useEffect, useState } from "react";
import { API_URL } from "../../../lib/constants";
import { useParams } from "@tanstack/react-router";
import { useAuth } from "../authContext";
import { CountdownTimer } from "../../pages/Home";

const getTimeDifference = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = now - createdDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

export default function ListingItem() {
  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidValue, setBidValue] = useState("");
  const { updateCredits } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.name : null; 

  const toggleBidInput = () => {
    setShowBidInput(!showBidInput);
  };

  const handleBidSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = new URL(`${API_URL}/auction/listings/${listingId}/bids`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(bidValue) }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Bid placed successfully:", responseData);

        const creditsResponse = await fetch(`${API_URL}/auction/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json();
          const newCredits = creditsData.credits;
          updateCredits(newCredits);
        } else {
          setError(error)
        }

        setShowBidInput(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to place bid:", errorData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const url = new URL(`${API_URL}/auction/listings/${listingId}`);
        url.searchParams.append("_seller", "true");
        url.searchParams.append("_bids", "true");
        const response = await fetch(`${url}`, {
          headers: {
            authorization: `bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setListing(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const highestBid = listing?.bids && listing.bids.reduce((maxBid, bid) => (bid.amount > maxBid.amount ? bid : maxBid), listing.bids[0]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>No listing found. {error?.message}</h1>;

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-wrap justify-center gap-8 mt-36">
        <div className="w-3/4 h-2/5 bg-eggshell flex justify-center md:w-7/12 md:h-80">
          <img src={listing?.media} className="h-3/3 w-7/12 object-cover md:w-7/12 md:h-80 flex justify-center"></img>
        </div>
        <div className="flex flex-col">
          <div className="">
            <h2 className="font-bold">{listing.title}</h2>
          </div>
          <div className="">
            <h3>Posted by: {listing.seller?.name || "Unknown Seller"}</h3>
          </div>
          <div className="flex flex-col mt-8">
            <div className="mb-4">
              Winning bid:{" "}
              {highestBid && (
                <div>
                  <p className="text-my-black">
                    {highestBid.bidderName || "Unknown User"} bid: {highestBid.amount}
                  </p>
                  <p className="text-my-black">{getTimeDifference(highestBid.created)}</p>
                  <div className="my-2">Listing ends in: <CountdownTimer deadline={listing.endsAt} /></div>
                </div>
              )}
            </div>
            <div className="flex justify-center md:mt-8">
              <button className="bg-cta-color p-4 rounded-2xl" onClick={toggleBidInput}>
                Place Bid
              </button>
            </div>
            {showBidInput && (
              <div className="flex flex-col items-center mt-4">
                <input
                  type="number"
                  value={bidValue}
                  onChange={(e) => setBidValue(e.target.value)}
                  placeholder="Enter your bid"
                  className="p-2 border rounded-md"
                />
                <button className="bg-cta-color p-2 rounded-md mt-2" onClick={handleBidSubmit}>
                  Submit Bid
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
