import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"
import { jwtDecode } from 'jwt-decode'
import { AuthTokenPayload } from './types/types'

const rotasAdmin = [
    { path: '/admin', quandoAutenticado: 'next' },
    { path: '/api/protegida:path*', quandoAutenticado: 'next' },
]

const rotasPublicas = [
    { path: '/login', quandoAutenticado: 'redirecionar' },
    { path: '/cadastrar', quandoAutenticado: 'redirecionar' },
    { path: '/', quandoAutenticado: 'next' },
    { path: '/sobre', quandoAutenticado: 'next' },    
    { path: '/sacola', quandoAutenticado: 'next' },
    { path: '/produto', quandoAutenticado: 'next' },
    { path: '/produtos', quandoAutenticado: 'next' },
    { path: '/contato', quandoAutenticado: 'next' },
    { path: '/recuperar-senha', quandoAutenticado: 'next' },
]

const REDIRECIONAR_QUANDO_NAO_AUTENTICADO = '/login'

export function middleware(request: NextRequest){
    //testa se o usuario é um bot
    const userAgent = request.headers.get('user-agent')
    const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(userAgent || '')
    if(isBot){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO        
        return NextResponse.redirect(redirecionarUrl)            
    }

    const path = request.nextUrl.pathname
    const rotaPublica = rotasPublicas.find((rota) => raizDaRota(path) === rota.path)
    const rotaAdmin = rotasAdmin.find((rota) => raizDaRota(path) === rota.path)
    const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')

    //se o usuario tentar acessar uma rota de admin sem estar logado
    if(rotaAdmin && !authToken){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO        
        return NextResponse.redirect(redirecionarUrl)            
    }
    
    //se o usuario tentar acessar uma rota de admin e estiver logado
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
    
    //se o usuario tentar acessar uma rota publica e estiver logado
    if(rotaPublica && !authToken){
        return NextResponse.next()
    }

    //se o usuario tentar acessar uma rota privada e nao estiver logado
    if(!rotaPublica && !authToken){
        const redirecionarUrl = request.nextUrl.clone()
        redirecionarUrl.pathname = REDIRECIONAR_QUANDO_NAO_AUTENTICADO
        console.log(`middleware: usuario nao autenticado tentando acessar rota privada. 
            Rota: ${path}`)
        
        return NextResponse.redirect(redirecionarUrl)
    }
    
    //se o usuario tentar acessar uma rota publica e estiver logado
    if(rotaPublica && authToken && rotaPublica.quandoAutenticado === 'redirecionar'){
        console.log(`middleware: usuario autenticado tentando acessar rota de autenticacao
        Rota: ${path}`)
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
            console.log('middleware: token vencido')
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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|.*\\.svg$|.*\\.jpeg$|.*\\.jpg$|.*\\.png$|.*\\.webp$|.*\\.gif$|.*\\.avif$|robots.txt).*)',
        //'/api/:path*',
      ],
}

const raizDaRota = (path: string) => {
    const raiz = path.split('/')[1]
    return '/' + raiz
}
