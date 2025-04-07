'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'

const QueryProviderStore = ({children}:{children: ReactNode}) => {
    const [queryClient] = useState( new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false, // Opcional: desativa refetch no focus
          }
        }
    }))

    useEffect(() => {
    console.log('QueryClient montado', queryClient)
    return () => {
        console.log('QueryClient desmontado')
    }
    }, [queryClient])          

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

}

export default QueryProviderStore