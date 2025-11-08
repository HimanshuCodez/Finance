import { ShieldCheck, Headphones, Award, Globe, Users } from "lucide-react";

export default function Coverage() {
  const coverages = [
    {
      icon: ShieldCheck,
      title: "Customer First",
      desc: "We are committed to providing our customers with the best insurance products for their needs.",
    },
    {
      icon: Headphones,
      title: "Round-O-Clock Claim Support",
      desc: "Dedicated mobile numbers for personal assistance in claim support anytime you need.",
    },
    {
      icon: Award,
      title: "Best in Market Plans",
      desc: "Providing you with the latest features and benefits with guaranteed customer satisfaction.",
    },
    {
      icon: Globe,
      title: "Across Market Support",
      desc: "We provide insurance across every sector, so you don’t have to search the market for different policies.",
    },
    {
      icon: Users,
      title: "Expert Team",
      desc: "Our team helps you find the best available products and plans — so you choose what suits you best.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          OUR <span className="text-blue-600">COVERAGE</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {coverages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 hover:text-blue-400 border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="bg-yellow-100 text-blue-700 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
