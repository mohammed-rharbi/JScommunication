import axios from "axios";
import React from "react";

type UserCardProp = {
  UserName: string;
  id: string;
};

const UserCard: React.FC<UserCardProp> = ({ UserName, id }) => {




  const handleAddFriend = async () => {

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.log("User not found or not logged in");
      return;
    }

    try {

      const res = await axios.post(`http://localhost:3000/friends/request/${userId}/send/${id}`);

      console.log(res.data);

    } catch (err) {
      
      console.error("Error adding this friend:", err); 
    }
  };

  return (
    <div key={id} className="p-4 bg-gray-600 rounded-lg shadow-md flex items-center mb-4 space-x-4">
      <img
        className="h-16 w-16 rounded-full"
        src="public/avatar.png"
        alt="User's Avatar"
      />
      <div className="flex-1">
        <div className="space-y-0.5">
          <p className="text-base text-white font-semibold">{UserName}</p>
          <p className="text-gray-300 text-sm font-medium">Product Engineer</p>
        </div>
        <div className="mt-3 space-x-2">
          <button className="px-3 py-1 text-xs text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            Message
          </button>
          <button
            onClick={handleAddFriend}
            className="px-3 py-1 text-xs text-green-200 font-semibold rounded-full border border-green-400 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
  