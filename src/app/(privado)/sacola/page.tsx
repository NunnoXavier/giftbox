import { Product, ProductCart } from "@/types/types"
import SacolaCollection from "@/components/sacola/SacolaCollection"
import { cookies } from "next/headers"

const Sacola = async () => {

    return (
        <div>
            <SacolaCollection />
        </div>
    )
}

export default Sacola