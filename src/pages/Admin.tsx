import { Button } from "@/components/ui/button";
import { startScrappingPublications } from "@/lib/apis";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WebSocketMessage {
  type?: string;
  session_id?: string;
  [key: string]: any; // Allow other properties
}

const WS_URL = `ws://127.0.0.1:8000/api/scrapper/ws`;

const Admin = () => {
  const [scrapeProgress, setScrapeProgress] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLPreElement | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const reconnectDelay = 5000;

  const startWebSocket = () => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connected");
      let savedSessionId = localStorage.getItem("sessionId");
      if (savedSessionId) {
        console.log("Sending old sesionId to server");
        sendMessageToServer(
          JSON.stringify({ type: "session_id", session_id: savedSessionId })
        );
        setSessionId(savedSessionId);
      } else {
        sendMessageToServer(JSON.stringify({ type: "ping" }));
      }
      setIsConnected(true);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        let message: WebSocketMessage;
        try {
          message = JSON.parse(event.data);

          if (message.type === "session_id" && message.session_id) {
            localStorage.setItem("sessionId", message.session_id);
            setSessionId(message.session_id);
          }

          if (message.type === "old_data" && message.old_data) {
            const oldData = message.old_data;
            let msg = "";
            console.log("OLD DATA", oldData);
            oldData.forEach((txt: any) => {
              msg = msg + "\n" + txt;
            });
            setScrapeProgress(msg);
          } else {
            console.log("message", message);
          }
        } catch (jsonError) {
          // console.log("JSON ERROR: ", event.data, jsonError)
          setScrapeProgress((prevProgress) => prevProgress + "\n" + event.data);
          if(event.data.includes("Completed scrapping")) {
             setIsRunning(false)
          }
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = (event: CloseEvent) => {
      console.log("WebSocket disconnected", event);
      setIsConnected(false);
      setTimeout(startWebSocket, reconnectDelay);
    };
    websocketRef.current = ws;
  };
  const sendMessageToServer = (message: any) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      console.log("Sending message to server")
      if(message=="start_scrapping") setIsRunning(true)
      websocketRef.current.send(message);
    } else {
      console.error("WebSocket is not open.");
      toast.error("WebSocket is not connected.");
    }
  };
  const handleStartScraping = () => {
    if (!sessionId) {
      console.log("STARTING SCRAPE1");
      toast.error("WebSocket not connected yet.");
      return;
    }
    toast.success("Scrapping Started");
    sendMessageToServer("start_scrapping");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [scrapeProgress]);

  // Start WebSocket connection when the component mounts
  useEffect(() => {
    startWebSocket();

    return () => {
      // Cleanup WebSocket when component unmounts
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
      <div className="flex gap-1 justify-center items-center">
        Click{" "}
        <Button
          variant="link"
          onClick={handleStartScraping}
          disabled={isRunning}
          className="cursor-pointer font-semibold"
        >
          START
        </Button>{" "}
        to start scrapping the latest publications data and store in the
        database now.
      </div>

      {scrapeProgress && (
        <div className="m-2">
          <div className="font-semibold text-gray-500 text-sm">LOGS</div>
          <ScrollArea className="bg-black text-white h-[400px] md:h-[600px] max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1400px] border rounded-md p-4">
            <pre ref={scrollRef}>{scrapeProgress}</pre>
          </ScrollArea>
        </div>
      )}

      {/* Connection status */}
      <div className="mt-4">
        {isConnected ? (
          <span className="text-green-500">WebSocket is connected</span>
        ) : (
          <span className="text-red-500">WebSocket is disconnected</span>
        )}
      </div>
    </div>
  );
};



export default Admin;
