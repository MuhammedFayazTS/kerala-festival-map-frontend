import { FilteredFestivalContext } from '@/context/FilteredFestivalContext';
import { useContext } from 'react';

export const useFestivalContext = () => {
    const context = useContext(FilteredFestivalContext);
    if (!context) throw new Error("useFestivalContext must be used within FestivalProvider");
    return context;
};
