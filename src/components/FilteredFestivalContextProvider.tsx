import { useState, type ReactNode } from "react";
import { FilteredFestivalContext } from "../context/FilteredFestivalContext";
import type { Festival } from "@/types/festival";

export const FilteredFestivalContextProvider = ({ children }: { children: ReactNode }) => {
    const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>();
    const [autoPanEnabled, setAutoPanEnabled] = useState(true);

    return (
        <FilteredFestivalContext.Provider
            value={{
                filteredFestivals,
                setFilteredFestivals,
                autoPanEnabled,
                setAutoPanEnabled,
            }}
        >
            {children}
        </FilteredFestivalContext.Provider>
    );
};
