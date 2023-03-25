import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactFCWithChildren } from '@/shared/types/component.types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainProvider: ReactFCWithChildren = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default MainProvider
