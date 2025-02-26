import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Home, Menu, ShieldUser, UserCircle } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const UserAvatar = ({ classes }: { classes: string }) => (
  <Avatar className={classes}>
    <AvatarImage src="/amit.jpg" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

const menuItems = [
  {
    id: 0,
    label: "Home",
    path: "/",
    icon: (classes?: string) => (
      <Home className={classes ?? "h-7 w-7 text-zinc-600"} />
    ),
  },
  {
    id: 1,
    label: "Admin",
    path: "/admin",
    icon: (classes?: string) => (
      <ShieldUser className={classes ?? "h-7 w-7 text-zinc-600"} />
    ),
  },
  {
    id: 2,
    label: "My Profile",
    path: "/profile",
    icon: (classes?: string) => <UserAvatar classes={classes ?? "w-7 h-7"} />,
  },
];

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };
  const navLinkClassesTop =
    "flex gap-1  justify-start items-center hover:underline  text-md";
  const navLinkClasses =
    "flex gap-4  justify-start items-center hover:bg-zinc-100 w-full px-2 lg:px-4 py-2 text-xl";

  return (
    <>
      <div className="w-full px-4 py-2 h-16 flex justify-between ">
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            className="cursor-pointer  p-0 rounded-full font-semibold  "
            onClick={toggleSheet}
          >
            <AlignLeft className="h-12 w-12  text-gray-700" />
          </Button>
          <div className="hidden lg:flex justify-center items-center gap-4">
            {menuItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold " + navLinkClassesTop
                    : navLinkClassesTop
                }
              >
                {item.icon("w-4 h-4")}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink to="/profile"  className={({isActive})=> isActive ? "border-2 border-gray-700 w-fit h-fit cursor-pointer p-0 rounded-full " : "cursor-pointer p-0 rounded-full " } >
          <UserAvatar classes="w-8 h-8" />
        </NavLink>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <></>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <div className="border-b pb-6 mb-2 flex justify-start items-end gap-2 xl:gap-4 ">
                <AlignLeft className="h-6 w-6  text-gray-600" />{" "}
                <div className="text-lg xl:text-xl  2xl:text-2xl">
                  Coventry Scholar
                </div>
              </div>{" "}
            </SheetTitle>
            <SheetDescription>
              Search from and explore a wide range of research papers and
              articles from our extensive collection of resources
            </SheetDescription>
          </SheetHeader>

          <nav className="flex flex-col justify-center items-start ">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "font-semibold " + navLinkClasses : navLinkClasses
                }
              >
                {item.icon()}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <SheetFooter>
            <SheetClose asChild>
              <Button className="cursor-pointer" type="button">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
