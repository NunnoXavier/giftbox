import NovaSenha from "./NovaSenha"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

const PageNovaSenha = () => {

    return(
        <div className="h-screen flex justify-center items-center">        
            <Suspense fallback={<Loader2 className="animate-spin"/>}>
                <NovaSenha/>
            </Suspense>
        </div>
    )
}

export default PageNovaSenha