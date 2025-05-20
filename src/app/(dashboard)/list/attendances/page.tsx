import AttendanceChart from '@/components/charts/Attendance-chart'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import React from 'react'

const Attendaces = async () => {
  const { user }: any = await auth()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center bg-white px-6 py-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Access Denied</h2>
          <p className="text-sm text-gray-500 mt-2">Please login to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex items-center justify-between">
          {user.role === 'admin' && (
            <Link
              href="/list/attendances/attendance-tracker"
              className="text-sm flex-end text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200"
            >
              View All Records
            </Link>
          )}
        </div>
        <div className='flex flex-col items-center h-[80vh] w-full  justify-center'>
          <AttendanceChart />
        </div>
      </div>
    </div>
  )
}

export default Attendaces
