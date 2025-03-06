import { User as PrismaUser} from "@prisma/client";
import User from "./user";

export default function UserList({ users, onSelect, isLoading }: { users:PrismaUser[]; onSelect: (user: PrismaUser) => void , isLoading:boolean}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow max-h-[500px] overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-3">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <User key={user.id} user={user} onSelect={onSelect} isLoading={isLoading}/>
        ))}
      </ul>
    </div>
  );
}
