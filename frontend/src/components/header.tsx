import {ModeToggle} from "@/components/mode-toggle.tsx";

function Header() {
    return (
        <div className="flex items-center justify-between p-4 bg-primary shadow-md">
            <h1 className="text-xl font-bold text-white">Smart-Tri🌡️</h1>
            <nav>
                <ModeToggle/>
            </nav>
        </div>
    )
}

export default Header
