import { API_URL } from "../../lib/constants";
import { useState, useEffect } from "react";
import CreateListingModal from "../components/create-listing-modal";
import { Link } from "@tanstack/react-router";

export default function FetchListings() {
  const [loading, setIsLoading] = useState(true);
  const [listings, setListing] = useState([]);
  const [searchInput, handleOnSearch] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    handleOnSearch(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(loading);
        const accessToken = localStorage.getItem('accessToken');

        const url = new URL(`${API_URL}/auction/listings`);

        url.searchParams.append("_seller", "true");
        url.searchParams.append("_bids", "true");

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
    };

    fetchListings();
  }, [searchInput]);

  return (
    <div>
      <div className="parent-hero-banner bg-nav-color w-full max-h-60 pb-2 flex justify-between">
        <div className="hero-banner-img-container w-2/4 h-full max-h-60 flex flex-row justify-between">
          <img src="hero-banner-image.jpg" className="w-full max-h-60 object-cover rounded-xl" alt="hero-banner" />
        </div>
        <div className="hero-banner-text-container w-2/4 flex flex-col justify-center">
          <h2 className="text-white font-bold text-lg md:text-3xl text-center leading-tight tracking-tight">
            Unleash the Bids,
            <span className="block">Seize the Wins.</span>
          </h2>
          <div className="create-listing-container flex justify-center mt-4">
            <button
              onClick={openModal}
              className="bg-cta-color text-my-black rounded-xl px-2 py-1 text-sm font-semibold md:text-lg"
            >
              Create Listing
            </button>
          </div>
        </div>
      </div>

      <div className="search-bar-container mt-4 mb-8">
        <input
          type="text"
          placeholder="Search by title"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="p-2 border border-solid rounded-md w-64 md:w-96"
        />
      </div>

      <div className="listing-container flex flex-wrap gap-8 justify-center">
        {listings.map(({ id, title, media, description, endsAt, seller }) => (
          <div key={id} className="listing-item w-72 text-center md:w-1/4 border-2 border-solid rounded-lg border-x-my-black">
            {media && (
              <img
                src={media}
                className="object-cover w-full h-40"
                alt="listing-image"
                onError={(e) => {
                  e.target.src = "https://source.unsplash.com/300x200/?placeholder";
                }}
              />
            )}
            <h2>{title}</h2>
            <div>
              <p>{description}</p>
            </div>
            <p>Deadline: {endsAt}</p>
            <p>Seller: {seller.name} </p>
            <div>
            <Link to={`/listingitem/${id}?id=${id}`}>
              <button className="rounded-xl bg-cta-color py-1 px-2 font-semibold my-2">
                View Listing
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <CreateListingModal onClose={closeModal} />}
    </div>
  );
}
