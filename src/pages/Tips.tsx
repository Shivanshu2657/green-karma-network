
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Home, Car, ShoppingBag, Utensils, Zap, Droplets, BookOpen } from "lucide-react";

const Tips = () => {
  const tipCategories = [
    {
      id: "home",
      title: "Home & Energy",
      icon: Home,
      tips: [
        {
          title: "Switch to LED bulbs",
          description: "LED bulbs use up to 80% less energy than traditional incandescent bulbs and last much longer.",
          impact: "Medium",
          effort: "Low"
        },
        {
          title: "Unplug electronics when not in use",
          description: "Many devices continue to draw power even when turned off. Unplugging them or using power strips can eliminate this 'phantom energy' use.",
          impact: "Low",
          effort: "Low"
        },
        {
          title: "Improve home insulation",
          description: "Proper insulation can reduce heating and cooling needs by 20-30%, significantly reducing your carbon footprint.",
          impact: "High",
          effort: "Medium"
        },
        {
          title: "Install a programmable thermostat",
          description: "Automatically adjusting your home temperature when you're away or asleep can reduce energy consumption by 10-15%.",
          impact: "Medium",
          effort: "Medium"
        },
        {
          title: "Switch to renewable energy",
          description: "Many utility companies offer green energy options. Consider solar panels if your home gets adequate sunlight.",
          impact: "High",
          effort: "High"
        }
      ]
    },
    {
      id: "transportation",
      title: "Transportation",
      icon: Car,
      tips: [
        {
          title: "Use public transportation",
          description: "Buses and trains produce significantly fewer emissions per passenger than individual cars.",
          impact: "High",
          effort: "Medium"
        },
        {
          title: "Bike or walk for short trips",
          description: "For distances under 2 miles, walking or biking produces zero emissions and improves your health.",
          impact: "Medium",
          effort: "Medium"
        },
        {
          title: "Maintain your vehicle",
          description: "Regular maintenance improves fuel efficiency. Keep tires properly inflated and change air filters as recommended.",
          impact: "Low",
          effort: "Low"
        },
        {
          title: "Consider an electric or hybrid vehicle",
          description: "When it's time for a new car, electric vehicles produce significantly fewer lifecycle emissions.",
          impact: "High",
          effort: "High"
        },
        {
          title: "Carpool when possible",
          description: "Sharing rides to work or school can cut your transportation emissions by half or more.",
          impact: "Medium",
          effort: "Medium"
        }
      ]
    },
    {
      id: "shopping",
      title: "Consumption & Shopping",
      icon: ShoppingBag,
      tips: [
        {
          title: "Buy second-hand items",
          description: "Purchasing used goods extends product lifecycles and prevents manufacturing emissions.",
          impact: "Medium",
          effort: "Low"
        },
        {
          title: "Choose durable products",
          description: "Invest in quality items that will last longer rather than disposable alternatives.",
          impact: "Medium",
          effort: "Medium"
        },
        {
          title: "Bring reusable bags",
          description: "Single-use plastic bags have a high carbon footprint and create waste. Bring your own cloth bags when shopping.",
          impact: "Low",
          effort: "Low"
        },
        {
          title: "Support eco-friendly companies",
          description: "Research brands and choose those with sustainable practices and environmental commitments.",
          impact: "Medium",
          effort: "Medium"
        },
        {
          title: "Buy local products",
          description: "Locally produced goods require less transportation and often have smaller carbon footprints.",
          impact: "Medium",
          effort: "Medium"
        }
      ]
    },
    {
      id: "food",
      title: "Food & Diet",
      icon: Utensils,
      tips: [
        {
          title: "Reduce meat consumption",
          description: "Animal agriculture is responsible for about 14.5% of global greenhouse gas emissions. Consider meatless days.",
          impact: "High",
          effort: "Medium"
        },
        {
          title: "Choose seasonal and local food",
          description: "Out-of-season food often travels long distances and may be grown in energy-intensive greenhouses.",
          impact: "Medium",
          effort: "Medium"
        },
        {
          title: "Minimize food waste",
          description: "Plan meals, store food properly, and use leftovers. Food waste in landfills produces methane, a potent greenhouse gas.",
          impact: "Medium",
          effort: "Low"
        },
        {
          title: "Compost food scraps",
          description: "Composting reduces methane emissions from landfills and creates nutrient-rich soil for gardens.",
          impact: "Low",
          effort: "Medium"
        },
        {
          title: "Choose sustainable seafood",
          description: "Look for certification labels like MSC that indicate sustainable fishing practices.",
          impact: "Medium",
          effort: "Low"
        }
      ]
    },
    {
      id: "water",
      title: "Water Usage",
      icon: Droplets,
      tips: [
        {
          title: "Take shorter showers",
          description: "Reducing shower time by just 2 minutes can save 10 gallons of water and the energy needed to heat it.",
          impact: "Low",
          effort: "Low"
        },
        {
          title: "Fix leaking faucets",
          description: "A dripping faucet can waste thousands of gallons per year. Fixing leaks saves water and money.",
          impact: "Low",
          effort: "Low"
        },
        {
          title: "Install low-flow fixtures",
          description: "Low-flow showerheads and faucet aerators reduce water consumption without sacrificing pressure.",
          impact: "Medium",
          effort: "Low"
        },
        {
          title: "Collect rainwater",
          description: "Use rain barrels to collect water for garden irrigation, reducing treated water usage.",
          impact: "Low",
          effort: "Medium"
        },
        {
          title: "Run full loads of laundry and dishes",
          description: "Waiting until you have full loads saves both water and energy.",
          impact: "Low",
          effort: "Low"
        }
      ]
    }
  ];

  const getBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Green Living Tips</h1>
        <p className="text-gray-600">
          Small changes in your daily habits can make a significant impact on reducing your carbon footprint. 
          Explore our tips categorized by different aspects of life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {tipCategories.slice(0, 4).map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <category.icon className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {category.tips.slice(0, 3).map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{tip.title}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-gray-500 mt-4">
                And {category.tips.length - 3} more tips...
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">All Tips by Category</h2>
        <div className="space-y-6">
          {tipCategories.map((category) => (
            <Accordion type="single" collapsible key={category.id}>
              <AccordionItem value={category.id}>
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <category.icon className="h-5 w-5 text-green-600" />
                    </div>
                    {category.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {category.tips.map((tip, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{tip.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant={getBadgeVariant(tip.impact)}>
                              Impact: {tip.impact}
                            </Badge>
                            <Badge variant="outline">
                              Effort: {tip.effort}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold">Did You Know?</h2>
        </div>
        
        <div className="space-y-4">
          <p>
            If everyone in the United States replaced just one incandescent light bulb with an LED, 
            we would save enough energy to light 2.5 million homes for a year.
          </p>
          <p>
            A vegetarian diet can reduce your carbon footprint by up to 1.5 tons of carbon dioxide equivalent per year.
          </p>
          <p>
            The average tree can absorb around 22 kilograms of carbon dioxide per year, 
            and a mature tree can absorb up to 48 pounds annually.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Tips;
