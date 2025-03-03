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

const Admin = () => {
  const [progress, setProgress] = useState<string>(""); // To track progress updates
  const [sessionId, setSessionId] = useState<string | null>(null); // To store the session ID for the WebSocket connection
  const websocketRef = useRef<WebSocket | null>(null); // WebSocket reference
  const scrollRef = useRef<HTMLPreElement | null>(null); // Ref for the scrollable container
  const [isConnected, setIsConnected] = useState<boolean>(false); // Track WebSocket connection status
  const reconnectDelay = 5000; // Delay before reconnecting (5 seconds)


  const startWebSocket = () => {
    let wsUrl = `ws://127.0.0.1:8000/api/scrapper/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      let savedSessionId = localStorage.getItem("sessionId");
      if(savedSessionId) {
        sendMessageToServer(JSON.stringify({ type: "session_id", session_id: savedSessionId }))
      }
      setIsConnected(true)
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        console.log("WS MESSAGE: ", message);

        if (message.type === "session_id" && message.session_id) {
          localStorage.setItem("sessionId", message.session_id);
          setSessionId( message.session_id)
        } 
        
        if (message.type === "old_data" && message.old_data) {
            const oldData = JSON.parse(message.old_data)
            let msg = ""
            oldData.forEach((txt:any) => {
              msg = msg + "\n" + txt
            });
            setProgress(msg)
        }
         else {
          setProgress(
            (prevProgress) => prevProgress + "\n" + JSON.stringify(message)
          );
        }
      } catch (error) {
        setProgress((prevProgress) => prevProgress + "\n" + event.data);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = (event: CloseEvent) => {
      console.log("WebSocket disconnected", event);
      setIsConnected(false);
      // Attempt to reconnect after the delay
      setTimeout(startWebSocket, reconnectDelay);
    };

    websocketRef.current = ws;
  };

  // Function to send a message to the server
  const sendMessageToServer = (message: any) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(message);
    } else {
      console.error("WebSocket is not open.");
      toast.error("WebSocket is not connected.");
    }
  };



  // Automatically scroll to the bottom when progress updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [progress]);

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

  const handleStartScraping = () => {
    if (!sessionId) {
      toast.error("WebSocket not connected yet.");
      return;
    }
    sendMessageToServer("start_scrapping");
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
      <div className="flex gap-1 justify-center items-center">
        Click{" "}
        <Button
          variant="link"
          onClick={handleStartScraping}
          className="cursor-pointer font-semibold"
        >
          START
        </Button>{" "}
        to start scrapping the latest publications data and store in the
        database now.
      </div>

      {progress && (
        <div className="m-2">
          <div className="font-semibold text-gray-500 text-sm">LOGS</div>
          <ScrollArea className="bg-black text-white h-[400px] md:h-[600px] max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1400px] border rounded-md p-4">
            <pre ref={scrollRef}>{progress}</pre>
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
