const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-dashboardForeground/80 ">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-primaryLight/10 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">New Policy Update</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            We have updated our policies to ensure better service and communication. Please review the changes.
          </p>
        </div>
        <div className="bg-primary/10 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Upcoming Event</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Join us for our annual community gathering. This event will bring together our community members.
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Service Downtime Notice</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Please be advised of scheduled maintenance that will result in service downtime. We apologize for the inconvenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;

