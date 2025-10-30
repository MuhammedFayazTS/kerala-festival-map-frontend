import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import logo from "@/assets/logo.png";
import fallBackImg from "@/assets/fallback-festival.webp";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link, useNavigate, useParams } from "react-router";
import { Loader } from "lucide-react";
import type { Festival } from "@/types/festival";
import { useQuery } from "@tanstack/react-query";
import { fetchFestivalData } from "@/lib/api";
import { toast } from "sonner";

function renderBoldText(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
            <span
                key={i}
                className="font-semibold text-indigo-700 dark:text-indigo-300"
            >
                {part.slice(2, -2)}
            </span>
        ) : (
            part
        )
    );
}

const tagColors = [
    "bg-indigo-300 text-indigo-950 dark:bg-indigo-800 dark:text-indigo-100",
    "bg-lime-300 text-lime-950 dark:bg-lime-800 dark:text-lime-100",
    "bg-pink-300 text-pink-950 dark:bg-pink-800 dark:text-pink-100",
    "bg-yellow-300 text-yellow-950 dark:bg-yellow-800 dark:text-yellow-100",
    "bg-cyan-300 text-cyan-950 dark:bg-cyan-800 dark:text-cyan-100",
];

function BackIcon() {
    const navigate = useNavigate()
    return (
        <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-100 mr-2 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => navigate(-1)}
            aria-label="Go Back"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );
}

export default function Festival() {
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>();
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

    const parsedId = Number(id);
    const validId = !isNaN(parsedId) && parsedId > 0;

    if (!validId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Invalid festival ID.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
                    <Loader className=" animate-spin mr-2" />  Loading festival details...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-lg text-red-600 dark:text-red-400">
                    Failed to load festival data. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    const festival: Festival | null = data?.festivals?.find(
        (fest: { id: number }) => fest.id === parsedId
    );

    if (!festival) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Festival not found.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
            <header className="flex items-center gap-2 px-4 py-4 bg-gray-100 dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-700">
                <BackIcon />
                <img
                    src={logo}
                    alt="Aaravam logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain transition-transform duration-200 ease-in-out hover:scale-110"
                    loading="lazy"
                />
                <Link to={'/'} className="text-xl font-semibold cursor-pointer text-gray-800 dark:text-gray-50 select-none transition-opacity duration-300 mr-auto">
                    Aaravam
                </Link>
                <ModeToggle />
            </header>

            <div className="flex flex-col lg:flex-row max-w-full mx-auto h-[calc(100vh-4rem)]">
                <div className="w-full lg:max-w-sm flex-shrink-0 flex flex-col items-center lg:items-start bg-gray-50 dark:bg-neutral-800 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 py-3 px-5 sm:px-3 gap-3 overflow-y-auto">
                    <Carousel className="rounded-lg overflow-hidden shadow-md h-56 sm:h-72 w-full">
                        {festival.images?.length ? (
                            festival.images.map((img: string, idx: number) => (
                                <CarouselItem key={idx}>
                                    <img
                                        src={img}
                                        alt={`${festival.name} image ${idx + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem key="fallback-img">
                                <img
                                    src={fallBackImg}
                                    alt={`${festival.name} fallback`}
                                    loading="lazy"
                                    className="w-full h-full object-contain"
                                />
                            </CarouselItem>
                        )}
                    </Carousel>

                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-100 mb-2">
                            {festival.name}
                        </h2>
                        <div className="text-md text-gray-700 dark:text-gray-300 mb-2">
                            {festival.location?.place || "Unknown location"}
                        </div>
                        <div className="text-sm text-pink-800 dark:text-pink-300">
                            {festival.location?.district || ""}
                        </div>

                        {festival.isMajor && (
                            <Badge className="bg-teal-700 text-teal-50 dark:bg-teal-900 dark:text-teal-200 font-bold tracking-wide rounded-lg px-3 py-2 mt-3">
                                Major Festival
                            </Badge>
                        )}

                        <div className="mt-4 flex flex-col gap-2">
                            {festival.startDate && (
                                <div>
                                    <span className="text-md font-semibold text-indigo-900 dark:text-indigo-200">
                                        Date:
                                    </span>{" "}
                                    <span className="text-md text-gray-700 dark:text-gray-200">
                                        {festival.startDate}
                                        {festival.endDate &&
                                            festival.startDate !== festival.endDate &&
                                            ` – ${festival.endDate}`}
                                    </span>
                                </div>
                            )}
                            {festival.malayalamDate && (
                                <div>
                                    <span className="text-md font-semibold text-teal-900 dark:text-teal-200">
                                        Malayalam Date:
                                    </span>{" "}
                                    <span className="text-md text-gray-700 dark:text-gray-100">
                                        {festival.malayalamDate}
                                    </span>
                                </div>
                            )}
                            {festival.malayalamName && (
                                <div>
                                    <span className="text-md font-semibold text-teal-900 dark:text-teal-200">
                                        Malayalam Name:
                                    </span>{" "}
                                    <span className="text-md text-gray-700 dark:text-gray-100">
                                        {festival.malayalamName}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full w-full pb-8">
                        <Card className="bg-transparent shadow-none border-none rounded-none px-4 py-8">
                            <CardContent className="flex flex-col gap-8">
                                {festival.description && (
                                    <section>
                                        <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                                            {renderBoldText(festival.description)}
                                        </div>
                                    </section>
                                )}

                                {festival.tags?.length && festival.tags.length > 0 && (
                                    <section className="flex flex-wrap gap-2 items-center">
                                        {festival.tags.map((tag: string, i: number) => (
                                            <Badge
                                                key={tag}
                                                className={clsx(
                                                    "rounded-full px-4 py-2 font-semibold text-xs tracking-wide shadow ring-1 ring-indigo-200 dark:ring-indigo-900",
                                                    tagColors[i % tagColors.length]
                                                )}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </section>
                                )}
                            </CardContent>
                        </Card>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
