import SearchInput from "@/components/app/SearchInput";
import SearchResults from "@/components/app/SearchResults";
import { useSearchContext } from "@/contexts/SearchContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";


function Home() {

  const {searchOpen, clearSearch} = useSearchContext()
  const navigate = useNavigate();
  
  useEffect(()=>{

  },[searchOpen])

  return !searchOpen ? (
    <div className="w-full   min-h-[40vh] flex flex-col justify-center items-center p-2 lg:p-4 ">
      <div onClick={()=>{clearSearch();  navigate("/");}}  className="cursor-pointer  text-3xl sm:text-5xl lg:text-6xl  mb-2 sm:mb-5 lg:mb-8   xl:mb-10 font-semibold text-stone-500  text-nowrap">
        <span className=" text-[#1476c6] font-fira">Coventry</span> Scholar
      </div>
      <SearchInput /> 
    </div>
  )
  : 
  (
    <SearchResults />
  )

}

export default Home;
