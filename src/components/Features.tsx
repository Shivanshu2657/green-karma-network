
import { Card } from "@/components/ui/card";
import { TreePalm, Earth, CloudSun } from "lucide-react";

const features = [
  {
    title: "Environmental Impact",
    description: "Track and reduce your carbon footprint through daily actions and choices.",
    icon: Earth,
  },
  {
    title: "Sustainable Living",
    description: "Learn practical tips and strategies for living an eco-friendly lifestyle.",
    icon: TreePalm,
  },
  {
    title: "Climate Action",
    description: "Join our community in taking meaningful steps towards climate protection.",
    icon: CloudSun,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-4">
                <feature.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
