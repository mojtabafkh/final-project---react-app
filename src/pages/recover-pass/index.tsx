import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import DsButton from "../../components/design-system/DsButton"
import PageHeader from "../../components/global/PageHeader"
import PagesLayout from "../../components/global/PagesLayout"
import { recoverPassApi } from "../../service/recover-pass-service";
import type { RecoverPassForm } from "../../types/recover-pass";

const RecoverPass = () => {

    const navigate = useNavigate();
    const [recoveredPassword, setRecoveredPassword] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RecoverPassForm>();

    const onSubmit = async (formData: RecoverPassForm) => {
        setErrorMessage('');
        setRecoveredPassword(null);
        setIsLoading(true);

        try {
            const user = await recoverPassApi(formData);
            setRecoveredPassword(user.password);
        } catch (error: any) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PagesLayout>
            <PageHeader text="Recover Your Password" />

            {
                recoveredPassword ?
                    <div className="max-w-sm mx-auto text-center">
                        <p className="text-lg mb-2">Your password is:</p>
                        <p className="text-2xl font-bold text-green-500 mb-6">{recoveredPassword}</p>
                        <DsButton color="blue" size="lg" text="Back to Login" onClick={() => navigate('/login')} />
                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto flex flex-col gap-4">

                        <div>
                            <label className="text-lg mb-1 block">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md"
                                {...register('username', { required: 'Username is required' })}
                            />
                            {errors.username && (
                                <span className="text-xs text-red-500">{errors.username.message}</span>
                            )}
                        </div>

                        <div>
                            <label className="text-lg mb-1 block">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="text-xs text-red-500">{errors.email.message}</span>
                            )}
                        </div>

                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}

                        <div className="flex gap-2">
                            <DsButton type="submit" color="green" size="lg" text="Recover Password" isLoading={isLoading} />
                            <DsButton type="button" color="gray" size="lg" text="Back" onClick={() => navigate('/login')} />
                        </div>

                    </form>
            }

        </PagesLayout>
    )
}

export default RecoverPass