
import { Button } from "@/components/ui/button";
import { Tree, Leaf } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-purple-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-green-600">
          <Tree size={40} />
        </div>
        <div className="absolute bottom-10 right-10 text-green-600">
          <Leaf size={40} />
        </div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
          Welcome to <span className="text-green-600">GREE</span>
          <span className="text-purple-600">CARE</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto">
          Join us in creating a sustainable future through environmental consciousness and community action.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
