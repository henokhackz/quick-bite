import React from 'react';

type Room = {
  id: number;
  roomNumber: string;
  capacity: number;
  occupied: number;
  status: 'Available' | 'Partially Occupied' | 'Full';
};

const dummyRooms: Room[] = [
  { id: 1, roomNumber: '101A', capacity: 4, occupied: 3, status: 'Partially Occupied' },
  { id: 2, roomNumber: '102B', capacity: 2, occupied: 2, status: 'Full' },
  { id: 3, roomNumber: '103C', capacity: 3, occupied: 0, status: 'Available' },
  { id: 4, roomNumber: '104D', capacity: 1, occupied: 1, status: 'Full' },
  { id: 5, roomNumber: '105E', capacity: 5, occupied: 2, status: 'Partially Occupied' },
];

const getStatusColor = (status: Room['status']) => {
  switch (status) {
    case 'Available':
      return 'text-green-600';
    case 'Partially Occupied':
      return 'text-yellow-600';
    case 'Full':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export default function DormsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
        <div className='flex items-center justify-between'>
      <h1 className="text-2xl font-semibold mb-4">Dorm Management</h1>
        <button className='px-4 py-2 bg-primary text-white rounded-lg'>add new room</button>
        </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {dummyRooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold mb-1">Room {room.roomNumber}</h2>
            <p>
              <span className="font-medium">Capacity:</span> {room.capacity}
            </p>
            <p>
              <span className="font-medium">Occupied:</span> {room.occupied}
            </p>
            <p className={getStatusColor(room.status) + ' font-semibold mt-1'}>
              {room.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
