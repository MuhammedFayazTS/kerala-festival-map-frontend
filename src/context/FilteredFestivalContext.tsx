import type { Festival } from '@/types/festival'
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

interface FilteredFestivalContextType {
    filteredFestivals: Festival[] | undefined;
    setFilteredFestivals: Dispatch<SetStateAction<Festival[] | undefined>>;
    autoPanEnabled: boolean;
    setAutoPanEnabled: Dispatch<SetStateAction<boolean>>;
}

const FilteredFestivalContext = createContext<FilteredFestivalContextType | undefined>(undefined);

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

export const useFestivalContext = () => {
    const context = useContext(FilteredFestivalContext);
    if (!context) throw new Error("useFestivalContext must be used within FestivalProvider");
    return context;
};
