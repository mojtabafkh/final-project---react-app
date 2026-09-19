import { useContext } from "react"
import { UserContext } from ".."

const Child = () => {

    const user = useContext(UserContext)

    return (
        <div className="bg-gray-800 p-4 rounded-2xl mt-4">
            <h2 className="text-2xl">Child Component</h2>
            <p className="text-xl mt-2">{user?.firstName} {user?.lastName}</p>
        </div>
    )
}

export default Child