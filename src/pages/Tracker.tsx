
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Car, Bike, Train, Utensils, Apple, 
  Leaf, TreeDeciduous, Plus, Info 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Tracker = () => {
  const { toast } = useToast();
  const [carbonScore, setCarbonScore] = useState(0);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [travelMode, setTravelMode] = useState("car");
  const [travelDistance, setTravelDistance] = useState("");
  const [foodType, setFoodType] = useState("meat");
  const [newTrees, setNewTrees] = useState("");

  const handleTravelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelDistance) return;

    let carbonImpact = 0;
    const distance = parseFloat(travelDistance);
    
    switch(travelMode) {
      case "car":
        carbonImpact = distance * 0.12; // kg CO2 per km
        break;
      case "bus":
        carbonImpact = distance * 0.05; // kg CO2 per km
        break;
      case "bike":
        carbonImpact = 0; // No direct emissions
        break;
      case "train":
        carbonImpact = distance * 0.03; // kg CO2 per km
        break;
    }
    
    setCarbonScore(prev => prev + carbonImpact);
    
    toast({
      title: "Travel logged!",
      description: `Added ${carbonImpact.toFixed(2)} kg of CO2 to your footprint.`,
    });
    
    setTravelDistance("");
  };

  const handleFoodSubmit = () => {
    let carbonImpact = 0;
    
    switch(foodType) {
      case "meat":
        carbonImpact = 7.0; // kg CO2 equivalent
        break;
      case "dairy":
        carbonImpact = 3.0;
        break;
      case "vegan":
        carbonImpact = 1.5;
        break;
      case "vegetarian":
        carbonImpact = 2.0;
        break;
    }
    
    setCarbonScore(prev => prev + carbonImpact);
    
    toast({
      title: "Meal logged!",
      description: `Added ${carbonImpact.toFixed(2)} kg of CO2 to your footprint.`,
    });
  };

  const handlePlantTrees = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrees) return;
    
    const trees = parseInt(newTrees);
    setTreesPlanted(prev => prev + trees);
    
    // Each tree absorbs roughly 22kg of CO2 per year
    const carbonOffset = trees * 22;
    setCarbonScore(prev => Math.max(0, prev - carbonOffset));
    
    toast({
      title: "Trees planted!",
      description: `You planted ${trees} trees, offsetting approximately ${carbonOffset} kg of CO2 per year.`,
    });
    
    setNewTrees("");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Carbon Footprint Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Leaf className="text-green-600" /> Carbon Score
          </h2>
          <p className="text-3xl font-bold text-gray-700">{carbonScore.toFixed(2)} kg</p>
          <p className="text-sm text-gray-500 mt-1">CO₂ equivalent</p>
          <Progress value={Math.min(carbonScore / 200 * 100, 100)} className="mt-4" />
          <p className="text-xs text-gray-500 mt-2">
            {carbonScore < 50 ? "Great! Your carbon footprint is low." : 
             carbonScore < 150 ? "Your carbon footprint is moderate." : 
             "Your carbon footprint is high. Consider reducing emissions."}
          </p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <TreeDeciduous className="text-green-600" /> Trees Planted
          </h2>
          <p className="text-3xl font-bold text-gray-700">{treesPlanted}</p>
          <p className="text-sm text-gray-500 mt-1">Total trees</p>
          <form onSubmit={handlePlantTrees} className="mt-4 flex gap-2">
            <Input
              type="number"
              min="1"
              placeholder="How many?"
              value={newTrees}
              onChange={e => setNewTrees(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Plus size={16} className="mr-1" /> Add
            </Button>
          </form>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Carbon Offset</h2>
          <p className="text-3xl font-bold text-gray-700">{(treesPlanted * 22).toFixed(2)} kg</p>
          <p className="text-sm text-gray-500 mt-1">CO₂ absorbed per year</p>
          <div className="flex items-center gap-1 mt-4 text-xs text-gray-500">
            <Info size={14} />
            <p>Each tree absorbs about 22kg of CO₂ per year</p>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="travel" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="travel">Transport</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
        </TabsList>
        
        <TabsContent value="travel">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Log Your Transportation</h2>
            <form onSubmit={handleTravelSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mode of Transport</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    type="button"
                    variant={travelMode === "car" ? "default" : "outline"}
                    className={travelMode === "car" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setTravelMode("car")}
                  >
                    <Car className="mr-2 h-4 w-4" /> Car
                  </Button>
                  <Button 
                    type="button"
                    variant={travelMode === "bus" ? "default" : "outline"}
                    className={travelMode === "bus" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setTravelMode("bus")}
                  >
                    <Car className="mr-2 h-4 w-4" /> Bus
                  </Button>
                  <Button 
                    type="button"
                    variant={travelMode === "bike" ? "default" : "outline"}
                    className={travelMode === "bike" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setTravelMode("bike")}
                  >
                    <Bike className="mr-2 h-4 w-4" /> Bike
                  </Button>
                  <Button 
                    type="button"
                    variant={travelMode === "train" ? "default" : "outline"}
                    className={travelMode === "train" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setTravelMode("train")}
                  >
                    <Train className="mr-2 h-4 w-4" /> Train
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Distance (km)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Distance in kilometers"
                    value={travelDistance}
                    onChange={e => setTravelDistance(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Log Journey
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="food">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Log Your Food</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Meal Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    type="button"
                    variant={foodType === "meat" ? "default" : "outline"}
                    className={foodType === "meat" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setFoodType("meat")}
                  >
                    <Utensils className="mr-2 h-4 w-4" /> Meat-based
                  </Button>
                  <Button 
                    type="button"
                    variant={foodType === "dairy" ? "default" : "outline"}
                    className={foodType === "dairy" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setFoodType("dairy")}
                  >
                    <Utensils className="mr-2 h-4 w-4" /> With Dairy
                  </Button>
                  <Button 
                    type="button"
                    variant={foodType === "vegetarian" ? "default" : "outline"}
                    className={foodType === "vegetarian" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setFoodType("vegetarian")}
                  >
                    <Apple className="mr-2 h-4 w-4" /> Vegetarian
                  </Button>
                  <Button 
                    type="button"
                    variant={foodType === "vegan" ? "default" : "outline"}
                    className={foodType === "vegan" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setFoodType("vegan")}
                  >
                    <Apple className="mr-2 h-4 w-4" /> Vegan
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleFoodSubmit} className="bg-green-600 hover:bg-green-700">
                Log Meal
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracker;
