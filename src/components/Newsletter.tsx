
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Stay Updated with GREECARE
        </h2>
        <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest updates on environmental initiatives and sustainable living tips.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
