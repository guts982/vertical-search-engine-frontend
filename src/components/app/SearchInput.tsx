import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import { useSearchContext } from "@/contexts/SearchContext";

const SearchInput = ({ header = false }: { header?: boolean }) => {
  const { queryState, filters, setFilters,  setSearchParams} =
    useSearchContext();

  const handleClick = () => {
    handleSearch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("query", filters.query);
        newParams.delete("page");
        return newParams;
      });
      setFilters((o: any) => ({ ...o, query:filters.query }));

  };


  return (
    <div className="  flex flex-row gap-0  w-full justify-center  items-center space-x-0  ">
      <Input
        type="text"
        placeholder="Search Publications, Authors..."
        value={filters.query}
        onChange={(e) =>
          setFilters((old: any) => ({ ...old, query: e.target.value }))
        }
        onKeyDown={handleKeyDown}
        className={`  rounded-xs rounded-r-none  ${
          header ? "w-full" : "w-full sm:w-[60vw] lg:w-[50vw] "
        } py-5 border  border-stone-400 bg-white
          border-r-none 
          focus-visible:ring-offset-0 focus-visible:ring-0 
          focus-visible:border-[#1476c6] focus-within:inset-shadow-sm focus-within:inset-shadow-blue-200   `}
      />
      <Button
        type="button"
        onClick={handleClick}
        disabled={queryState.isLoading}
        className="bg-[#1476c6] border-[#1476c6] hover:bg-[#1476c6d8]      rounded-xs  rounded-l-none  flex justify-center items-center gap-2 p-5 border  cursor-pointer  "
      >
        {queryState.isLoading ? (
          <Loader className="animate-spin h-8 w-8" />
        ) : (
          <Search className="h-8 w-8" />
        )}
      </Button>
    </div>
  );
};

export default SearchInput;
