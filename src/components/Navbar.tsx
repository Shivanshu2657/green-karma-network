
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserRound, Leaf, TreeDeciduous, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Carbon Tracker", path: "/tracker" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Green Tips", path: "/tips" },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <TreeDeciduous className="text-green-600" />
            <span className="font-bold text-xl">
              <span className="text-green-600">GREE</span>
              <span className="text-purple-600">CARE</span>
            </span>
          </Link>

          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col h-full">
                  <ul className="flex flex-col gap-6 mt-12">
                    <NavItems />
                  </ul>
                  <div className="mt-auto pb-8">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <UserRound className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-8">
              <nav>
                <ul className="flex items-center gap-8">
                  <NavItems />
                </ul>
              </nav>
              <Button className="bg-green-600 hover:bg-green-700">
                <UserRound className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
