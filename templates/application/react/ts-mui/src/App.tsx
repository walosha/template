// material core
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { LocalizationProvider as LocalAdapter } from '@mui/x-date-pickers/LocalizationProvider'
import themes from './theme'
import RenderRoutes from './routes'
import { NotificationProvider } from './context/NotificationProvider'
import { CssBaseline } from '@mui/material'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      cacheTime: 600000,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
})

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <LocalAdapter dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={themes(0)}>
          <CssBaseline>
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <RenderRoutes />
              </QueryClientProvider>
            </NotificationProvider>
          </CssBaseline>
        </ThemeProvider>
      </LocalAdapter>
    </LocalizationProvider>
  )
}

export default App
