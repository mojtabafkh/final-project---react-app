import { createContext } from "react";
import type { theme } from "../types/general";

export type GlobalContextType = {
    theme: theme,
    toggleTheme?: () => void
}

export const GlobalContext = createContext<GlobalContextType>({
    theme: 'light'
});