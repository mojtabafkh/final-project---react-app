// import { create } from "zustand";

// interface ShopStores {
//     count: number
//     plus: (productsId:number) => void
//     minus: (productsId: number) => void
// }

// export const useShop = create<ShopStores>((set) => ({
//     count: 0,
//     plus: () => {
//         set((state) => ({
//             count: state.count + 1
//         }))
//     },
//     minus: () => {
//         set((state) => ({
//             count: state.count - 1
//         }))
//     }
// }
// )
// )
import { create } from "zustand";
import type { Products } from "../types/shop";
import toast from "react-hot-toast";


interface CartItem {
    product: Products;
    quantity: number;
}

interface ShopStores {
    quantities: Record<number, number>;
    cart: CartItem[];

    plus: (productId: number) => void;
    minus: (productId: number) => void;
    getQuantity: (productId: number) => number;

    addToCart: (product: Products) => void;
    removeFromCart: (productId: number) => void;
    increaseCartItem: (productId: number) => void;
    decreaseCartItem: (productId: number) => void;
    clearCart: () => void;

    totalItemsInCart: () => number;
    totalPriceInCart: () => number;
}

export const useShop = create<ShopStores>((set, get) => ({
    quantities: {},
    cart: [],

    plus: (productId) => {
        set((state) => ({
            quantities: {
                ...state.quantities,
                [productId]: (state.quantities[productId] ?? 0) + 1
            }
        }));
    },

    minus: (productId) => {
        set((state) => {
            const current = state.quantities[productId] ?? 0;
            const next = Math.max(0, current - 1);
            return {
                quantities: {
                    ...state.quantities,
                    [productId]: next
                }
            };
        });
    },

    getQuantity: (productId) => {
        return get().quantities[productId] ?? 0;
    },

    addToCart: (product) => {
        const quantity = get().quantities[product.id] ?? 1;

        set((state) => {
            const existingIndex = state.cart.findIndex(
                (item) => item.product.id === product.id
            );

            if (existingIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + quantity
                };
                return {
                    cart: updatedCart,
                    quantities: { ...state.quantities, [product.id]: 0 }
                };

            }

            return {
                cart: [...state.cart, { product, quantity }],
                quantities: { ...state.quantities, [product.id]: 0 }
            };
        });
         toast.success(`${product.title} added to cart`);
    },

    removeFromCart: (productId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.product.id !== productId)
        }));
    },

    increaseCartItem: (productId) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        }));
    },

    decreaseCartItem: (productId) => {
        set((state) => ({
            cart: state.cart
                .map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        }));
    },

    clearCart: () => {
        set({ cart: [] });
    },

    totalItemsInCart: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    totalPriceInCart: () => {
        return get().cart.reduce((sum, item) => {
            const discounted =
                item.product.price -
                (item.product.price * item.product.discountPercentage) / 100;
            return sum + discounted * item.quantity;
        }, 0);
    }
}));