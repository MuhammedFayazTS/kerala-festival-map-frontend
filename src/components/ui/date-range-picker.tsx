"use client"

import * as React from "react"
import { formatDateRange } from "little-date"
import { CalendarRange, ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useResponsive } from "@/hooks/useResponsive"

interface IDateRangePicker {
    range: DateRange | undefined
    setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function DateRangePicker({ range, setRange }: IDateRangePicker) {
    const { isMobile } = useResponsive();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="dates"
                    className="min-w-10 sm:min-w-56 justify-between font-normal"
                >
                    {isMobile ?
                        <CalendarRange />
                        : <>
                            {range?.from && range?.to
                                ? formatDateRange(range.from, range.to, {
                                    includeTime: false,
                                })
                                : "Select date range"}
                            <ChevronDownIcon />
                        </>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="range"
                    selected={range}
                    captionLayout="dropdown"
                    onSelect={(range) => {
                        setRange(range)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
