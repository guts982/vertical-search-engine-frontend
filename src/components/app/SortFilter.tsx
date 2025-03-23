import { useSearchContext } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";
import {} from "react";

const SortFilter = ({ classes = "" }: { classes?: string }) => {
  const { searchParams, handleChangeFilter } = useSearchContext();
  return (
    <div
      className={`${cn(
        "flex justify-center items-start flex-col  text-nowrap",
        classes
      )}`}
    >
      <button
        onClick={() => handleChangeFilter("sort", "")}
        type="button"
        className={`cursor-pointer hover:underline ${
          (searchParams.get("sort") == "" ||
            searchParams.get("sort") == undefined) &&
          "text-red-500"
        } `}
      >
        Sort by relevance
      </button>
      <button
        onClick={() => handleChangeFilter("sort", "date")}
        type="button"
        className={`cursor-pointer hover:underline ${
          searchParams.get("sort") == "date" && "text-red-500"
        }`}
      >
        Sort by date
      </button>
    </div>
  );
};

export default SortFilter;
