import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import type { Festival } from "@/types/festival";
import type { ReactNode } from "react";

import TempleIco from "@/assets/icons/temple.svg"
import RitualIco from "@/assets/icons/ritual.svg"
import FestivalIco from "@/assets/icons/candle.svg"
import DrumIco from "@/assets/icons/drum.svg"
import Boat from "@/assets/icons/boat.svg"
import Food from "@/assets/icons/food.svg"
import DanceIcon from "@/assets/icons/dance.svg"
// import KathakaliIco from "@/assets/icons/kathakali.svg"

interface FestivalMarkerProps {
    festival: Festival;
    isCollapsed?: boolean;
    focusZoomOnClick: (id: number) => void;
}

const getFestivalIcon = (tags: string[]): ReactNode => {
    const lowerTags = tags.map((tag) => tag.toLowerCase());

    const baseIconStyle = "w-7 h-7 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]";

    if (lowerTags.includes("temple")) return <img src={TempleIco} className={baseIconStyle} />;
    if (lowerTags.includes("ritual")) return <img src={RitualIco} className={baseIconStyle} />;
    if (lowerTags.includes("music") || lowerTags.includes("music festival")) return <img src={DrumIco} className={baseIconStyle} />;
    if (lowerTags.includes("boat") || lowerTags.includes("boat race")) return <img src={Boat} className={baseIconStyle} />;
    if (lowerTags.includes("dance") || lowerTags.includes("dance festival")) return <img src={DanceIcon} className={baseIconStyle} />;
    if (lowerTags.includes("food")) return <img src={Food} className={baseIconStyle} />;

    return <img src={FestivalIco} className={baseIconStyle} />;
};


const getFestivalClassNames = (tags?: string[]): { gradient: string; border: string; glow: string } => {
    if (!tags || !tags.length)
        return {
            gradient: "bg-gradient-to-tr from-amber-300 via-yellow-200 to-white",
            border: "border-yellow-500",
            glow: "shadow-[0_0_12px_rgba(255,215,0,0.5)]",
        };

    const lowerTags = tags.map((tag) => tag.toLowerCase());

    if (lowerTags.includes("temple"))
        return {
            gradient: "bg-gradient-to-tr from-yellow-200 via-orange-100 to-red-200",
            border: "border-yellow-500",
            glow: "shadow-[0_0_12px_rgba(255,165,0,0.6)]",
        };

    if (lowerTags.includes("ritual"))
        return {
            gradient: "bg-gradient-to-tr from-red-200 via-orange-300 to-yellow-400",
            border: "border-yellow-500",
            glow: "shadow-[0_0_12px_rgba(255,165,0,0.6)]",
        };

    if (lowerTags.includes("music") || lowerTags.includes("music festival"))
        return {
            gradient: "bg-gradient-to-tr from-purple-300 via-rose-300 to-amber-200",
            border: "border-rose-400",
            glow: "shadow-[0_0_12px_rgba(147,112,219,0.6)]",
        };

    if (lowerTags.includes("boat") || lowerTags.includes("boat race"))
        return {
            gradient: "bg-gradient-to-tr from-sky-300 via-teal-400 to-emerald-400",
            border: "border-cyan-500",
            glow: "shadow-[0_0_12px_rgba(0,191,255,0.6)]",
        };

    if (lowerTags.includes("dance") || lowerTags.includes("dance festival"))
        return {
            gradient: "bg-gradient-to-tr from-pink-200 via-purple-300 to-indigo-400",
            border: "border-fuchsia-500",
            glow: "shadow-[0_0_12px_rgba(199,21,133,0.6)]",
        };

    if (lowerTags.includes("food"))
        return {
            gradient: "bg-gradient-to-tr from-lime-200 via-green-300 to-emerald-400",
            border: "border-emerald-500",
            glow: "shadow-[0_0_12px_rgba(50,205,50,0.6)]",
        };

    return {
        gradient: "bg-gradient-to-tr from-amber-300 via-yellow-200 to-white",
        border: "border-yellow-500",
        glow: "shadow-[0_0_12px_rgba(255,215,0,0.5)]",
    };
};

const FestivalMarker = ({ festival, isCollapsed = false, focusZoomOnClick }: FestivalMarkerProps) => {
    const { name, startDate, endDate, location, tags = [], images } = festival;
    const { gradient, border, glow } = getFestivalClassNames(festival.tags);

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isActive = today >= start && today <= end;

    return (
        <div
            onClick={() => focusZoomOnClick(festival.id)}
            className="relative group cursor-pointer select-none">

            {/* Radar Wave */}
            {isActive && (
                <span
                    className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full animate-ping duration-1000 opacity-80
                    ${gradient.replace("bg-gradient-to-br", "bg-gradient-to-tr")}`}
                    style={{ zIndex: 0 }}
                ></span>
            )}

            <div
                className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${gradient} ${border} ${glow}
                transition-all duration-300 transform hover:scale-110 active:scale-95`}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                    {
                        images?.[0] ? (
                            <img src={images?.[0]} alt={name} loading="lazy" className="w-full h-full object-cover object-center" />
                        ) : getFestivalIcon(tags)
                    }
                </div>

                {isActive && (
                    <span
                        className={`absolute inset-0 rounded-full animate-pulse opacity-70 ${glow}`}
                    ></span>
                )}
            </div>

            {!isCollapsed && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 hidden group-hover:block">
                    <Card className="w-64 shadow-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg relative">

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
