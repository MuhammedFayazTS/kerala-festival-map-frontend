import { createContext } from "react";
import type { Festival } from "@/types/festival";

export interface FilteredFestivalContextType {
  filteredFestivals: Festival[] | undefined;
  setFilteredFestivals: React.Dispatch<React.SetStateAction<Festival[] | undefined>>;
  autoPanEnabled: boolean;
  setAutoPanEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilteredFestivalContext = createContext<FilteredFestivalContextType | undefined>(undefined);
