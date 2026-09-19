import { Minus, Plus, ShoppingCart } from "lucide-react";
import DsButton from "../../../components/design-system/DsButton";
import type { Products, Shop } from "../../../types/shop";
import { getShopApi } from "../../../service/shop-service";
import { useQuery } from "@tanstack/react-query";
import { useShop } from "../../../stores/shop-stores";
import { useNavigate } from "react-router";

const ShopDis = () => {
    const { data } = useQuery<Shop>({
        queryKey: ['Shop'],
        queryFn: getShopApi
    })

        const navigate = useNavigate()
        
    

    const { plus, minus, getQuantity, addToCart, totalItemsInCart } = useShop()

    const cartCount = totalItemsInCart();

    const getDiscountedPrice = (product: Products) =>
        product.price - (product.price * product.discountPercentage) / 100;

    return (
        <>
            <div className="relative flex justify-end px-6 pt-4">
                <DsButton
                    justIcon
                    size="lg"
                    color="gray"
                    icon={<ShoppingCart size={18} />}
                    className="bg-slate-800/80! backdrop-blur-md border border-slate-700/60
                     hover:bg-slate-700! rounded-2xl!
                     shadow-lg shadow-black/20"
                    onClick={() => navigate("/app/cart")}
                />
                {cartCount > 0 && (
                    <span className="absolute top-2.5 right-8 min-w-[18px] h-[18px] px-1
                             rounded-full bg-gradient-to-r from-rose-500 to-orange-500
                             text-white text-[10px] font-bold flex items-center justify-center
                             shadow-md shadow-rose-500/30 pointer-events-none">
                        {cartCount}
                    </span>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
                {data?.products?.map((product) => {
                    const quantity = getQuantity(product.id);

                    return (
                        <div
                            key={product.id}
                            className="group relative bg-slate-800/60 backdrop-blur-md rounded-3xl 
                       border border-slate-700/50 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.3)]
                       hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]
                       hover:border-slate-600 transition-all duration-500 ease-out
                       hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Discount ribbon */}
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-flex items-center gap-1 bg-gradient-to-r 
                                 from-rose-500 to-orange-500 text-white text-[11px] 
                                 font-bold px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30">
                                        -{Math.round(product.discountPercentage)}%
                                    </span>
                                </div>
                            )}

                            {/* Wishlist / quick-view ghost button, appears on hover */}
                            <DsButton
                                justIcon
                                size="sm"
                                color="gray"
                                icon={<ShoppingCart size={14} />}
                                className="absolute top-4 right-4 z-10 bg-slate-900/60! backdrop-blur-sm
                             rounded-full! opacity-0 group-hover:opacity-100
                             translate-y-1 group-hover:translate-y-0
                             transition-all duration-300 hover:bg-slate-900!"
                                onClick={() => {navigate('/app/cart')}}
                            />

                            {/* Image */}
                            <div className="relative w-full h-48 bg-gradient-to-b from-slate-800 to-slate-900/50 
                            flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover 
                           group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col gap-3">
                                <h3 className="text-[15px] font-semibold text-slate-100 leading-snug 
                             line-clamp-1 tracking-tight">
                                    {product.title}
                                </h3>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-white tracking-tight">
                                        ${getDiscountedPrice(product).toFixed(2)}
                                    </span>
                                    {product.discountPercentage > 0 && (
                                        <span className="text-xs text-slate-500 line-through font-medium">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Quantity stepper */}
                                <div className="flex items-center justify-between bg-slate-900/60 
                              rounded-2xl px-2 py-1.5 border border-slate-700/50">
                                    <DsButton
                                        justIcon
                                        size="sm"
                                        color="gray"
                                        icon={<Minus size={14} />}
                                        className="bg-slate-800! text-slate-300! border border-slate-700
                             hover:bg-white! hover:text-slate-900!
                             active:scale-90 transition-all duration-200"
                                        onClick={() => minus(product.id)}
                                    />

                                    <span className="text-sm font-bold text-white w-6 text-center 
                                 tabular-nums">
                                        {quantity}
                                    </span>

                                    <DsButton
                                        justIcon
                                        size="sm"
                                        color="gray"
                                        icon={<Plus size={14} />}
                                        className="bg-slate-800! text-slate-300! border border-slate-700
                             hover:bg-white! hover:text-slate-900!
                             active:scale-90 transition-all duration-200"
                                        onClick={() => plus(product.id)}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-[11px] 
                              text-slate-500 font-medium tabular-nums">
                                    <span>SKU #{product.sku}</span>
                                </div>

                                <DsButton
                                    text="Add to Cart"
                                    color="gray"
                                    size="md"
                                    className="bg-white! text-slate-900! hover:bg-slate-200! w-full mt-1 
               rounded-xl! font-semibold tracking-tight
               shadow-lg shadow-black/20 justify-center
               active:scale-[0.98] transition-all duration-200"
                                    onClick={() => addToCart(product)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    )
}

export default ShopDis