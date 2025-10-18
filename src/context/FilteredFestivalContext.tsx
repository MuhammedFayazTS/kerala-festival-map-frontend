import type { Festival } from '@/types/festival'
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

interface FilteredFestivalContextType {
    filteredFestivals: Festival[] | undefined;
    setFilteredFestivals: Dispatch<SetStateAction<Festival[] | undefined>>
}

const FilteredFestivalContext = createContext<FilteredFestivalContextType | undefined>(undefined);

export const FilteredFestivalContextProvider = ({ children }: { children: ReactNode }) => {
    const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>()
    return (
        <FilteredFestivalContext.Provider value={{ filteredFestivals, setFilteredFestivals }}>
            {children}
        </FilteredFestivalContext.Provider>
    )
}

export const useFestivalContext = () => {
    const context = useContext(FilteredFestivalContext);
    if (!context) throw new Error("useFestivalContext must be used within FestivalProvider");
    return context;
};