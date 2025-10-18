import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Map from "@/components/map/Map"
import FestivalList from "@/components/FestivalList"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFestivalData } from "@/lib/api";
import { toast } from "sonner";
import { FilteredFestivalContextProvider } from "@/context/FilteredFestivalContext";
import { useResponsive } from "@/hooks/useResponsive";

const Index = () => {
  const [clientLoaded, setClientLoaded] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["festivals"],
    queryFn: fetchFestivalData,
    meta: {
      onError: () => {
        toast.error("Error", {
          description: "Failed to fetch dam data. Please try again later.",
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)'
          } as React.CSSProperties
        });
      },
    },
  });

  if (!clientLoaded) {
    return <div className="h-screen w-screen bg-gradient-to-br from-background to-secondary" />;
  }

  return (
    <FilteredFestivalContextProvider>
      <div className="h-full w-full relative isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50 -z-10" />
        <div className="absolute inset-0 p-2 sm:p-4 flex flex-col">
          <div className="flex-1 min-h-0 isolate">
            <ResizablePanelGroup
              direction={isMobile ? "vertical" : "horizontal"}
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
                maxSize={isMobile ? 80 : 70}
              >
                <FestivalList
                  festivals={data?.festivals || []}
                  isLoading={isLoading}
                  error={error as Error}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </FilteredFestivalContextProvider>
  )
}

export default Index