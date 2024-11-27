import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Healthcare Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map patient records */}
        <div className="bg-white shadow-md rounded-lg p-4 text-black">
          <h2 className="text-lg font-semibold ">Patient Record</h2>
          <p>Encrypted Data: xyz...</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Retrieve Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
