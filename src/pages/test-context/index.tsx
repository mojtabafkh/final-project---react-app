import { createContext } from "react";
import PageHeader from "../../components/global/PageHeader";
import type { User } from "../../types/user";
import Parent from "./components/Parent";

export const UserContext = createContext<User | null>(null);

const TestContext = () => {

    const user: User = {
        id: 1,
        firstName: 'Ali',
        lastName: 'Alavi',
    }

    return (
        <>
            <PageHeader text="Drop Drilling Page" />
            
            <UserContext.Provider value={user}>
                <Parent />
            </UserContext.Provider>

        </>
    )
}

export default TestContext