import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Link2, Mail, MapPinned, Quote } from "lucide-react";

const Profile = () => {
  return (
    <div className="w-full ">
      <div className="w-full h-24 md:h-[180px]  xl:h-[280px]  border-b-2 border-dotted  border-gray-300  relative">
        <Avatar
          className={` h-16 w-16  -bottom-8 left-[4%] border-2
            sm:h-20 sm:w-20 sm:-bottom-10 sm:left-[5%] sm:border-3
             xl:h-32 xl:w-32 absolute xl:-bottom-16 xl:left-[10%] xl:border-4 
            
              border-gray-600`}
        >
          <AvatarImage src="/amit.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="min-h-[20vh] bg-gray-100 grid grid-cols-1  sm:grid-cols-5 p-6 ">
        
   
       <div className="flex justify-center items-center  col-span-2 ">
         <div className="flex justify-center items-start flex-col gap-2 ">
         <div className="font-semibold text-4xl mb-1 sm:mb-6">AMIT K. KARN</div>
          <div className="flex justify-center items-center gap-2 italic">
            <Link2 /> <a href="https://amitkarn.com.np">Portfolio Website</a>
          </div>
          <div className="flex justify-center items-center gap-2 italic">
            <Mail /> guts.ak.98@gmail.com
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <MapPinned /> Kathmandu, Nepal
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <GraduationCap /> Coventry University (Softwarica College)
          </div>
         </div>
        </div>


        <div className="col-span-3 p-2 sm:p-5  xl:p-10 text-justify">
          <Quote /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio
          laboriosam unde mollitia quaerat nostrum nemo quam animi. Vero earum
          harum eaque ut assumenda aliquid soluta quo eos voluptates, incidunt
          sunt, repudiandae voluptate laborum accusamus eius deleniti suscipit
          sapiente vel dicta. Consequuntur sapiente aliquam reprehenderit
          debitis similique suscipit non, aliquid expedita rem distinctio quia
          voluptas facere nesciunt voluptatem quibusdam asperiores eum ipsa!
          Deserunt nemo quam est laborum eos dignissimos voluptates cupiditate
          odio minus sequi incidunt, sapiente, iusto doloribus tempora quia.
          Asperiores accusantium eveniet omnis eaque nemo eligendi repellendus
          aspernatur minima maxime exercitationem facilis voluptate, rerum illum
          consectetur, placeat aut molestiae aliquid harum saepe quis sunt,
          error assumenda sed? Explicabo at atque vitae a numquam nam minus
          facere, eligendi rem ipsa.
        </div>
      </div>
    </div>
  );
};

export default Profile;
