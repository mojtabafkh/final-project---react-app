import PageHeader from "../../components/global/PageHeader"
import ShopDis from "./components/shop-dis"

const Shop = () => {

    return (
        <>


            {/* <div className="grid grid-cols-3 p-5">
                {
                    data?.carts?.map((cart, index) => {
                        return (
                            <div key={index} >

                                {
                                    cart.products?.map((product, index) => {
                                        return (
                                            <div key={index} className="bg-slate-500 w-40 h-60 p-4 rounded-2xl my-8 text-[10px]">
                                                <p>{product.id}</p>
                                                <p>{product.title}</p>

                                            </div>
                                        )

                                    }
                                    )
                                }




                            </div>
                    
                    )

                })
                }



            </div> */}
            <PageHeader text="Shop" />
            <ShopDis />

        </>


    )
}

export default Shop