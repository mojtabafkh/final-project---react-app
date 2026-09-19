import { DUMMY_BASE_URL } from "../constants";
import type { LoginFormData } from "../pages/login";
import type { LoginResponse } from "../types/general";

// login
export const loginApi = async (loginData: LoginFormData): Promise<LoginResponse> => {

    const response = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });

    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Login failed')
    }

    const data: LoginResponse = await response.json();
    return data

}