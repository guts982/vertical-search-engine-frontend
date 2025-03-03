import { Button } from "@/components/ui/button";
import { startScrappingPublications } from "@/lib/apis";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

const Admin = () => {
  const [progress, setProgress] = useState(""); // To track progress updates
  const [sessionId, setSessionId] = useState(null); // To store the session ID for the WebSocket connection
  const [scrapingStarted, setScrapingStarted] = useState(false); // To track if scraping has started
  const websocketRef = useRef(null); // WebSocket reference
  const scrollRef = useRef(null);
  // Function to initiate WebSocket connection
  const startWebSocket = () => {
    const ws = new WebSocket("ws://127.0.0.1:8000/api/scrapper/ws"); // Assuming FastAPI runs on localhost:8000
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    // ws.onmessage = (event) => {
    //     const message = event.data;
    //     setProgress((prevProgress) => prevProgress + "\n" + message);
    // };

    ws.onmessage = (event) => {
      try {
        // Attempt to parse the message as JSON
        const message = JSON.parse(event.data);
        console.log("WS MESSAGE: ", message);
        // Handle JSON messages (e.g., session_id)
        if (message.type === "session_id") {
          setSessionId(message.session_id); // Set the session ID
        } else {
          // Handle other JSON messages
          setProgress(
            (prevProgress) => prevProgress + "\n" + JSON.stringify(message)
          );
        }
      } catch (error) {
        // If parsing fails, treat the message as plain text
        setProgress((prevProgress) => prevProgress + "\n" + event.data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = (err) => {
      console.log("WebSocket disconnected", err);
    };

    websocketRef.current = ws;
  };

  // Function to send a message to the server
  const sendMessageToServer = (message: string) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(message);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  const startScrapping = async () => {
    try {
      const data = await startScrappingPublications(sessionId);
      console.log("success data: ", data);
      toast.success("SUCCESS", {
        description: "Successfully started the scrapping",
        closeButton: true,
      });
    } catch (err: any) {
      console.log("Error while scrapping data: ", err);
      toast.error("REQUEST ERROR ENCOUNTERED", {
        description: "Error while starting the scrapping",
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    startWebSocket(); // Start WebSocket connection when the component mounts
    return () => {
      // Cleanup WebSocket when component unmounts
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); // Smooth scroll to bottom
    }
  }, [progress]); 
  
  const handleStartScraping = () => {
    if (!sessionId) {
      alert("WebSocket not connected yet.");
      return;
    }
    sendMessageToServer("start_scrapping");
    // startScrapping();
  };
  return (
    <div className="w-full   min-h-[80vh] flex flex-col justify-center items-center ">
      <div className="flex gap-1 justify-center items-center">
        Click{" "}
        <Button variant={"link"}   onClick={handleStartScraping} className="cursor-pointer font-semibold">
          START
        </Button>{" "}
        to start scrapping latest publications data and store in database now.
      </div>

      {progress && (
        <div className="m-2">
          <div className="font-semibold text-gray-500 text-sm">LOGS</div>
          <ScrollArea className="bg-black text-white  h-[400px] md:h-[600px]  max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px]  2xl:max-w-[1400px]   border rounded-md  p-4">
            <pre  ref={scrollRef} >{progress}</pre>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Admin;
