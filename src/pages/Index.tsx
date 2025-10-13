import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Map from "@/components/map/Map"
import FestivalList from "@/components/FestivalList"
import { useEffect, useState } from "react";

const Index = () => {
  const [clientLoaded, setClientLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    setClientLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!clientLoaded) {
    return <div className="h-screen w-screen bg-gradient-to-br from-background to-secondary" />;
  }

  return (
    <div className="h-full w-full relative isolate">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50 -z-10" />
      <div className="absolute inset-0 p-2 sm:p-4 flex flex-col">
        <div className="flex-1 min-h-0 isolate">
          <ResizablePanelGroup
            direction={isMobile ? "vertical" : "horizontal"}
            className={isMobile ? "flex-col-reverse" : "flex-row"}
          >
            <ResizablePanel
              defaultSize={isMobile ? 65 : 60}
            >
              <Map />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={isMobile ? 35 : 40}
              minSize={isMobile ? 35 : 20}
            >
              <FestivalList />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}

export default Index