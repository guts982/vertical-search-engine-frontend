import { useSearchContext } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";
import {} from "react";

const TypeFilter = ({ classes = "" }: { classes?: string }) => {
  const { searchParams, handleChangeFilter } = useSearchContext();
  return (
    <div
      className={`${cn(
        "flex justify-center items-start flex-col  text-nowrap",
        classes
      )}`}
    >
      <button
        onClick={() => handleChangeFilter("type", "")}
        type="button"
        className={`cursor-pointer hover:underline ${
          (searchParams.get("type") == "" ||
            searchParams.get("type") == undefined) &&
          "text-red-500"
        }`}
      >
        Any type
      </button>
      <button
        onClick={() => handleChangeFilter("type", "article")}
        type="button"
        className={`cursor-pointer hover:underline ${
          searchParams.get("type") == "article" && "text-red-500"
        }`}
      >
        Articles
      </button>
      <button
        onClick={() => handleChangeFilter("type", "chapter")}
        type="button"
        className={`cursor-pointer hover:underline ${
          searchParams.get("type") == "chapter" && "text-red-500"
        }`}
      >
        Chapters
      </button>
      <button
        onClick={() => handleChangeFilter("type", "paper")}
        type="button"
        className={`cursor-pointer hover:underline ${
          searchParams.get("type") == "paper" && "text-red-500"
        }`}
      >
        Papers
      </button>
    </div>
  );
};

export default TypeFilter;
