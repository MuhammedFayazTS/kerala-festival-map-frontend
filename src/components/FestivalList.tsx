import { ScrollArea } from "@/components/ui/scroll-area"
import { FestivalListCard } from './FestivalListCard'
import type { Festival } from "@/types/festival";

interface FestivalListProps {
    festivals: Festival[];
    isLoading: boolean;
    error: Error | null;
}

const FestivalList = ({ festivals, isLoading, error }: FestivalListProps) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load data.</div>;

    return (
        <ScrollArea className='max-h-full flex flex-col px-3 pt-4 sm:pt-0'>
            {
                festivals.map((festival) => (
                    <FestivalListCard key={festival?.id} festival={festival} />
                ))
            }
        </ScrollArea>
    )
}

export default FestivalList