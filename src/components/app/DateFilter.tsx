import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSearchContext } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";

const DateFilter = ({classes=""}:{classes?:string}) => {
  const {  filters, setFilters, searchParams, setSearchParams } =
    useSearchContext();
  const [dateExpanded, setDateExpanded] = useState(false);
  const [dateRange, setDateRange] = useState({
    ylo: searchParams.get("ylo") ?? "",
    yhi: searchParams.get("yhi") ?? "",
  });

  const handleChangeFilter = (field: string, value: string) => {
    if (field == "ylo") {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("ylo", value);
        newParams.delete("yhi");
        newParams.delete("page");
        return newParams;
      });
      setFilters((o: any) => ({ ...o, ylo: value, yhi: "" }));
      setDateRange((o: any) => ({ ...o, ylo: value, yhi: "" }));
    }
  };

  const applyDateRange = () => {
    if (["2025", "2024", "2021"].includes(dateRange.ylo) && !dateRange.yhi) {
      setFilters((o: any) => ({
        ...o,
        ylo: dateRange.ylo,
        yhi: dateRange.yhi,
      }));
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("ylo", dateRange.ylo);
        newParams.delete("yhi");
        newParams.delete("page");
        return newParams;
      });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("ylo", dateRange.ylo);
        newParams.set("yhi", dateRange.yhi);
        newParams.delete("page");
        return newParams;
      });
    }
  };

  const appliedDateFilter = () => {
    const qylo = searchParams.get("ylo");
    const qyhi = searchParams.get("yhi");
    if (qylo && qyhi) {
      return "custom";
    } else if (!qylo && !qylo) {
      return "any";
    } else if (qylo == "2025") {
      return "2025";
    } else if (qylo == "2024") {
      return "2024";
    } else if (qylo == "2021") {
      return "2021";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const ylo = searchParams.get("ylo") ?? "";
    const yhi = searchParams.get("yhi") ?? "";
    if (ylo != dateRange.ylo || yhi != dateRange.yhi) {
      setDateRange({ ylo, yhi });
    }
  }, [searchParams]);

  return (
    <div className={`${cn("flex justify-center items-start flex-col  text-nowrap",classes)}`}>
      <button
        onClick={() => handleChangeFilter("ylo", "")}
        type="button"
        className={`cursor-pointer hover:underline ${
          appliedDateFilter() == "any" && "text-red-500"
        }  `}
      >
        Any Time
      </button>
      <button
        onClick={() => handleChangeFilter("ylo", "2025")}
        type="button"
        className={`cursor-pointer hover:underline ${
          appliedDateFilter() == "2025" && "text-red-500"
        }`}
      >
        Since 2025
      </button>
      <button
        onClick={() => handleChangeFilter("ylo", "2024")}
        type="button"
        className={`cursor-pointer hover:underline ${
          appliedDateFilter() == "2024" && "text-red-500"
        }`}
      >
        Since 2024
      </button>
      <button
        onClick={() => handleChangeFilter("ylo", "2021")}
        type="button"
        className={`cursor-pointer hover:underline ${
          appliedDateFilter() == "2021" && "text-red-500"
        }`}
      >
        Since 2021
      </button>
      <button
        onClick={() => setDateExpanded((o) => !o)}
        type="button"
        className={`cursor-pointer hover:underline  ${
          appliedDateFilter() == "custom" && "text-red-500"
        }`}
      >
        Custom range...
      </button>
      {dateExpanded && (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={dateRange.ylo}
              onChange={(e) =>
                setDateRange((old) => ({ ...old, ylo: e.target.value }))
              }
              pattern="\d{1,4}"
              maxLength={4}
              name="ylo"
              className="p-1 rounded-sm text-sm bg-white border w-[6ch]  "
            />
            <div className="mx-2"> - </div>
            <input
              type="text"
              value={dateRange.yhi}
              onChange={(e) =>
                setDateRange((old) => ({ ...old, yhi: e.target.value }))
              }
              pattern="\d{1,4}"
              maxLength={4}
              name="hlo"
              className="p-1 rounded-sm text-sm bg-white border w-[6ch]  "
            />
          </div>
          <Button
            variant={"outline"}
            onClick={applyDateRange}
            className="cursor-pointer"
          >
            Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
