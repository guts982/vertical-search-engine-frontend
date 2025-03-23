import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, NavLink } from "react-router";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlignLeft,
  BookOpenText,
  ChevronDown,
  Dot,
  GraduationCap,
  ListFilter,
  Scroll,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/app/SearchInput";
import { useSearchContext } from "@/contexts/SearchContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateFilter from "@/components/app/DateFilter";
import { Separator } from "@/components/ui/separator";
import SortFilter from "@/components/app/SortFilter";
import TypeFilter from "@/components/app/TypeFilter";

const UserAvatar = ({ classes }: { classes: string }) => (
  <NavLink to="/profile">
    <Avatar className={classes}>
      <AvatarImage src="/amit.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </NavLink>
);

const menuItems = [
  {
    id: 1,
    label: "Logs",
    path: "/logs",
    icon: (classes?: string) => (
      <Scroll
        fill="#222"
        stroke="#222"
        className={classes ?? "h-6 w-6 text-zinc-600"}
      />
    ),
  },
  {
    id: 2,
    label: "My Profile",
    path: "/profile",
    icon: (classes?: string) => <UserAvatar classes={classes ?? "w-6 h-6"} />,
  },
];

const navLinkClasses =
  "flex gap-4  justify-start items-center hover:bg-zinc-100 w-full px-2 lg:px-4 py-2 text-lg";

const NAV_LINKS = (
  <div className="hidden sm:flex justify-start items-center w-full gap-4 text-sm">
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center gap-4 hover:underline"
          : "flex justify-center items-center gap-4 hover:underline"
      }
    >
      <GraduationCap fill="#222" className="h-5 w-5" /> My Profile
    </NavLink>
    <NavLink
      to="/logs"
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center gap-4 hover:underline"
          : "flex justify-center items-center gap-4 hover:underline"
      }
    >
      <Scroll fill="#222" className="h-5 w-5" /> My Logs
    </NavLink>
  </div>
);

const Header = () => {
  const { searchOpen, clearSearch, queryState , searchParams} = useSearchContext();
  const { data, error, isLoading } = queryState;
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      <div className={`w-full   flex justify-center items-center flex-col  `}>
        <div
          className={`w-full  px-4 py-2 flex justify-between items-center gap-4 ${
            searchOpen ? "bg-zinc-50 border-b" : ""
          }  `}
        >
          <button
            className="  cursor-pointer  p-0 rounded-full font-semibold  "
            onClick={toggleSheet}
          >
            <AlignLeft className="h-6 w-6  text-gray-700" />
          </button>

          {!searchOpen ? (
            NAV_LINKS
          ) : (
            <div className="flex w-full  justify-start items-center gap-4 ">
              <div
                onClick={() => {
                  clearSearch();
                  navigate("/");
                }}
                className="cursor-pointer hidden lg:flex w-[200px] text-2xl   font-semibold text-stone-500  text-nowrap  gap-1"
              >
                <span className=" text-[#1476c6] font-fira ">Coventry</span>
                Scholar
              </div>
              <div className="w-full">
                <SearchInput header={true} />
              </div>
            </div>
          )}

          <div className={`${searchOpen ? " hidden lg:block  " : " "}`}>
            <UserAvatar classes="" />
          </div>
        </div>

        {searchOpen ? (
          <div className="w-full border-b  px-4 py-2 flex justify-start items-center gap-4 text-sm">
            <button
              className="hidden xl:block cursor-pointer  p-0 rounded-full font-semibold  "
              onClick={toggleSheet}
            >
              <BookOpenText className="h-4 w-4  text-gray-700" />
            </button>
            <div className="w-full flex justify-between items-center gap-2">
              <div className="flex justify-start items-center gap-2">
                <div
                  onClick={() => {
                    clearSearch();
                    navigate("/");
                  }}
                  className=" cursor-pointer flex justify-start items-center gap-2  lg:hidden "
                >
                  <BookOpenText className="h-4 w-4  text-gray-700" />
                  Scholar
                </div>
                <div className="hidden lg:block w-[200px]">Publications</div>
                <div className="hidden sm:block  text-gray-400  ">
                  {isLoading
                    ? "Loading..."
                    : error
                    ? ""
                    : data && data?.pagination?.total_results
                    ? `About ${data?.pagination?.total_results} results (${data.responseTime})`
                    : ""}
                </div>
              </div>
              <div className="hidden lg:block">{NAV_LINKS}</div>
              <div className=" flex justify-center items-center gap-4 pr-4  lg:hidden">
                <Popover>
                  <PopoverTrigger className=" flex justify-center items-center  gap-1 cursor-pointer ">
                    YEAR <ChevronDown className="h-3 w-3" />
                  </PopoverTrigger>
                  <PopoverContent className="border-2 rounded-sm text-sm w-fit">
                    <DateFilter classes="gap-2" />
                    <Separator className="my-1" />
                    <SortFilter classes="gap-2" />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger className="cursor-pointer relative">
                    <ListFilter className="h-6 w-6 z-10" />
                    {Boolean(searchParams.get("type")) &&  <Dot className="absolute -top-3 -right-3 z-20 h-9 w-9 text-red-500 border border-white" />}
                  </PopoverTrigger>
                  <PopoverContent className="border-2 rounded-sm w-fit" align="center" >
                    <TypeFilter classes="gap-2" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <div className="border-b pb-6 mb-2 flex justify-start items-end gap-2 xl:gap-4 ">
                <AlignLeft className="h-6 w-6  text-gray-600" />{" "}
                <div
                  onClick={() => {
                    clearSearch();
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
