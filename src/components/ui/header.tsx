import logo from "@/assets/logo.png";

const Header = () => {
    return (
        <header className="absolute top-7 left-7 md:left-10 z-10 flex justify-between w-full max-w-xs">
            <div className="
        w-fit flex items-center gap-2 px-3 py-1
        bg-white/70 dark:bg-black/40
        backdrop-blur-md rounded-lg shadow-lg
        animate-fade-in
      ">
                <img
                    src={logo}
                    alt="Aaravam logo"
                    width={48} height={48}
                    className="
            w-12 h-12 object-contain
            transition-transform duration-200 ease-in-out
            hover:scale-110
          "
                    loading="lazy"
                />
                <h4
                    className="text-xl font-semibold cursor-pointer
            text-gray-800 dark:text-gray-50 select-none
            transition-opacity duration-300"
                >
                    Aaravam
                </h4>
            </div>
        </header>
    );
};

export default Header;
