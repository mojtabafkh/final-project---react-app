import { Minus, Plus, ShoppingCart, ArrowLeft, LucideTrash2 } from "lucide-react";
import DsButton from "../../components/design-system/DsButton";
import { useNavigate } from "react-router";
import { useShop } from "../../stores/shop-stores";


const Cart = () => {
    const navigate = useNavigate();
    const { cart, increaseCartItem, decreaseCartItem, removeFromCart, totalPriceInCart, clearCart } = useShop();

    const totalPrice = totalPriceInCart();

    const getDiscountedPrice = (price: number, discountPercentage: number) =>
        price - (price * discountPercentage) / 100;

    if (cart.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-10 flex flex-col items-center justify-center text-center gap-4">
                <ShoppingCart size={48} className="text-slate-600" />
                <h2 className="text-xl font-bold text-slate-200">سبد خرید شما خالیه</h2>
                <p className="text-slate-500 text-sm">هنوز چیزی به سبد خرید اضافه نکردی.</p>
                <DsButton
                    text="بازگشت به فروشگاه"
                    color="gray"
                    className="bg-white! text-slate-900! hover:bg-slate-200! rounded-xl! mt-2 px-6"
                    onClick={() => navigate("/app/shop")}
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <DsButton
                    justIcon
                    size="sm"
                    color="gray"
                    icon={<ArrowLeft size={16} />}
                    className="bg-slate-800! rounded-xl!"
                    onClick={() => navigate("/app/shop")}
                />
                <h2 className="text-xl font-bold text-slate-100">سبد خرید</h2>
            </div>

            <div className="flex flex-col gap-4">
                {cart.map((item) => {
                    const discountedPrice = getDiscountedPrice(
                        item.product.price,
                        item.product.discountPercentage
                    );

                    return (
                        <div
                            key={item.product.id}
                            className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md rounded-2xl 
                       border border-slate-700/50 p-4"
                        >
                            <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="w-20 h-20 rounded-xl object-cover "
                            />

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-100 truncate">
                                    {item.product.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">SKU #{item.product.sku}</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-sm font-bold text-white">
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                    {item.product.discountPercentage > 0 && (
                                        <span className="text-xs text-slate-500 line-through">
                                            ${item.product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-900/60 
                              rounded-2xl px-2 py-1.5 border border-slate-700/50">
                                <DsButton
                                    justIcon
                                    size="sm"
                                    color="gray"
                                    icon={<Minus size={14} />}
                                    className="bg-slate-800! text-slate-300! border border-slate-700
                             hover:bg-white! hover:text-slate-900!"
                                    onClick={() => decreaseCartItem(item.product.id)}
                                />
                                <span className="text-sm font-bold text-white w-6 text-center tabular-nums">
                                    {item.quantity}
                                </span>
                                <DsButton
                                    justIcon
                                    size="sm"
                                    color="gray"
                                    icon={<Plus size={14} />}
                                    className="bg-slate-800! text-slate-300! border border-slate-700
                             hover:bg-white! hover:text-slate-900!"
                                    onClick={() => increaseCartItem(item.product.id)}
                                />
                            </div>

                            <div className="text-sm font-bold text-white w-16 text-left">
                                ${(discountedPrice * item.quantity).toFixed(2)}
                            </div>

                            <DsButton
                                justIcon
                                size="sm"
                                color="gray"
                                icon={<LucideTrash2 size={14} />}
                                className="bg-rose-500/10! text-rose-400! border border-rose-500/30
                             hover:bg-rose-500/20!"
                                onClick={() => removeFromCart(item.product.id)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-8 flex items-center justify-between bg-slate-800/60 backdrop-blur-md 
                      rounded-2xl border border-slate-700/50 p-5">
                <div>
                    <p className="text-xs text-slate-500">جمع کل</p>
                    <p className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex gap-3">
                    <DsButton
                        text="  خالی کردن سبد  "
                        color="gray"
                        className="bg-slate-900! text-slate-300!  hover:bg-slate-700! rounded-xl!"
                        onClick={clearCart}
                        size="lg"
                    />
                    <DsButton
                        text="تکمیل خرید"
                        color="gray"
                        className="bg-white! text-slate-900! hover:bg-slate-200! rounded-xl! font-semibold px-6"
                        onClick={() => { }}
                        size="lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart