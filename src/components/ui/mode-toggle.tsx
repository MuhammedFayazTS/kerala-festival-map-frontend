import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
            className="relative overflow-hidden"
        >
            <Sun
                className={`absolute h-5 w-5 transition-all duration-300 
                    ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}
            />

            <Moon
                className={`absolute h-5 w-5 transition-all duration-300 
                    ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
            />
        </Button>
    );
}
