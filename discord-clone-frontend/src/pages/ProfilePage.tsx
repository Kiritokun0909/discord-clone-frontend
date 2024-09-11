import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { updateUser } from '../redux/slices/userSlice';

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user.avatarUrl || '');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    // For this example, we'll just update the Redux store
    dispatch(updateUser({ username, email, avatarUrl: previewUrl }));
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2">Avatar</label>
            <div className="flex items-center space-x-4">
              <img
                src={previewUrl || 'https://via.placeholder.com/100'}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Upload New Avatar
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
