import { DUMMY_BASE_URL } from "../constants";
import type { Shop } from "../types/shop";

export const getShopApi = async(): Promise<Shop> => {
    const response = await fetch(`${DUMMY_BASE_URL}/products`)
     
    if (!response){
        throw new Error("get cart failed")
    }
    const data:Shop = await response.json()
    return data
}
