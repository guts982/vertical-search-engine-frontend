import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import { AppContextProvider } from "@/contexts/AppContext";
import { SearchContextProvider } from "@/contexts/SearchContext";

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <main className="min-h-[100vh]  font-roboto relative pb-10 ">
            <Header />
            <Outlet />

            <footer className="absolute bottom-0 font-nunito  border-t border-stone-200 bg-stone-50  w-full  py-2  px-4 text-xs text-gray-500 flex justify-between items-center">
              <div>&copy; {new Date().getFullYear()} | Amit K. Karn </div>
              <div>
                {" "}
                Softwarica College of IT and E-commerce | Affiliated to Coventry
                University
              </div>
            </footer>
          </main>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default AppLayout;
