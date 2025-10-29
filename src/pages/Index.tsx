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

  const bgGradient = isMobile
    ? 'bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700'
    : 'bg-gradient-to-br from-green-50 via-amber-100 to-green-100 dark:from-neutral-900 dark:via-amber-500/30 dark:to-neutral-800';

  return (
    <FilteredFestivalContextProvider>
      <div className={`h-full w-full relative isolate ${bgGradient}`}>

        {!isMobile && (<svg
          className="absolute left-0 bottom-0 w-full max-h-44 pointer-events-none select-none opacity-80 dark:opacity-60"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M0,192L80,192C160,192,320,192,480,213.3C640,235,800,277,960,277.3C1120,277,1280,235,1360,213.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            className="fill-green-300 dark:fill-green-900"
          />
        </svg>)}

        {!isMobile && (<svg
          className="absolute bottom-8 right-5 w-36 h-36 md:w-56 md:h-56 pointer-events-none select-none opacity-60 dark:opacity-40"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="70" cy="110" rx="18" ry="8" className="fill-green-800 dark:fill-green-950" />
          <rect x="65" y="50" width="10" height="60" rx="5" className="fill-amber-900 dark:fill-amber-800" />
          <path
            d="M70 50 Q85 35 75 15 Q75 40 70 10 Q65 40 65 15 Q55 35 70 50 Q95 45 70 50 Q45 45 70 50"
            className="fill-green-700 dark:fill-green-900"
          />
        </svg>)}

        <div className="absolute inset-0 p-2 sm:p-4 flex flex-col">
          <div className="flex-1 min-h-0 isolate">
            <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
              <ResizablePanel defaultSize={isMobile ? 65 : 60}>
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
  );
}

export default Index