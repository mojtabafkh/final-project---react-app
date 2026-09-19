import { useEffect, useState } from "react";
import PageHeader from "../../components/global/PageHeader";
import { DUMMY_BASE_URL } from "../../constants";
import type { User } from "../../types/user";

const Profile = () => {


    const [user, setUser] = useState<User | null>(null);

    const getMeApi = async () => {
        const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Pass JWT via Authorization header
            }
        })

        const data = await res.json();
        setUser(data);
    }


    useEffect(() => {
        getMeApi()
    }, [])

    return (
        <>
            <PageHeader text="User Profile" />

            <div className="flex gap-4 mt-4">
                <figure className="w-35 h-35 flex justify-center rounded-lg p-2 bg-slate-700">
                    <img src={user?.image} alt={user?.firstName + ' ' + user?.lastName} />
                </figure>

                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold">{user?.firstName + ' ' + user?.lastName}</h1>
                    <h2 className="text-2xl">{user?.email}</h2>
                    <h3 className="text-2xl">{user?.gender}</h3>
                </div>


            </div>

        </>
    )
}

export default Profile