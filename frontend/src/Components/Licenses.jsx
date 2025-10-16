import React from "react";

const CertificateSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl border-2 border-blue-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    We are <span className="text-blue-600">Licensed & Certified</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                    to Always Protect Your Business. Our credentials are a testament to our commitment to quality and trust.
                    </p>
                </div>

                {/* Right Images */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                        <img src="https://images.bimakavach.com/v4/icons/IRDAI_Licensed_Icon.svg" alt="IRDAI License" className="rounded-md w-full h-auto" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <img src="https://images.bimakavach.com/v4/icons/ISNP_Certified_Icon.svg" alt="ISNP Certificate" className="rounded-md w-full h-auto" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;