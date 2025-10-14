import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const FestivalCardSkeleton = () => {
    return (
        <Card className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-0">
            <div className="flex flex-row h-full">
                <div className="w-1/3 relative">
                    <Skeleton className="absolute inset-0 w-full h-full rounded-l-lg" />
                </div>

                <CardContent className="flex flex-col justify-between p-2 md:p-4 flex-1">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-4 w-1/4 mt-2" />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <Skeleton className="h-5 w-12 rounded-full" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};
