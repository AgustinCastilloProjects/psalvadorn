import Link from "next/link";

const Footer: React.FC = () => {

    return(
        <footer className="bg-gray-800 text-center">
            <div className="bg-black/5 p-4 text-center text-surface text-white">
                © 2024 Copyright:
                <Link href="https://tw-elements.com/"> Agustin Castillo</Link>
            </div>
        </footer>
    )
}

export default Footer;