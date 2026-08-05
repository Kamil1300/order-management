import { Cart } from "@/components/cart/Cart";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
const Carts = async({params}: Props) => {
    const {id} = await params
    return(
        <div className="flex sm:mx-30 mb-20 mt-10 font-sans flex-wrap gap-10 justify-center items-center">
            <Cart id={id}/>
        </div>
    )    
}

export default Carts