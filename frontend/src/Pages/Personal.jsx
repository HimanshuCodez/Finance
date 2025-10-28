import React from 'react';

export default function Personal({ personalInsurance }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Personal Insurance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(personalInsurance).map(([category, items]) => (
          <div key={category} className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">{category}</h2>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item} className="text-gray-700 hover:text-yellow-600 transition-colors duration-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}