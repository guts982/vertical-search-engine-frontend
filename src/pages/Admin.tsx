import { Button } from "@/components/ui/button";
import { startScrappingPublications } from "@/lib/apis";
import { toast } from "sonner";


const Admin = () => {

    const startScrapping = async () => {
        try{
            const data = await startScrappingPublications();
            console.log("success data: ",data);
            toast.success("SUCCESS", {
                description: "Successfully started the scrapping",
                closeButton:true,
              })
        }catch(err:any){

            console.log("Error while scrapping data: ", err)
            toast.error("REQUEST ERROR ENCOUNTERED", {
                description: "Error while starting the scrapping",
                closeButton:true,
              })
        }
    }

    return (
        <div className="w-full   min-h-[80vh] flex flex-col justify-center items-center ">

           <div className="flex gap-1 justify-center items-center">
           Click <Button onClick={startScrapping} className="cursor-pointer">START</Button> to start scrapping latest publications data and store in database now.

           </div>
        </div>
    );
};

export default Admin;