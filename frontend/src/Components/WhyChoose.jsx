import { CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Wide Customer Satisfaction",
      desc: "Thousands of happy clients across sectors rely on us for seamless service and support.",
    },
    {
      title: "Diverse Insurer Options",
      desc: "Compare policies from multiple top insurance providers easily in one place.",
    },
    {
      title: "Competitive Pricing",
      desc: "Get the best deals without compromising on coverage or wasting time.",
    },
    {
      title: "Claims Process",
      desc: "Simplified claims process designed to minimize hassles and save your time.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          WHY CHOOSE <span className="text-blue-500">US?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition"
            >
              <CheckCircle className="text-blue-500 w-8 h-8 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
