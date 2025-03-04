import { CheckCircle, Circle } from "lucide-react";
import Image from "next/image";

export default function UserList({ users, onSelect }: { users: any[]; onSelect: (user: any) => void }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(user)}
          >
            <div className="flex items-center gap-3">
              <Image src={'/avatar.png'} height={20} width={20} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.status === "online" ? "Online" : "Offline"}</p>
              </div>
            </div>
            {user.status === "online" ? <CheckCircle className="text-green-500" size={20} /> : <Circle className="text-gray-400" size={20} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
