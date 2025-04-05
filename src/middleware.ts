import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"
import { jwtDecode, JwtPayload } from 'jwt-decode'


interface AuthTokenPayload extends JwtPayload {
    id: number,
    email: string,
    role: |'client'|'admin',
}

const getIds = ():string[] => {
    const numbers = Array.from({ length: 999 }, (_, i) => i +1)

    return numbers.map((n) => n.toString())
}

const rotasAdmin = [
    { path: '/admin', quandoAutenticado: 'redirecionar' },
    { path: '/api/protegida:path*', quandoAutenticado: 'redirecionar' },
]

const rotasPublicas = [
    { path: '/login', quandoAutenticado: 'redirecionar' },
    { path: '/cadastrar', quandoAutenticado: 'redirecionar' },
    { path: '/', quandoAutenticado: 'next' },
    { path: '/sobre', quandoAutenticado: 'next' },    
    { path: '/sacola', quandoAutenticado: 'next' },    
]

const ids = getIds()

ids.map((id) => {
    rotasPublicas.push(
        { path: `/produto/${id}`, quandoAutenticado: 'next' },
    )
})

const REDIRECIONAR_QUANDO_NAO_AUTENTICADO = '/login'

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const rotaPublica = rotasPublicas.find((rota) => rota.path === path)
    const rotaAdmin = rotasAdmin.find((rota) => rota.path === path)
    const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')

    //Este trecho libera as rotas admin somente com credenciais de administrador
    if(rotaAdmin && !authToken){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO        
        return NextResponse.redirect(redirecionarUrl)            
    }
    
    if(rotaAdmin && authToken){
        const { role } = jwtDecode(authToken.value) as AuthTokenPayload
        if(role === 'admin'){
            return NextResponse.next()    
        }else{
            const redirecionarUrl = request.nextUrl.clone()
            redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO        
            return NextResponse.redirect(redirecionarUrl) 
        }
    }
    //
    
    //a partir daqui vefifica as rotas publicas e privadas
    if(rotaPublica && !authToken){
        return NextResponse.next()
    }

    if(!rotaPublica && !authToken){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO

        return NextResponse.redirect(redirecionarUrl)
    }
    
    if(rotaPublica && authToken && rotaPublica.quandoAutenticado === 'redirecionar'){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = '/'
    
        return NextResponse.redirect(redirecionarUrl)
        
    }
    
    if(!rotaPublica && authToken){
        const agora = Math.floor(Date.now() / 1000)
        const { exp } = jwtDecode(authToken.value)
        
        if( exp && exp > agora){
            return NextResponse.next()
        }else{
            const redirecionarUrl = request.nextUrl.clone()
            redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO        
            return NextResponse.redirect(redirecionarUrl)            
        }
                
    }


    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        //'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|texto-sigiftbox.svg|robots.txt).*)',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|.*\\.svg$|.*\\.jpeg$|.*\\.jpg$|.*\\.png$|.*\\.webp$|.*\\.gif$|.*\\.avif$|robots.txt).*)',
        '/api/protegida/:path*',
      ],
}

