import { useEffect } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import DsButton from "../../components/design-system/DsButton"
import PageHeader from "../../components/global/PageHeader"
import PagesLayout from "../../components/global/PagesLayout"

import { loginApi } from "../../service/login-service"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
export type LoginFormData = {
    username: string
    password: string
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();

    // const loginApi = async () => {
    //     const res = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formData)
    //     });

    //     const data = await res.json()
    //     if (res.ok) {
    //         return data
    //     } else {
    //         toast.error(data.message)
    //     }
    // }

    // const {loginApi} = useContext(LocalContext)
    const { mutate: login, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            sessionStorage.setItem('token', data.accessToken);
            toast.success('You Logined In Successfuly :)');
            navigate('/app/home');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onLogin = (formData: LoginFormData) => {
        login({
            username: formData.username,
            password: formData.password
        });
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/app/home')
        }
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/app/home')
        }
    }, [])

    return (
        <PagesLayout>
            <PageHeader text="Login Page" />

            <form className="bg-slate-800 p-8 rounded-lg mx-auto w-1/3" onSubmit={handleSubmit(onLogin)}>
                <div className='mb-4'>
                    <label className='text-lg mb-1 flex justify-between'>
                        Username
                        {errors.username && <span className="text-red-500">Username is required</span>}
                    </label>
                    <input
                        type="text"
                        placeholder='Enter Todo Username'
                        className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                        {...register('username', { required: true })}

                    />
                </div>

                <div className='mb-4'>
                    <label className='text-lg mb-1 flex justify-between'>
                        Password
                        {errors.password && <span className="text-red-500">Password is required</span>}
                    </label>
                    <input
                        type="password"
                        placeholder='Enter Passweord'
                        className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                        {...register('password', { required: true })}

                    />
                </div>

                <div className="flex gap-4 mt-6">
                    <DsButton type="submit" color="blue" size="lg" text="Login To App" isLoading={isPending} />
                    <Link to="/recover-password">
                        <DsButton color="gray" size="lg" text="Recover Pasword" isDisabled={isPending} />
                    </Link>
                </div>


            </form>


        </PagesLayout>
    )
}

export default Login