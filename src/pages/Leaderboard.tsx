
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TreeDeciduous, Trophy, Share2, Medal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample user data
const users = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    username: "eco_emma", 
    avatar: "", 
    treesPlanted: 87, 
    carbonSaved: 1240, 
    quizPoints: 750 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    username: "green_mike", 
    avatar: "", 
    treesPlanted: 65, 
    carbonSaved: 980, 
    quizPoints: 620 
  },
  { 
    id: 3, 
    name: "Sofia Rodriguez", 
    username: "sustainable_sofia", 
    avatar: "", 
    treesPlanted: 103, 
    carbonSaved: 1450, 
    quizPoints: 840 
  },
  { 
    id: 4, 
    name: "David Park", 
    username: "eco_dave", 
    avatar: "", 
    treesPlanted: 42, 
    carbonSaved: 720, 
    quizPoints: 550 
  },
  { 
    id: 5, 
    name: "Aisha Khan", 
    username: "planet_protector", 
    avatar: "", 
    treesPlanted: 94, 
    carbonSaved: 1320, 
    quizPoints: 790 
  },
  { 
    id: 6, 
    name: "James Wilson", 
    username: "green_james", 
    avatar: "", 
    treesPlanted: 38, 
    carbonSaved: 680, 
    quizPoints: 490 
  },
  { 
    id: 7, 
    name: "Olivia Brown", 
    username: "eco_olivia", 
    avatar: "", 
    treesPlanted: 76, 
    carbonSaved: 1120, 
    quizPoints: 710 
  },
];

type LeaderboardType = "trees" | "carbon" | "quiz";

const Leaderboard = () => {
  const { toast } = useToast();
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("trees");

  const sortedUsers = [...users].sort((a, b) => {
    if (leaderboardType === "trees") {
      return b.treesPlanted - a.treesPlanted;
    } else if (leaderboardType === "carbon") {
      return b.carbonSaved - a.carbonSaved;
    } else {
      return b.quizPoints - a.quizPoints;
    }
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const handleShare = (user: typeof users[0], rank: number) => {
    // In a real app, this would open a social sharing dialog
    let shareText = "";
    
    if (leaderboardType === "trees") {
      shareText = `${user.name} has planted ${user.treesPlanted} trees to help our planet! Join GREECARE to make a difference.`;
    } else if (leaderboardType === "carbon") {
      shareText = `${user.name} has saved ${user.carbonSaved}kg of CO2 emissions through GREECARE! Join us in fighting climate change.`;
    } else {
      shareText = `${user.name} has earned ${user.quizPoints} points in environmental quizzes on GREECARE! Test your knowledge too.`;
    }
    
    // In a real implementation, this would use the Web Share API or a social sharing library
    console.log("Sharing:", shareText);
    
    toast({
      title: "Sharing Success!",
      description: "Your achievement has been shared with your network.",
    });
  };

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-700";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">GREECARE Leaderboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Celebrating our top contributors making a difference for our planet.
          Plant trees, reduce your carbon footprint, and complete quizzes to climb the ranks!
        </p>
      </div>
      
      <Tabs defaultValue="trees" className="mb-12" onValueChange={(value) => setLeaderboardType(value as LeaderboardType)}>
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="trees" className="flex items-center gap-1">
            <TreeDeciduous className="h-4 w-4" /> Trees Planted
          </TabsTrigger>
          <TabsTrigger value="carbon">Carbon Saved</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Points</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trees" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedUsers.slice(0, 3).map((user, index) => (
              <Card key={user.id} className={`p-6 text-center ${index === 0 ? 'border-2 border-yellow-500' : ''}`}>
                <div className="relative">
                  <Avatar className="mx-auto h-20 w-20 border-4 border-green-100">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-green-600 text-white text-xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} text-white font-bold`}>
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-4">{user.name}</h3>
                <p className="text-gray-500 text-sm">@{user.username}</p>
                
                <div className="mt-4">
                  <p className="text-3xl font-bold text-green-600">{user.treesPlanted}</p>
                  <p className="text-sm text-gray-600">Trees Planted</p>
                </div>
                
                {index < 3 && (
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => handleShare(user, index + 1)}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share Achievement
                  </Button>
                )}
              </Card>
            ))}
          </div>
          
          <Card>
            <div className="divide-y">
              {sortedUsers.map((user, index) => (
                <div key={user.id} className="flex items-center p-4">
                  <div className="w-8 text-center font-medium">
                    {index < 3 ? (
                      <Trophy className={`h-5 w-5 mx-auto ${getMedalColor(index)}`} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  <Avatar className="ml-4 h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-green-100 text-green-600">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold">{user.treesPlanted}</p>
                    <p className="text-xs text-gray-500">Trees</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="carbon" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedUsers
              .sort((a, b) => b.carbonSaved - a.carbonSaved)
              .slice(0, 3)
              .map((user, index) => (
                <Card key={user.id} className={`p-6 text-center ${index === 0 ? 'border-2 border-yellow-500' : ''}`}>
                  <div className="relative">
                    <Avatar className="mx-auto h-20 w-20 border-4 border-green-100">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-green-600 text-white text-xl">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} text-white font-bold`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-4">{user.name}</h3>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-green-600">{user.carbonSaved}</p>
                    <p className="text-sm text-gray-600">kg CO₂ Saved</p>
                  </div>
                  
                  {index < 3 && (
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full"
                      onClick={() => handleShare(user, index + 1)}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share Achievement
                    </Button>
                  )}
                </Card>
              ))}
          </div>
          
          <Card>
            <div className="divide-y">
              {sortedUsers
                .sort((a, b) => b.carbonSaved - a.carbonSaved)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center p-4">
                    <div className="w-8 text-center font-medium">
                      {index < 3 ? (
                        <Trophy className={`h-5 w-5 mx-auto ${getMedalColor(index)}`} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    <Avatar className="ml-4 h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">{user.carbonSaved}</p>
                      <p className="text-xs text-gray-500">kg CO₂</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedUsers
              .sort((a, b) => b.quizPoints - a.quizPoints)
              .slice(0, 3)
              .map((user, index) => (
                <Card key={user.id} className={`p-6 text-center ${index === 0 ? 'border-2 border-yellow-500' : ''}`}>
                  <div className="relative">
                    <Avatar className="mx-auto h-20 w-20 border-4 border-green-100">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-green-600 text-white text-xl">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} text-white font-bold`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-4">{user.name}</h3>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-green-600">{user.quizPoints}</p>
                    <p className="text-sm text-gray-600">Quiz Points</p>
                  </div>
                  
                  {index < 3 && (
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full"
                      onClick={() => handleShare(user, index + 1)}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share Achievement
                    </Button>
                  )}
                </Card>
              ))}
          </div>
          
          <Card>
            <div className="divide-y">
              {sortedUsers
                .sort((a, b) => b.quizPoints - a.quizPoints)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center p-4">
                    <div className="w-8 text-center font-medium">
                      {index < 3 ? (
                        <Trophy className={`h-5 w-5 mx-auto ${getMedalColor(index)}`} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    <Avatar className="ml-4 h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">{user.quizPoints}</p>
                      <p className="text-xs text-gray-500">Points</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
