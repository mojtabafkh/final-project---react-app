import { BASE_URL } from "../constants";

export const getTodosApi = async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    const data = await res.json();
    return data
}

export const deleteTodoApi = async (id: number) => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    return res
}

export const addTodoApi = async (payload: { title: string; completed: boolean }) => {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(payload)
    });
    return res
}

export const updateTodoApi = async (id: number, payload: { title: string; completed: boolean }) => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(payload)
    });
    return res
}