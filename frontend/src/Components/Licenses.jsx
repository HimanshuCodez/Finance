import React from "react";

const CertificateSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6"> {/* Changed gap for separate boxes and added px-4 */}
            {/* Left Content (Descriptive Text + IRDAI License) */}
            <div className="bg-white p-8 rounded-xl border-2 border-blue-500 flex flex-col md:items-start">
                {/* Inner container for text and image, arranged side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Text content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        We are <span className="text-blue-600">Licensed & Certified</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                        to Always Protect Your Business. Our credentials are a testament to our commitment to quality and trust.
                        </p>
                    </div>
                    {/* IRDAI License */}
                    <div className=" rounded-lg text-center">
                        <img src="https://www.careerpower.in/blog/wp-content/uploads/2024/09/03184707/IRDAI-Assistant-Manager-Admit-Card-2024.webp" alt="IRDAI License" className="rounded-md w-full h-auto mx-auto" />
                        <p className="mt-2 text-lg text-gray-600"><b>IMF08790220250768</b></p>
                    </div>
                </div>
            </div>

            {/* Right Content (ONLY START UP INDIA Registration) */}
            <div className="bg-white p-8 rounded-xl border-2 border-blue-500 flex flex-col items-center justify-center">
                <div className=" rounded-lg text-center">
                    <p className="mb-2 text-lg text-gray-600"><b>START UP INDIA Registration No - DIPP235865</b></p>
                    <img src="/download.jpeg" alt="START UP INDIA" className="rounded-md h-auto max-w-xs mx-auto" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;