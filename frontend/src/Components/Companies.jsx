import React from "react";

const companies = [
  { id: 1, name: "Company 1", imgSrc: "https://images.bimakavach.com/v4/bk-clients/fam-pay.webp" },
  { id: 2, name: "Company 2", imgSrc: "https://images.bimakavach.com/v4/bk-clients/lg.webp" },
  { id: 3, name: "Company 3", imgSrc: "https://images.bimakavach.com/v4/bk-clients/nirog-street.webp" },
  { id: 4, name: "Company 4", imgSrc: "https://images.bimakavach.com/v4/bk-clients/tscl.webp" },
  { id: 5, name: "Company 5", imgSrc: "https://images.bimakavach.com/v4/bk-clients/rtc.webp" },
  { id: 6, name: "Company 6", imgSrc: "https://images.bimakavach.com/v4/bk-clients/godrej-korber.webp" },
  { id: 7, name: "Company 7", imgSrc: "https://images.bimakavach.com/v4/bk-clients/register-karo.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/apps-for-bharat.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/kriti.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/hosteler.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/saraca.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/big-haat.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/bliss-club.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/whole-truth.webp" },
  { id: 8, name: "Company 8", imgSrc: "https://images.bimakavach.com/v4/bk-clients/teachmint.webp" },
];

const TestimonialCompanies = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Trusted by Companies
        </h2>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 items-center justify-items-center">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={company.imgSrc}
                alt={company.name}
                className="h-12 md:h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCompanies;
