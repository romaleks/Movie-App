import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from '@/components/layout/Layout'

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
    <QueryClientProvider client={queryClient}>
      <Layout>{children}</Layout>
    </QueryClientProvider>
  )
}

export default MainProvider
