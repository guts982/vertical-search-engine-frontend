import SearchInput from "@/components/app/SearchInput";
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
import { useAppContext } from "@/contexts/AppContext";
import {
  AlignLeft,
  Divide,
  GraduationCap,
  Home,
  Menu,
  ShieldUser,
  Star,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const UserAvatar = ({ classes }: { classes: string }) => (
  <Avatar className={classes}>
    <AvatarImage src="/amit.jpg" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

const menuItems = [
  {
    id: 1,
    label: "Logs",
    path: "/logs",
    icon: (classes?: string) => (
      <Star className={classes ?? "h-7 w-7 text-zinc-600"} />
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
  const { searchOpen } = useAppContext();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };
  const navLinkClassesTop =
    "flex gap-2  justify-center items-center hover:underline ";
  const navLinkClasses =
    "flex gap-4  justify-start items-center hover:bg-zinc-100 w-full px-2 lg:px-4 py-2 text-lg";

 

  return (
    <>
      <div
        className={`w-full px-4 py-2 h-16 flex justify-between ${
          searchOpen && "border-b bg-gray-100"
        }  `}
      >
        <div className="flex justify-center items-center gap-2 ">
          <button
            className="cursor-pointer  p-0 rounded-full font-semibold  "
            onClick={toggleSheet}
          >
            <AlignLeft className="h-6 w-6  text-gray-700" />
          </button>
          {!searchOpen ? (
            <div className="hidden lg:flex justify-center items-center gap-4">
              {menuItems.slice(0, 1).map((item) => (
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
          ) : (
            <div className="w-full   flex justify-start items-center gap-4 sm:gap-6 xl:gap-10 ">
              <div
                onClick={() => {
                  navigate("/");
                }}
                className=" lg:w-2/12 hidden   cursor-pointer text-2xl   font-semibold text-stone-500  text-nowrap lg:flex justify-center items-center"
              >
                <span className=" text-[#1476c6] font-fira mr-1">Coventry</span>{" "}
                Scholar
              </div>
              <div className=" w-full lg:w-8/12 ">
                <SearchInput />
              </div>
            </div>
          )}
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "border-2 border-gray-700 w-fit h-fit cursor-pointer p-0 rounded-full hidden lg:block  "
              : "cursor-pointer p-0 rounded-full  hidden lg:block"
          }
        >
          <UserAvatar classes="w-8 h-8" />
        </NavLink>
      </div>

      <div className={`w-full px-4 py-2 h-16 flex justify-between border-b  `}>
        <div className="flex justify-center items-center gap-2 ">
          <Button
            className="  p-0 rounded-full font-semibold hover:bg-white "
            type="button"
            variant="ghost"
          >
            <GraduationCap className="h-12 w-12 " />
          </Button>
          <div className="flex">
            <div className="">Publications</div>
            <div>About shit results</div>
          </div>
        </div>
        <div>NAV ITEMS</div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <div className="border-b pb-6 mb-2 flex justify-start items-end gap-2 xl:gap-4 ">
                <AlignLeft className="h-6 w-6  text-gray-600" />{" "}
                <div
                  onClick={() => {
                    navigate("/");
                  }}
                  className=" cursor-pointer text-lg xl:text-xl  2xl:text-2xl"
                >
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
