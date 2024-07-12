import Link from "next/link";

const Navbar: React.FC = () => {

    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 justify-center">
                        <h1 className="text-gray-400">Processo Seletivo Alvadorn Consultoria</h1>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;