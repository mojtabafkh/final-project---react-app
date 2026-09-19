import { LoaderCircle } from "lucide-react"

const MainLoading = () => {
    return (
        <div className="w-screen h-screen fixed top-0 right-0 bg-slate-700 text-white text-3xl flex gap-3 flex-col justify-center items-center">
            <LoaderCircle size={50} className="animate-spin" />
            Please Wait A Moment ...
        </div>
    )
}

export default MainLoading