import CreateListing from "../create-listing";

export default function CreateListingModal({ onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md flex flex-col">
        <CreateListing />
        <button
          onClick={onClose}
          className="mt-4 bg-cta-color text-my-black rounded-lg p-2 font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
