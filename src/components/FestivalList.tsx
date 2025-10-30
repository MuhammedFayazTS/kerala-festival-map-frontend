import { ScrollArea } from "@/components/ui/scroll-area"
import { FestivalListCard } from './FestivalListCard'
import type { Festival, KeralaDistrict } from "@/types/festival";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FestivalCardSkeleton } from "./FestivalCardSkeleton";
import { DateRangePicker } from "./ui/date-range-picker";
import { ModeToggle } from "./ui/mode-toggle";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DistrictSelect } from "./select/DistrictSelect";
import { useDebounce } from "@/hooks/useDebounce";
import { useFestivalContext } from "@/hooks/useFestivalContext";

interface FestivalListProps {
    festivals: Festival[];
    isLoading: boolean;
    error: Error | null;
}

const FestivalList = ({ festivals, isLoading, error }: FestivalListProps) => {
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(2030, 12, 30)
    })
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedDistrict, setSelectedDistrict] = useState<KeralaDistrict | undefined>()
    const { setFilteredFestivals } = useFestivalContext()

    const filterWithinRange = (festivals: Festival[], range: DateRange | undefined) => {
        if (!range) return festivals

        const { from, to } = range

        if (from && !to) {
            const startOfDay = new Date(from).setHours(0, 0, 0, 0)
            const endOfDay = new Date(from).setHours(23, 59, 59, 999)

            return festivals.filter(({ startDate, endDate }) => {
                const start = new Date(startDate).getTime()
                const end = new Date(endDate).getTime()

                return (
                    (start >= startOfDay && start <= endOfDay) ||
                    (end >= startOfDay && end <= endOfDay) ||
                    (start <= startOfDay && end >= endOfDay)
                )
            })
        }

        if (!from && to) {
            const startOfDay = new Date(to).setHours(0, 0, 0, 0)
            const endOfDay = new Date(to).setHours(23, 59, 59, 999)

            return festivals.filter(({ startDate, endDate }) => {
                const start = new Date(startDate).getTime()
                const end = new Date(endDate).getTime()

                return (
                    (start >= startOfDay && start <= endOfDay) ||
                    (end >= startOfDay && end <= endOfDay) ||
                    (start <= startOfDay && end >= endOfDay)
                )
            })
        }

        if (from && to) {
            const startOfRange = new Date(from).setHours(0, 0, 0, 0)
            const endOfRange = new Date(to).setHours(23, 59, 59, 999)

            return festivals.filter(({ startDate, endDate }) => {
                const start = new Date(startDate).getTime()
                const end = new Date(endDate).getTime()

                return (
                    (start >= startOfRange && start <= endOfRange) ||
                    (end >= startOfRange && end <= endOfRange) ||
                    (start <= startOfRange && end >= endOfRange)
                )
            })
        }

        return festivals
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const searchFestivals = (festivals: Festival[], searchTerm: string) => {
        return festivals.filter((festival) =>
            festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            festival.location.place.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const filteredFestivals = useMemo(() => {
        let result = festivals

        if (selectedDistrict) result = result.filter(({ location }) => location?.district?.toLowerCase() === selectedDistrict)

        if (range?.from || range?.to) {
            result = filterWithinRange(result, range)
        }

        if (debouncedSearchTerm) {
            result = searchFestivals(result, debouncedSearchTerm);
        }

        return result
    }, [debouncedSearchTerm, festivals, range, selectedDistrict])

    useEffect(() => {
        setFilteredFestivals(filteredFestivals);
    }, [filteredFestivals, setFilteredFestivals]);

    if (error) return <div className="flex items-center justify-center h-full p-4">
        <Alert
            variant="destructive"
            className="flex items-center gap-2 border-destructive/30 bg-destructive/10 text-destructive shadow-sm"
        >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <AlertDescription className="text-sm font-medium">
                Error loading festivals data: {error?.message}
            </AlertDescription>
        </Alert>
    </div>;

    return (
        <Card className="mx-1 mt-2 sm:mt-0 sm:mx-4 h-full flex flex-col bg-background border-none shadow-xl p-0 overflow-hidden">
            <CardHeader className="p-2 sm:p-4 border-b bg-muted dark:bg-muted/50">
                <div className="flex items-center w-full">
                    <CardTitle className="text-md sm:text-sm lg:text-lg font-bold flex-1 min-w-0 truncate pr-3">
                        Kerala Festival List
                    </CardTitle>
                    <div className="flex items-center gap-2.5 shrink-0">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 backdrop-blur-sm bg-background/50 border border-border/50 rounded-lg overflow-hidden flex items-center justify-center">
                            <ModeToggle />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 max-w-full mt-3">
                    <div className="relative flex-1 min-w-0 sm:min-w-[130px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search festivals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full max-w-full h-10 bg-background/90 border-border/50 focus-visible:ring-primary/20"
                        />
                    </div>
                    <div className="flex items-stretch gap-3 min-w-0">
                        <DistrictSelect selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />
                        <DateRangePicker range={range} setRange={setRange} />
                    </div>
                </div>
            </CardHeader>
            <ScrollArea className="flex-1 overflow-y-auto">
                <CardContent className="space-y-3 sm:space-y-4 px-2 sm:px-4">
                    {
                        isLoading
                            ? Array.from({ length: 5 }).map((_, i) => <FestivalCardSkeleton key={i} />)
                            :
                            filteredFestivals.map((festival) => (
                                <FestivalListCard key={festival?.id} festival={festival} />
                            ))
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}

export default FestivalList