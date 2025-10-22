
const Header = () => {
    return (
        <header className="absolute top-7 left-7 md:left-10 z-10 flex justify-between">
            <div className="w-fit px-3 md:px-5 py-2 
                  bg-white/60 dark:bg-black/30 
                  backdrop-blur-md rounded-md shadow-md">
                <h4 className="text-xl font-semibold cursor-pointer 
                   text-gray-800 dark:text-gray-50">
                    Aaravam Map
                </h4>
            </div>
        </header>
    )
}

export default Header