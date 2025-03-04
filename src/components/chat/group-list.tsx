import { Users } from "lucide-react";
import Image from "next/image";

export default function GroupList({ groups, onSelect }: { groups: any[]; onSelect: (group: any) => void }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Groups</h2>
      <ul className="space-y-3">
        {groups.map((group) => (
          <li
            key={group.id}
            className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(group)}
          >
            <div className="flex items-center gap-3">
              <Image src={'/avatar.png'} height={20} width={20} alt="Group Avatar" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-gray-500">{group.onlineCount} members online</p>
              </div>
            </div>
            <Users className="text-gray-500" size={20} />
          </li>
        ))}
      </ul>
    </div>
  );
}
