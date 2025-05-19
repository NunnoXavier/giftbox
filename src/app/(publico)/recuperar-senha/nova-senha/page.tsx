import NovaSenha from "@/components/NovaSenha/NovaSenha"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

const PageNovaSenha = () => {

    return(
        <Suspense fallback={<Loader2 className="animate-spin"/>}>
            <NovaSenha/>
        </Suspense>
    )
}

export default PageNovaSenha