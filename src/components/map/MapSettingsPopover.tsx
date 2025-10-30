import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useFestivalContext } from "@/hooks/useFestivalContext";

const MapSettingsPopover = () => {
    const { autoPanEnabled, setAutoPanEnabled } = useFestivalContext()

    return (
        <div className="absolute top-5 right-5 z-50">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full shadow-md"
                        aria-label="Map settings"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-56 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="auto-pan" className="text-sm font-medium">
                            Auto Pan
                        </Label>
                        <Switch
                            id="auto-pan"
                            checked={autoPanEnabled}
                            onCheckedChange={(val) => setAutoPanEnabled(val)}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default MapSettingsPopover;
