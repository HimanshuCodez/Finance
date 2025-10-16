import React from "react";
import "./CustomerMarquee.css";

const testimonials = [
  { id: 1, text: "Business Insurance Has Been Broken for Years", imgSrc: "https://i.pravatar.cc/150?img=1" },
  { id: 2, text: "My quotes have not come for weeks!", imgSrc: "https://i.pravatar.cc/150?img=2" },
  { id: 3, text: "There is too much paperwork to get through!", imgSrc: "https://i.pravatar.cc/150?img=3" },
  { id: 4, text: "I wasn’t aware of the claims process!", imgSrc: "https://i.pravatar.cc/150?img=4" },
  { id: 5, text: "Getting insurance is so complicated!", imgSrc: "https://i.pravatar.cc/150?img=5" },
  { id: 6, text: "I wish it was faster.", imgSrc: "https://i.pravatar.cc/150?img=6" },
];

const CustomerMarquee = () => {
  return (
    <section className="bg-blue-600 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">What Our Customers Are Saying</h2>
      </div>
      <div className="overflow-hidden whitespace-nowrap relative group">
        <div className="marquee-container inline-flex group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center mx-4"
            >
              <img
                src={testimonial.imgSrc}
                alt={`User ${testimonial.id}`}
                className="h-20 w-20 object-cover rounded-full mb-4 border-4 border-blue-200"
              />
              <p className="text-center font-medium">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerMarquee;