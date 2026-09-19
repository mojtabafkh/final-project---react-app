import { BASE_URL } from "../constants";
import type { Post } from "../types/post";

export const getpostDetailsApi = async (postId: string): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`)

    if (!response.ok) {
        throw new Error("get post details failed")
    }

    const data: Post = await response.json()
    return data
}