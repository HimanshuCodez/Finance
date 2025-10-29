import React from 'react';

export default function JoinningUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
        BENEFITS OF JOINING US
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-yellow-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Get IRDA Approved partner Code</h3>
          {/* Optional: Add an icon here */}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-yellow-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Earn Good Commission & Incentives</h3>
          {/* Optional: Add an icon here */}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-yellow-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Rewards & Recognition - Travel Nationally & Internationally</h3>
          {/* Optional: Add an icon here */}
        </div>
      </div>
    </div>
  );
}
