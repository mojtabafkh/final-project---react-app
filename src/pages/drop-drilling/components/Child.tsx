import type { User } from "../../../types/user"

const Child = ({ user }: { user: User }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-2xl mt-4">
            <h2 className="text-2xl">Child Component</h2>
            <p className="text-xl mt-2">{user.firstName} {user.lastName}</p>
        </div>
    )
}

export default Child