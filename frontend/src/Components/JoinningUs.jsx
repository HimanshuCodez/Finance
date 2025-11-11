import React, { useState } from 'react';
import ApplyForm from './ApplyForm';

export default function JoinningUs() {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleJoinUsClick = () => {
    setShowJoinForm(true);
  };

  const handleCloseForm = () => {
    setShowJoinForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto bg-slate-200 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
        BENEFITS OF JOINING US AS ISP
      </h2>

      <div className="text-center mt-8">
        <img
          src="https://imgs.search.brave.com/1SqLZfNbkonh-bpvLfvKSaqitauiM4XDpgBjV0o_U6k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/OTY3LzQzMi9zbWFs/bC9uaWdodHRpbWUt/YnVzaW5lc3MtbWVl/dGluZy1pbi1tb2Rl/cm4tb2ZmaWNlLW92/ZXJsb29raW5nLWNp/dHlzY2FwZS1jb3Jw/b3JhdGUtc2V0dGlu/Zy1mb3ItcHJpbnQt/Y2FyZC1wb3N0ZXIt/ZGVzaWduLXBob3Rv/LmpwZw"
          alt="join us"
          className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Get IRDA Approved Partner Code
          </h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Earn Good Commission & Incentives
          </h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Rewards & Recognition - Travel Nationally & Internationally
          </h3>
        </div>
      </div>

      {/* ✅ Centered Join Us Button */}
      <div className="flex justify-center">
        <button
          onClick={handleJoinUsClick}
          className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-8 rounded shadow-md transition"
        >
          Join Us
        </button>
      </div>

      {showJoinForm && (
        <ApplyForm
          onClose={handleCloseForm}
          emailTo="contact@smrfinserv.com"
          subject="Inquiry about Joining Us"
          formTitle="Join Us"
        />
      )}
    </div>
  );
}
