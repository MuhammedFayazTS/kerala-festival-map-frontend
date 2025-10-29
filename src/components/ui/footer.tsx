import { Github } from "lucide-react"

const Footer = () => {
    return (
        <footer className="w-full border-t bg-background/60 backdrop-blur-md py-3 border-neutral-400 dark:border-neutral-700 sm:border-transparent">
            <div className="container mx-auto flex items-center justify-between gap-2 px-4 text-sm  text-muted-foreground">
                <p className="text-center sm:text-left">
                    Built by{" "}
                    <a
                        href="https://muhammed-fayaz-ts.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Fayaz
                    </a>
                </p>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/MuhammedFayazTS"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        className="hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export { Footer }
