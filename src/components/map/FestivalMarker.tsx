import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import type { Festival } from "@/types/festival";
import type { ReactNode } from "react";

import TempleIco from "@/assets/icons/temple.svg"
import DrumIco from "@/assets/icons/drum.svg"
import Boat from "@/assets/icons/boat.svg"
import Food from "@/assets/icons/food.svg"
import KathakaliIco from "@/assets/icons/kathakali.svg"

interface FestivalMarkerProps {
    festival: Festival;
    isCollapsed?: boolean;
}

const getFestivalIcon = (tags: string[]): ReactNode => {
    const lowerTags = tags.map(tag => tag.toLowerCase());

    if (lowerTags.includes("temple")) return <img
        src={TempleIco}
        className="w-8 h-8"
    />;
    if (lowerTags.includes("ritual")) return <img
        src={TempleIco}
        className="w-8 h-8"
    />;
    if (lowerTags.includes("music")) return <img
        src={DrumIco}
        className="w-8 h-8"
    />;
    if (lowerTags.includes("boat")) return <img
        src={Boat}
        className="w-8 h-8"
    />;
    if (lowerTags.includes("dance")) return <img
        src={KathakaliIco}
        className="w-8 h-8"
    />;
    if (lowerTags.includes("food")) return <img
        src={Food}
        className="w-8 h-8"
    />;

    return <img
        src={KathakaliIco}
        className="w-8 h-8"
    />;
};

const getFestivalClassNames = (tags?: string[]): { gradient: string; border: string } => {
    if (!tags || !tags?.length) return {
        gradient: "bg-gradient-to-br from-yellow-200 via-orange-300 to-red-300",
        border: "border-yellow-500",
    };

    const lowerTags = tags?.map(tag => tag.toLowerCase());

    if (lowerTags.includes("temple") || lowerTags.includes("ritual")) {
        return {
            gradient: "bg-gradient-to-br from-yellow-200 via-orange-300 to-red-300",
            border: "border-yellow-500",
        };
    }

    if (lowerTags.includes("music")) {
        return {
            gradient: "bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-400",
            border: "border-pink-500",
        };
    }

    if (lowerTags.includes("boat")) {
        return {
            gradient: "bg-gradient-to-br from-blue-200 via-teal-300 to-green-300",
            border: "border-blue-500",
        };
    }

    if (lowerTags.includes("dance")) {
        return {
            gradient: "bg-gradient-to-br from-purple-200 via-pink-300 to-red-300",
            border: "border-amber-500",
        };
    }

    if (lowerTags.includes("food")) {
        return {
            gradient: "bg-gradient-to-br from-yellow-100 via-green-200 to-emerald-200",
            border: "border-green-400",
        };
    }

    return {
        gradient: "bg-gradient-to-br from-green-200 via-yellow-200 to-red-200",
        border: "border-yellow-500",
    };
};


const FestivalMarker = ({ festival, isCollapsed = false }: FestivalMarkerProps) => {
    const { name, startDate, endDate, location, tags = [] } = festival;
    const { gradient, border } = getFestivalClassNames(festival.tags);

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isActive = today >= start && today <= end;

    return (
        <div className="relative group cursor-pointer select-none">

            {/* Radar Wave */}
            {isActive && (
                <span
                    className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full animate-ping duration-1000 opacity-80
                    ${gradient.replace("bg-gradient-to-br", "bg-gradient-to-tr")}`}
                    style={{ zIndex: 0 }}
                ></span>
            )}

            <div
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-xl border-2 
                 ${gradient} ${border}
                 transform transition-transform duration-300 group-hover:scale-110 animate-bounce-slow`}
            >
                <span className="text-white text-xl">{getFestivalIcon(tags)}</span>
            </div>

            {!isCollapsed && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 z-30 hidden group-hover:block">
                    <Card className="w-64 shadow-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg relative">
                        {/* Pointer Arrow */}
                        <div
                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-700"
                        ></div>

                        <CardContent className="p-3">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{name}</h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                                <CalendarDays className="w-4 h-4" />
                                <p>
                                    {new Date(startDate).toLocaleDateString()}
                                    {startDate !== endDate && ` - ${new Date(endDate).toLocaleDateString()}`}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                                <MapPin className="w-4 h-4" />
                                <p>{location.place}</p>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs dark:text-gray-200">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default FestivalMarker;
