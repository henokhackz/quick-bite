'use client'
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UserSearchBar({ users, onSelect }: { users: any[]; onSelect: (user: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-3 text-gray-500" size={20} />
      </div>

      {/* Filtered User List */}
      <ul className="mt-3 space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(user)}
            >
              <Image src={'/avatar.png'} height={20} width={20} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.status === "online" ? "Online" : "Offline"}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-2">No users found</p>
        )}
      </ul>
    </div>
  );
}

