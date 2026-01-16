import React from "react";

const Certificate = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="bg-white p-2 rounded-xl border-2 border-blue-500">
            <div className="grid md:grid-cols-1 gap-12 items-center">
                {/* Image */}
                <div className="text-center">
                    <img src="/cert.jpeg" alt="Certificate" className="rounded-md w-full h-auto mx-auto max-w-2xl" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
