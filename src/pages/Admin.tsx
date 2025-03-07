import { getScrappingLogs } from "@/lib/apis";
import { formatTimestampToHumanReadable, getFutureDateTime, getTimeDifferenceInSeconds, secondsToHms } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);

  const startScrapping = async () => {
    try {
      setIsLoading(true);
      const resData = await getScrappingLogs();
      setData(resData);
      console.log("success data: ", resData);
      setIsLoading(false);
    } catch (err: any) {
      console.log("Error while scrapping data: ", err);
      toast.error("Error fetching logs", {
        description: "Error while fetching the logs for scrapping",
        closeButton: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startScrapping();
  }, []);

  return (
    <div className="w-full h-full min-h-[80vh] flex justify-center items-center flex-col">

      <div className="w-full mt-4 p-5 sm:p-10">
        {isLoading ? (
          <div className="w-full tex-center">Loading...</div>
        ) : (data != null && data.length) ? (
          <div className="w-full">

            <div className="w-full text-center mb-10">Next scrapping scheduled at <span className="font-semibold ">{formatTimestampToHumanReadable(getFutureDateTime(data[0].started_at).hoursAfter24.toString())}</span>.</div>

            <h3 className="font-semibold  ">Recent Scrapping Logs</h3>
            <Accordion type="single" collapsible>
              {data.map((log, i) => (
                <AccordionItem value={`scrape-log-${i}`} key={i}>
                  <AccordionTrigger className=" cursor-pointer w-full flex  justify-between items-center gap-2"> 
                    <div>Scrapped at: {formatTimestampToHumanReadable(log.started_at)}</div>
                    <div>Duration: {secondsToHms(getTimeDifferenceInSeconds(log.started_at, log.ended_at))}</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {log.entries.map((entry: any, id: any) => (<div key={id} className="flex justify-start gap-2 text-xs">
                      <div className="font-semibold text-blue-600"> {formatTimestampToHumanReadable(entry.timestamp)}:  </div>
                      <div>{entry.message}</div>
                    </div>))}
                  </AccordionContent>
                </AccordionItem>
              ))}

            </Accordion>

          </div>
        ) : <div className="text-center"> No scrappings yet!</div>}
      </div>
    </div>
  );
};

export default Admin;
