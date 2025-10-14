"use client"

import * as React from "react"
import { formatDateRange } from "little-date"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface IDateRangePicker {
    range: DateRange | undefined
    setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function DateRangePicker({ range, setRange }: IDateRangePicker) {

    return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="dates"
                        className="w-56 justify-between font-normal"
                    >
                        {range?.from && range?.to
                            ? formatDateRange(range.from, range.to, {
                                includeTime: false,
                            })
                            : "Select date range"}
                        <ChevronDownIcon />
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
