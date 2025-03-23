
import {
  formatTimestampToHumanReadable,
  getFutureDateTime,
  getTimeDifferenceInSeconds,
  secondsToHms,
} from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useGetScrappingLogs } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

const Logs = () => {

  const { data, isLoading } = useGetScrappingLogs();


  return (
    <div className="w-full h-full min-h-[80vh] flex justify-center items-center flex-col">

      <div className="w-full mt-4 p-5 sm:p-10">
  
        {isLoading ? (
          <AccordionSkeleton />
        ) : data != null && data.length ? (
          <div className="w-full">
            <div className="w-full text-center mb-10">
              Next scrapping scheduled at{" "}
              <span className="font-semibold ">
                {formatTimestampToHumanReadable(
                  getFutureDateTime(data[0].started_at).hoursAfter24.toString()
                )}
              </span>
              .
            </div>

            <h3 className="font-semibold  ">Recent Scrapping Logs</h3>
            <Accordion type="single" collapsible>
              {data.map((log: any, i: any) => (
                <AccordionItem value={`scrape-log-${i}`} key={i}>
                  <AccordionTrigger className=" cursor-pointer w-full flex  justify-between items-center gap-2">
                    <div>
                      Scrapped at:{" "}
                      {formatTimestampToHumanReadable(log.started_at)}
                    </div>
                    <div>
                      Duration:{" "}
                      {secondsToHms(
                        getTimeDifferenceInSeconds(log.started_at, log.ended_at)
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {log.entries.map((entry: any, id: any) => (
                      <div
                        key={id}
                        className="flex justify-start gap-2 text-xs"
                      >
                        <div className="font-semibold text-blue-600">
                          {" "}
                          {formatTimestampToHumanReadable(
                            entry.timestamp
                          )}:{" "}
                        </div>
                        <div>{entry.message}</div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="text-center"> No scrappings yet!</div>
        )}
      </div>
    </div>
  );
};

export default Logs;

const AccordionSkeleton = () => {
 
  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full  mx-auto space-y-5 ">
      <div className=" w-3/4 mx-auto  flex items-center gap-2 flex-1 p-4">
        <Skeleton className="h-4 w-full" />
      </div>
      {items.map((item) => (
        <div key={item} className=" border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex justify-between  items-center gap-2 flex-1">
              <Skeleton className="h-4 w-1/3" />

              <Skeleton className="h-4 w-1/3" />

              <Skeleton className="h-4 w-4 rounded-full" />

            </div>
          </div>

          {/* {item === 1 && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};
