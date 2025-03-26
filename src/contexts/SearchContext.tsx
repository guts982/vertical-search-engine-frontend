import { useGetSearchResults } from "@/lib/queries";
import { UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { SetURLSearchParams, useLocation, useSearchParams } from "react-router";

interface SearchContextType {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  clearSearch: () => void;
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialLoad: boolean;
  setInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
  searchParams: URLSearchParams;
  queryState: UseQueryResult<any, Error>;
  // handleSearchParamChange:(field: string, value: any) => void;
  setSearchParams: SetURLSearchParams;
  handleChangeFilter: (field: string, value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const DEFAULT_FILTERS = {
    query: searchParams.get("query") || "",
    ylo: searchParams.get("ylo") || "",
    yhi: searchParams.get("yhi") || "",
    sort: searchParams.get("sort") || "",
    type: searchParams.get("type") || "",
  };

  const RESET_FILTERS = {
    query: "",
    ylo: "",
    yhi: "",
    sort: "",
    type: "",
  };

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [initialLoad, setInitialLoad] = useState(true);

  const queryState = useGetSearchResults(
    Object.fromEntries(searchParams.entries())
  );


  const handleChangeFilter = (field: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(field, value);
      newParams.delete("page");
      return newParams;
    });
    setFilters((o: any) => ({ ...o, [field]: value }));
  };

  const clearSearch = () => {
    setFilters(RESET_FILTERS);
    setSearchOpen(false);
    setInitialLoad(true);
  };

  useEffect(() => {
    if (searchParams.size) {
      console.log("search params changed");
      queryState.refetch();
      setSearchOpen(true);
    }
  }, [searchParams, queryState.refetch]);


  useEffect(()=>{
    if(location.pathname != "/") {
      setInitialLoad(false);
      setSearchOpen(false);
    }
  },[location.pathname])

  return (
    <SearchContext.Provider
      value={{
        handleChangeFilter,
        clearSearch,
        searchOpen,
        setSearchOpen,
        searchParams,
        queryState,
        filters,
        setFilters,
        setSearchParams,
        initialLoad,
        setInitialLoad,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
};
