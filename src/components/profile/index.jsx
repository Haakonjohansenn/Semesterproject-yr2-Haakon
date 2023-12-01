import { useState, useEffect } from 'react';
import { API_URL } from '../../../lib/constants';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.name : null;
  const [userProfile, setUserProfile] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
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
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleAvatarUrlChange = (event) => {
    setNewAvatarUrl(event.target.value);
  };

  const updateAvatar = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/auction/profiles/${userId}/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          avatar: newAvatarUrl,
        }),
      });

      if (response.ok) {
        setUserProfile({
          ...userProfile,
          avatar: newAvatarUrl,
        });
        setNewAvatarUrl('');
        // Call updateAvatar from the context to update the Navbar
        updateAvatar(newAvatarUrl);
      } else {
        console.error('Error updating avatar:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div className="parent-container flex justify-center">
      {userProfile ? (
        <div>
          <h1>Profile Information</h1>
          <div className="avatar-container flex rounded-full w-28 h-28 justify-center bg-my-blue">
            {userProfile.avatar && (
              <img src={userProfile.avatar} alt="Avatar" className="justify-center object-cover rounded-full" />
            )}
          </div>
          <div className="flex">
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
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}
