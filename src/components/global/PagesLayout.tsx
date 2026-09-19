import type { FC, PropsWithChildren } from "react"

const PagesLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className='bg-slate-900 text-gray-200 min-h-screen p-8 flex flex-col justify-center items-center'>
            {children}
        </main>
    )
}

export default PagesLayout