import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Home() {
  return (
    <div className="w-full   min-h-[80vh] flex flex-col justify-center items-center">
      <div className="text-[2em] mb-4 xl:mb-5">Coventry Scholar</div>
      <div className="p-4  flex flex-col sm:flex-row gap-3 sm:gap-0  w-full justify-center  items-center space-x-0">
        <Input
          type="text"
          placeholder="Search Document Title..." 
          className="sm:rounded-r-none round w-[80vw] sm:w-[70vw] "
        />
        <Button
          type="submit"
          className="sm:rounded-l-none flex justify-center items-center gap-2"
        >
          <Search /> Search
        </Button>
      </div>
    </div>
  );
}

export default Home;
