import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { API_URL } from "../../../lib/constants";
import { CountdownTimer } from "../../pages/Home";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.name : null;
  const [userProfile, setUserProfile] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [listings, setListings] = useState();
  const [listingsBid, setListingsBid] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${API_URL}/auction/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userProfileData = await response.json();
          setUserProfile(userProfileData);
        } else {
          // Handle error (e.g., token expired, unauthorized)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(loading);
        const accessToken = localStorage.getItem("accessToken");

        const url = new URL(
          `${API_URL}/auction/profiles/${userId}/listings/?_active=true`
        );
        url.searchParams.append("_seller", "true");
        url.searchParams.append("_bids", "true");

        const listingResponse = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const fetchedListings = await listingResponse.json();

        setListings(fetchedListings);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleAvatarUrlChange = (event) => {
    setNewAvatarUrl(event.target.value);
  };

  const updateAvatar = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_URL}/auction/profiles/${userId}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            avatar: newAvatarUrl,
          }),
        }
      );

      if (response.ok) {
        setUserProfile({
          ...userProfile,
          avatar: newAvatarUrl,
        });
        setNewAvatarUrl("");
        // Call updateAvatar from the context to update the Navbar
        updateAvatar(newAvatarUrl);
      } else {
        console.error("Error updating avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="parent-container flex justify-center">
      {userProfile ? (
        <div className="flex flex-col justify-center">
          <div className="avatar-container flex rounded-full w-28 h-28 justify-center bg-my-blue">
            {userProfile.avatar && (
              <img
                src={userProfile.avatar}
                alt="Avatar"
                className="object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex justify-center">
            <input
              type="url"
              placeholder="URL for avatar image"
              className="w-44 border-2 border-solid"
              value={newAvatarUrl}
              onChange={handleAvatarUrlChange}
            />
            <button
              onClick={updateAvatar}
              className="ml-2 bg-cta-color text-my-black rounded-md px-2 py-1 text-sm font-semibold md:text-lg"
            >
              Update Avatar
            </button>
          </div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Credits: {userProfile.credits}</p>
          <div className="listing-container flex flex-wrap gap-8 justify-center">
            {Array.isArray(listings) && listings.length > 0 ? (
              listings.map(
                ({ id, title, media, description, endsAt, bids }) => (
                  <div
                    key={id}
                    className="listing-item w-72 text-center md:w-1/4 rounded-lg shadow-lg border-x-my-black"
                  >
                    <h2>{title}</h2>
                    <div>
                      <img src={media} alt="listing-image" />
                    </div>
                    <p>{description}</p>
                    <div></div>
                    <div>
                      Listing Enda in:
                      <CountdownTimer deadline={endsAt} />
                    </div>
                    <div>
                      {Array.isArray(bids) && bids.length > 0 ? (
                        bids.map((bid) => (
                          <div key={bid.id}>
                            <div></div>
                            <p>{bid.bidderName} Bid:</p>
                            <p>{bid.amount}</p>
                          </div>
                        ))
                      ) : (
                        <p>No bids available for this listing.</p>
                      )}
                      <div>
                        <Link to={`/listingitem/${id}?id=${id}`}>
                          <button className="rounded-xl bg-cta-color py-1 px-2 font-semibold my-2">
                            View Listing
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No listings available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}
