import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Festival } from "@/types/festival"

import fallbackImage from "@/assets/fallback-festival.webp"

export function FestivalListCard({ festival }: { festival: Festival }) {
    const { name, startDate, endDate, location, tags, images } = festival

    const imageUrl = images?.[0] || fallbackImage
    const formattedDate =
        startDate === endDate
            ? new Date(startDate).toLocaleDateString()
            : `${new Date(startDate).toLocaleDateString()} - ${new Date(
                endDate
            ).toLocaleDateString()}`

    return (
        <Card className="w-full max-w-3xl overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-0">
            <div className="flex flex-row h-full">
                <div className="w-1/3 relative">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-contain sm:object-cover rounded-l-lg"
                    />
                </div>

                <CardContent className="flex flex-col justify-between p-2 md:p-4 flex-1">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{location.place}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{location.district}</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                            {formattedDate}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-0.5 md:gap-2 mt-1 md:mt-3">
                        {tags?.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
