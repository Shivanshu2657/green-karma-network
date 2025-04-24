
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TreeDeciduous, Leaf, Trophy, BookOpen, UserRound, ChartPie } from "lucide-react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  const features = [
    {
      title: "Track Your Impact",
      icon: ChartPie,
      description: "Monitor your carbon footprint by tracking travel, food choices, and more.",
      color: "bg-green-100 text-green-600",
      link: "/tracker"
    },
    {
      title: "Test Your Knowledge",
      icon: BookOpen,
      description: "Challenge yourself with environmental quizzes and learn how to make a difference.",
      color: "bg-blue-100 text-blue-600",
      link: "/quizzes"
    },
    {
      title: "Compete & Share",
      icon: Trophy,
      description: "Join our leaderboard and share your achievements with friends and family.",
      color: "bg-purple-100 text-purple-600",
      link: "/leaderboard"
    },
    {
      title: "Sustainable Living",
      icon: Leaf,
      description: "Discover practical tips and strategies for living a more eco-friendly lifestyle.",
      color: "bg-amber-100 text-amber-600",
      link: "/tips"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Take Action with GREECARE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="outline" className="w-full">Explore</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/tracker">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <UserRound className="mr-2 h-5 w-5" /> Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl text-gray-600 mb-8">
              GREECARE is more than an app—it's a community of people committed to making a positive impact on our planet.
              Together, we can create real change.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <TreeDeciduous size={24} />
                <span className="font-semibold">10,000+ Trees Planted</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Leaf size={24} />
                <span className="font-semibold">50+ Tons CO₂ Reduced</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <UserRound size={24} />
                <span className="font-semibold">5,000+ Active Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Index;
