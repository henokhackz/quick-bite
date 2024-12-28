const Update = () => {
    return (
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Recent Updates</h1>
          <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-primaryLight/10 rounded-md p-4">
            <div className="flex items-center justify-between ">
              <h2 className="font-medium">New features for student service</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              We have added new features that will help student service staff to manage student requests more efficiently.
            </p>
          </div>
          <div className="bg-primary/10 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Bug fixes</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              We have fixed some bugs that were causing issues with the app.
            </p>
          </div>
          <div className="bg-primaryLight/10 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Performance optimization</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              We have optimized the app to make it faster and more responsive.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Update;

