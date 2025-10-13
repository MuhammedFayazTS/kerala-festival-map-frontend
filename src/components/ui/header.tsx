import { ModeToggle } from './mode-toggle'

const Header = () => {
    return (
        <header className='flex justify-between px-5 md:px-10 py-2.5'>
            <h4 className='text-xl font-semibold'>Header</h4>
            <ModeToggle />
        </header>
    )
}

export default Header