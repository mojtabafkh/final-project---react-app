import PageHeader from "../../components/global/PageHeader"
import type { User } from "../../types/user"
import Parent from "./components/Parent"

const DropDrilling = () => {

    const user: User = {
        id: 1,
        firstName: 'Ali',
        lastName: 'Alavi',
    }

    return (
        <>
            <PageHeader text="Drop Drilling Page" />
            <Parent user={user} />
        </>
    )
}

export default DropDrilling