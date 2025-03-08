import { User as PrismaUser} from "@prisma/client";
import User from "./user";
import { Loader2 } from "lucide-react";

export default function UserList({ users, onSelect, isLoading }: { users:PrismaUser[]; onSelect: (user: PrismaUser) => void , isLoading:boolean}) {

  if(isLoading){
    return <div className="w-full items-center justify-center">
      <Loader2 className='w-6 h-6 animate-spin text-gray-500' />
    </div>
  }
  return (
    <div className="p-4 bg-white rounded-lg  max-h-[500px] overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-3">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <User key={user.id} user={user} onSelect={onSelect} isLoading={isLoading}/>
        ))}
      </ul>
    </div>
  );
}
