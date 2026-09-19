import toast from "react-hot-toast";
import { DUMMY_BASE_URL } from "../constants";

 export const getMeApi = async () => {
		const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Pass JWT via Authorization header
			}
		})

		const data = await res.json()
		if (res.ok) {
			return data
		} else {
			toast.error(data.message);
			
		}
	}