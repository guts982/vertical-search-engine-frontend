import { useSearchContext } from "@/contexts/SearchContext";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DateFilter from "./DateFilter";
import SortFilter from "./SortFilter";
import TypeFilter from "./TypeFilter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const SearchResults = () => {
  const { queryState, filters, setFilters, searchParams, setSearchParams } =
    useSearchContext();
  const { data, isLoading, isRefetching, error } = queryState;

  useEffect(() => {
    console.log("DATA: ", data, error);
  }, [data, error]);

  if (!searchParams.get("query")) {
    return (
      <div className="w-full min-h-[80vh] p-4 ">
        Please enter a query in the search box above.
      </div>
    );
  }

  return (
    <div className=" flex justify-start items-start gap-2">
      <div className="hidden lg:block lg:min-w-[200px]  xl:min-w-[230px] p-4  text-sm">
        <DateFilter />

        <Separator className="my-2" />

        <SortFilter />

        <Separator className="my-2" />

        <TypeFilter />
      </div>
      <div className="w-full min-h-[80vh] p-4 ">
        {isLoading || isRefetching ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="flex flex-col gap-5 items-start justify-center">
            <div>
              {" "}
              <span className="text-red-500 mr-1">Did you mean:</span>
              <span className="text-blue-700 italic font-bold">
                {filters.query}{" "}
              </span>{" "}
            </div>
            <div>
              Your search - <span className="font-bold">{filters.query}</span> -
              did not match any publications.
            </div>
            <div>
              <div className="mb-4">Suggestions:</div>
              <div className="pl-4">
                Make sure all words are spelled correctly.
                <br />
                Try different keywords.
                <br />
                Try more general keywords.
                <br />
              </div>
            </div>
          </div>
        ) : data && data?.data?.length ? (
          <DocList data={data} />
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

const DocList = ({ data }: { data: any }) => {
  const { queryState, setSearchParams, setFilters } = useSearchContext();
  const [abstractExpanded, setAbstractExpanded] = useState<any>({});

  const toggleAbstract = (id: any) => {
    setAbstractExpanded((old: any) => ({
      ...old,
      [id]: !old[id],
    }));
  };

  const generatePaginationItems = () => {
    const { page, total_pages } = data.pagination;
    const items = [];

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(page - 1)}
          className={
            !data.pagination.has_prev
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={page === 1}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-left">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(total_pages - 1, page + 1);
      i++
    ) {
      if (i === 1 || i === total_pages) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={page === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < total_pages - 2) {
      items.push(
        <PaginationItem key="ellipsis-right">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (total_pages > 1) {
      items.push(
        <PaginationItem key={total_pages}>
          <PaginationLink
            onClick={() => handlePageChange(total_pages)}
            isActive={page === total_pages}
            className="cursor-pointer"
          >
            {total_pages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(page + 1)}
          className={
            !data.pagination.has_next
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  const authorsHtml = (doc: any) => {
    if (!doc.authors || doc.authors.length === 0) {
      return <span>{doc.authors_text}</span>;
    }

    return (
      <span>
        {doc.authors.map((author: any, index: number) => {
          const hasLink = author.profile_link !== null;
          const isLast = index === doc.authors.length - 1;

          return (
            <span key={index}>
              {hasLink ? (
                <a
                  href={author.profile_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  {author.name}
                </a>
              ) : (
                <span>{author.name}</span>
              )}
              {!isLast && ", "}
            </span>
          );
        })}
      </span>
    );
  };

  const handlePageChange = (page: any) => {
    if (page < 1 || page > data.pagination.total_pages) {
      return;
    }

    setFilters((old: any) => ({ ...old, page: page }));
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      return newParams;
    });
  };

  useEffect(() => {
    setAbstractExpanded({});
  }, [queryState.data]);

  return (
    <div className="max-w-[780px]">
      <div className="font-nunito flex flex-col gap-5 items-start justify-center">
        {data.data.map((doc: any) => (
          <div key={doc._id}>
            <a
              target="blank"
              href={doc.link}
              className="text-lg font-semibold text-blue-400 hover:underline"
            >
              {doc.title}
            </a>
            <div className="text-md text-gray-500">
              {" "}
              {authorsHtml(doc)} {doc.date}, {doc.resource}
            </div>
            {doc.abstract && doc.abstract != "N/A" && (
              <Collapsible
                open={abstractExpanded[doc._id]}
                onOpenChange={() => toggleAbstract(doc._id)}
                className="mt-2"
              >
                <div className="text-sm text-gray-700">
                  <CollapsibleContent className="mt-1">
                    {doc.abstract}
                  </CollapsibleContent>

                  <div
                    className={
                      abstractExpanded[doc._id] ? "hidden" : "line-clamp-2"
                    }
                  >
                    {doc.abstract}
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0  h-auto font-semibold cursor-pointer"
                    >
                      {abstractExpanded[doc._id] ? "Show less" : "Read more"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </Collapsible>
            )}
            <div className="text-sm italic text-gray-500">{doc.type}</div>
            {/* <div className="max-w-[150px] text-xs text-gray-500 flex flex-col gap-0 justify-center items-start">
              <div className="w-full flex justify-between items-center ">
                <div>SIMILARITY</div>
                <div
                  style={{ color: getColorForSimilarity(doc.similarity * 100) }}
                >
                  {(doc.similarity * 100).toPrecision(2)} %
                </div>
              </div>
              <Progress
                value={doc.similarity * 100}
                className=" bg-gray-300"
                getValueLabel={(val, max) => `SIMILARITY:${val}/${max}`}
              />
            </div> */}
          </div>
        ))}
      </div>

      <div>
        {data.pagination.total_pages > 0 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>{generatePaginationItems()}</PaginationContent>
            </Pagination>

            <div className="mt-2 text-xs text-gray-400 text-right">
              {data.pagination.total_results} results | Page{" "}
              {data.pagination.page} of {data.pagination.total_pages} | Response
              time: {data.responseTime}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to get a precise color based on similarity percentage
const getColorForSimilarity = (percentage: number) => {
  // Define color stops for a gradient from red to green
  if (percentage >= 95) return "#166534"; // Very dark green (95-100%)
  if (percentage >= 90) return "#16a34a"; // Dark green (90-94%)
  if (percentage >= 85) return "#22c55e"; // Green (85-89%)
  if (percentage >= 80) return "#4ade80"; // Light green (80-84%)
  if (percentage >= 75) return "#86efac"; // Very light green (75-79%)
  if (percentage >= 70) return "#a3e635"; // Lime (70-74%)
  if (percentage >= 65) return "#d9f99d"; // Light lime (65-69%)
  if (percentage >= 60) return "#fde047"; // Yellow (60-64%)
  if (percentage >= 55) return "#facc15"; // Dark yellow (55-59%)
  if (percentage >= 50) return "#f59e0b"; // Amber (50-54%)
  if (percentage >= 45) return "#fb923c"; // Light orange (45-49%)
  if (percentage >= 40) return "#f97316"; // Orange (40-44%)
  if (percentage >= 35) return "#ef4444"; // Red (35-39%)
  if (percentage >= 30) return "#dc2626"; // Dark red (30-34%)
  if (percentage >= 25) return "#b91c1c"; // Very dark red (25-29%)
  if (percentage >= 20) return "#991b1b"; // Extremely dark red (20-24%)
  if (percentage >= 15) return "#7f1d1d"; // Deep red (15-19%)
  if (percentage >= 10) return "#601a1a"; // Deep red (10-14%)
  if (percentage >= 5) return "#450a0a"; // Very deep red (5-9%)
  return "#3f0404"; // Nearly black red (0-4%)
};
